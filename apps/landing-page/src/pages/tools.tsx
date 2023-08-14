import { Layout } from '@components/Layout'
import { ToolsContent } from '@components/Tools/ToolsContent'
import { ToolsHeader } from '@components/Tools/ToolsHeader'

export default function ToolsPage() {
  return (
    <Layout>
      <ToolsHeader className='mt-10' />
      <ToolsContent className='pt-40 pb-[30rem]' />
    </Layout>
  )
}
