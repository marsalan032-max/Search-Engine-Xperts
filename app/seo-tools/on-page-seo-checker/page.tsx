import { ToolPage, toolMetadata } from '../../../components/tools/tool-page';
import { getTool } from '../../../components/tools/tool-list';
import { UrlCheckTool } from '../../../components/tools/url-check-tool';

export const metadata = toolMetadata('on-page-seo-checker');

export default function Page() {
  return <ToolPage tool={getTool('on-page-seo-checker')!}><UrlCheckTool mode="onpage" /></ToolPage>;
}
