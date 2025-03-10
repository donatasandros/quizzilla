import { BetterFetchOption } from "@better-fetch/fetch";

import { authClient } from "@/lib/auth/client/instance";

type SignInProps =
  | {
      type: "email";
      provider?: never;
      data: {
        email: string;
        password: string;
        rememberMe: boolean;
        callbackURL?: string;
      };
      fetchOptions?: BetterFetchOption;
    }
  | {
      type: "oauth";
      provider: "github";
      data: {
        email?: never;
        password?: never;
        rememberMe?: never;
        callbackURL?: string;
      };
      fetchOptions?: BetterFetchOption;
    };

type SignUpProps = {
  type: "email";
  data: {
    email: string;
    password: string;
    name: string;
    image?: string;
    callbackURL?: string;
  };
  fetchOptions?: BetterFetchOption;
};

export async function useAuth() {
  const { data, isPending } = authClient.useSession();

  return {
    isLoaded: !isPending,
    isSignedIn: !!data?.user.id,
    userId: data?.user.id ?? null,
    sessionId: data?.session.id ?? null,
    signIn: (props: SignInProps) => {
      if (props.type === "email") {
        const { data, fetchOptions } = props;

        return authClient.signIn.email({
          ...data,
          fetchOptions,
        });
      }

      if (props.type === "oauth") {
        const { provider, data, fetchOptions } = props;

        return authClient.signIn.social({
          provider,
          ...data,
          fetchOptions,
        });
      }
    },
    signUp: (props: SignUpProps) => {
      if (props.type === "email") {
        const { data, fetchOptions } = props;

        return authClient.signUp.email(
          {
            ...data,
          },
          fetchOptions,
        );
      }
    },
    signOut: (fetchOptions?: object) => {
      return authClient.signOut({
        fetchOptions,
      });
    },
  };
}
