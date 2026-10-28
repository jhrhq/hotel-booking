import AuthHeaderWithProvider from "@/components/auth/AuthHeaderWithProvider";
import SignInModal from "@/components/auth/AuthModal";
import SignUpForm from "@/components/auth/SignUpForm";
import { resolveCallbackUrl } from "@/lib/callback-urls";

type InterceptedSignInProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function InterceptedSignUp({ searchParams }: InterceptedSignInProps) {
  const resolvedParams = await searchParams;
  const params = new URLSearchParams(resolvedParams as Record<string, string>);
  const callbackUrl = resolveCallbackUrl(params);

  return (
    <SignInModal>
      <AuthHeaderWithProvider callbackUrl={callbackUrl} modal={true}>
        <SignUpForm callbackUrl={callbackUrl} />
      </AuthHeaderWithProvider>
    </SignInModal>
  );
}
