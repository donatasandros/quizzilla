import { authClient } from "@/lib/auth/client/instance";

export function useUser() {
  const { data, isPending } = authClient.useSession();

  return {
    isLoaded: !isPending,
    isSignedIn: !!data?.user.id,
    user: data?.user
      ? {
          createdAt: data.user.createdAt,
          email: data.user.email,
          name: data.user.name,
          imageUrl: data.user.image,
          id: data.user.id,
          //   TODO: twoFactorEnabled: boolean
          updatedAt: data.user.updatedAt,
        }
      : null,
  };
}
