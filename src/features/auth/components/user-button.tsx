"use client";

import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { ERROR_MESSAGES } from "@/features/auth/constants";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/lib/auth/client";
import { authClient } from "@/lib/auth/client/instance";
import { getInitials } from "@/utils/get-initials";

interface UserButtonsProps {
  align?: "start" | "end" | "center";
}

export function UserButton({ align = "end" }: UserButtonsProps) {
  const router = useRouter();
  const { user, isSignedIn, isLoaded } = useUser();
  const { toast } = useToast();

  if (!isLoaded) {
    return <Skeleton className="size-10 rounded-full" />;
  }

  if (!isSignedIn || !user) return null;

  async function handleSignOut() {
    const { error } = await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
        },
      },
    });

    if (error) {
      toast({
        status: "error",
        title: "Internal server error",
        description: ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="focus-visible:ring-brand-500 dark:focus-visible:ring-brand-400 size-10 rounded-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none dark:focus-visible:ring-offset-gray-950">
        <Avatar>
          <AvatarImage src={user.imageUrl} alt={user.name} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} sideOffset={8} className="w-[248px]">
        <div className="mb-1 flex items-center gap-x-3 border-b border-gray-200 px-4 py-3 dark:border-gray-800">
          <Avatar>
            <AvatarImage src={user.imageUrl} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="w-full overflow-hidden">
            <p
              title={user.name}
              className="truncate text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              {user.name}
            </p>
            <p
              title={user.email}
              className="truncate text-sm text-gray-600 dark:text-gray-400"
            >
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon />
            View profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="mb-1">
          <DropdownMenuItem onSelect={handleSignOut}>
            <LogOutIcon />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
