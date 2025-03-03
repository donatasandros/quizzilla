import type { auth } from "@/api/lib/auth";

export interface HonoVariables {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
}
