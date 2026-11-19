import { ToolPage, toolMetadata } from '../../../components/tools/tool-page';
import { getTool } from '../../../components/tools/tool-list';
import { KeywordTool } from '../../../components/tools/keyword-tool';

export const metadata = toolMetadata('keyword-research-tool');

export default function Page() {
  return <ToolPage tool={getTool('keyword-research-tool')!}><KeywordTool /></ToolPage>;
}
