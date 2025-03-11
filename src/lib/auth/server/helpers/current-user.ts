import { headers as getHeaders } from "next/headers";

import { authServer } from "@/lib/auth/server/instance";

export async function currentUser() {
  const headers = await getHeaders();

  const data = await authServer.api.getSession({
    headers,
  });

  if (!data?.user) {
    return null;
  }

  return {
    id: data.user.id,
    // TODO: twoFactorEnabled: boolean,
    // TODO: banned: boolean,
    createdAt: data.user.createdAt,
    updatedAt: data.user.updatedAt,
    imageUrl: data.user.image ?? undefined,
    name: data.user.name,
    email: data.user.email,
  };
}
