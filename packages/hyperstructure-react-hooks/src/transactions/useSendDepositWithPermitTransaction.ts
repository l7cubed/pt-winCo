import { Vault } from '@generationsoftware/hyperstructure-client-js'
import { vaultABI } from '@shared/utilities'
import { useEffect } from 'react'
import { Address, hexToSignature, isAddress, Signature, TransactionReceipt } from 'viem'
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'
import { useVaultTokenAddress } from '..'

/**
 * Prepares and submits a `depositWithPermit` transaction to a vault
 * @param amount the amount to deposit
 * @param vault the vault to deposit into
 * @param signature a valid EIP-2612 signature to approve token expenditure
 * @param deadline the deadline for which the signature is valid for
 * @param options optional callbacks
 * @returns
 */
export const useSendDepositWithPermitTransaction = (
  amount: bigint,
  vault: Vault,
  signature: `0x${string}`,
  deadline: bigint,
  options?: {
    onSend?: (txHash: `0x${string}`) => void
    onSuccess?: (txReceipt: TransactionReceipt) => void
    onError?: () => void
  }
): {
  isWaiting: boolean
  isConfirming: boolean
  isSuccess: boolean
  isError: boolean
  txHash?: Address
  txReceipt?: TransactionReceipt
  sendDepositWithPermitTransaction?: () => void
} => {
  const { address: userAddress } = useAccount()
  const { chain } = useNetwork()

  const { data: tokenAddress, isFetched: isFetchedTokenAddress } = useVaultTokenAddress(vault)

  const enabled =
    !!amount &&
    !!vault &&
    !!signature &&
    !!deadline &&
    isFetchedTokenAddress &&
    !!tokenAddress &&
    !!userAddress &&
    isAddress(userAddress) &&
    chain?.id === vault.chainId

  const sig: Signature = !!signature ? hexToSignature(signature) : { v: 0n, r: '0x0', s: '0x0' }

  const { config } = usePrepareContractWrite({
    chainId: vault?.chainId,
    address: vault?.address,
    abi: vaultABI,
    functionName: 'depositWithPermit',
    args: [amount, userAddress as Address, deadline, Number(sig.v), sig.r, sig.s],
    enabled
  })

  const {
    data: txSendData,
    isLoading: isWaiting,
    isError: isSendingError,
    isSuccess: isSendingSuccess,
    write: sendDepositWithPermitTransaction
  } = useContractWrite(config)

  const txHash = txSendData?.hash

  useEffect(() => {
    if (!!txHash && isSendingSuccess) {
      options?.onSend?.(txHash)
    }
  }, [isSendingSuccess])

  const {
    data: txReceipt,
    isLoading: isConfirming,
    isSuccess,
    isError: isConfirmingError
  } = useWaitForTransaction({ chainId: vault?.chainId, hash: txHash })

  useEffect(() => {
    if (!!txReceipt && isSuccess) {
      options?.onSuccess?.(txReceipt)
    }
  }, [isSuccess])

  const isError = isSendingError || isConfirmingError

  useEffect(() => {
    if (isError) {
      options?.onError?.()
    }
  }, [isError])

  return {
    isWaiting,
    isConfirming,
    isSuccess,
    isError,
    txHash,
    txReceipt,
    sendDepositWithPermitTransaction
  }
}
