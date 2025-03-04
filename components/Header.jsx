import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import UserMenu from "./User-menu";
import { cheekUser } from "@/lib/CheekUser";
import UserLoading from "./UserLoading";
import Image from "next/image";

export default async function Header() {
  await cheekUser();

  return (
    <header className="container mx-auto">
      <nav className="flex items-center justify-between py-6 px-10">
        <Link href="/">
          {/* <h1 className="text-3xl text-purple-800 font-bold">TaskFlow</h1> */}
          <Image
            src="/logo2.png"
            alt="logo2"
            width={200}
            height={52}
            className="h-8 w-full object-cover"
          />
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/project/create">
            <Button variant="destructive" className="flex items-center gap-2">
              <PenBox size={18} />
              <span>Create Project</span>
            </Button>
          </Link>

          <SignedOut>
            <SignInButton forceRedirectUrl="/onboarding">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserMenu />
          </SignedIn>
        </div>
      </nav>
      {/* <UserLoading /> */}
    </header>
  );
}
