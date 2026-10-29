import AuthHeaderWithProvider from "@/components/auth/AuthHeaderWithProvider";
import SignInModal from "@/components/auth/AuthModal";
import SignInForm from "@/components/auth/SignInForm";

export default function InterceptedSignIn() {
  return (
    <SignInModal>
      <AuthHeaderWithProvider isSignIn={true} modal={true}>
        <SignInForm />
      </AuthHeaderWithProvider>
    </SignInModal>
  );
}
