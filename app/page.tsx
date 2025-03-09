import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <SignInButton mode="modal" />
    </div>
  );
}
