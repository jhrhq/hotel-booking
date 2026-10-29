import AuthHeaderWithProvider from "@/components/auth/AuthHeaderWithProvider";
import SignInModal from "@/components/auth/AuthModal";
import SignUpForm from "@/components/auth/SignUpForm";

export default function InterceptedSignUp() {
  return (
    <SignInModal>
      <AuthHeaderWithProvider modal={true}>
        <SignUpForm />
      </AuthHeaderWithProvider>
    </SignInModal>
  );
}
