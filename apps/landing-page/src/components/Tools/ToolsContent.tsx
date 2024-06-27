import classNames from 'classnames'
import { StartBuildingSection } from './StartBuildingSection'

interface ToolsContentProps {
  className?: string
}

export const ToolsContent = (props: ToolsContentProps) => {
  const { className } = props

  return (
    <div
      className={classNames(
        'w-full flex flex-col gap-28 items-center md:gap-52 md:px-16',
        className
      )}
    >
      <StartBuildingSection className='max-w-[1440px]' />
    </div>
  )
}
