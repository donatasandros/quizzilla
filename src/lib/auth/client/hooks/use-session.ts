import { authClient } from "@/lib/auth/client/instance";

export function useSession() {
  const { data, isPending } = authClient.useSession();

  return {
    isLoaded: !isPending,
    isSignedIn: !!data?.session.id,
    session: data?.session
      ? {
          id: data.session.id,
          user: {
            createdAt: data.user.createdAt,
            email: data.user.email,
            name: data.user.name,
            imageUrl: data.user.image,
            id: data.user.id,
            //   TODO: twoFactorEnabled: boolean
            updatedAt: data.user.updatedAt,
          },
          updatedAt: data.session.updatedAt,
          createdAt: data.session.createdAt,
        }
      : null,
  };
}
