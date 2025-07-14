import { cn } from "@/lib/utils";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <>
      <main className={cn("flex h-screen items-center justify-center")}>
        <SignIn />
      </main>
    </>
  );
};

export default SignInPage;