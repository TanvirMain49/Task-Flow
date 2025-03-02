import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import UserMenu from "./User-menu";

export default function Header() {
  return (
    <header className="container mx-auto">
      <nav className="flex items-center justify-between py-6 px-4">
        <Link href="/">
          <h1 className="text-3xl text-purple-800 font-bold">TaskFlow</h1>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/project/create">
          <Button variant="destructive" className="flex items-center gap-2">
            <PenBox size={18}/>
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
    </header>
  );
}
