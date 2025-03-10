import { toNextJsHandler } from "better-auth/next-js";

import { authServer } from "@/lib/auth/server/instance";

export const { POST, GET } = toNextJsHandler(authServer);
