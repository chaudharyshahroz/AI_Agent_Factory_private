import { destroySession } from "@/lib/auth/session";
import { redirectToPath } from "@/lib/utils/redirect";

export async function POST() {
  await destroySession();
  return redirectToPath("/login");
}
