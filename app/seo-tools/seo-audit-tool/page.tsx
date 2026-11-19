import { ToolPage, toolMetadata } from '../../../components/tools/tool-page';
import { getTool } from '../../../components/tools/tool-list';
import { UrlCheckTool } from '../../../components/tools/url-check-tool';

export const metadata = toolMetadata('seo-audit-tool');

export default function Page() {
  return <ToolPage tool={getTool('seo-audit-tool')!}><UrlCheckTool mode="audit" /></ToolPage>;
}
