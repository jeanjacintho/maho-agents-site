import { companyTxt, textResponse } from "../text-files";

export const dynamic = "force-static";

export function GET() {
  return textResponse(companyTxt());
}
