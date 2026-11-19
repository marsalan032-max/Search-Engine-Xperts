import { ToolPage, toolMetadata } from '../../../components/tools/tool-page';
import { getTool } from '../../../components/tools/tool-list';
import { UrlCheckTool } from '../../../components/tools/url-check-tool';

export const metadata = toolMetadata('technical-seo-checker');

export default function Page() {
  return <ToolPage tool={getTool('technical-seo-checker')!}><UrlCheckTool mode="technical" /></ToolPage>;
}
