import { llmsTxt, textResponse } from "../text-files";

export const dynamic = "force-static";

export function GET() {
  return textResponse(llmsTxt());
}
