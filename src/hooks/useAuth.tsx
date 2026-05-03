import { useAuth as useClerkAuth, useClerk, useUser } from "@clerk/clerk-react";

export const useAuth = () => {
  const { isLoaded, isSignedIn, userId } = useClerkAuth();
  const { user } = useUser();
  const { signOut } = useClerk();

  return {
    user: user ? { id: userId ?? user.id } : null,
    userId: userId ?? null,
    isLoading: !isLoaded,
    isAuthenticated: !!isSignedIn,
    signOut: () => signOut(),
  };
};
