import { Layout } from '@components/Layout'
import { ToolsContent } from '@components/Tools/ToolsContent'
import { ToolsHeader } from '@components/Tools/ToolsHeader'

export default function ToolsPage() {
  return (
    <Layout>
      <ToolsContent className='py-2 md:py-4' />
      <ToolsHeader className='mt-1' />
    </Layout>
  )
}
