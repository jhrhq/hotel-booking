import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AuthHeaderWithProvider from "@/components/auth/AuthHeaderWithProvider";
import SignInForm from "@/components/auth/SignInForm";
import { AUTH_CONFIG } from "@/constants/auth.constants";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign In | Hotel Booking",
  description: "Sign in to your Hotel Booking account to manage reservations, view trips, and access your account.",
};

const SignInPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user) {
    redirect(AUTH_CONFIG.ROUTES.HOME);
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-card text-card-foreground border border-border rounded-xl shadow-lg w-96 p-6 relative">
        <AuthHeaderWithProvider isSignIn={true}>
          <SignInForm />
        </AuthHeaderWithProvider>
      </div>
    </div>
  );
};

export default SignInPage;
