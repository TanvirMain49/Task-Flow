"use client"
import { UserButton } from "@clerk/nextjs";
import { ChartNoAxesGantt } from "lucide-react";
import React from "react";

export default function UserMenu() {
  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: "w-16 h-16 rounded-full border-2 border-blue-500", 
          userButtonPopoverCard: "bg-gray-100 shadow-lg",
        },
      }}
    >
        <UserButton.MenuItems>
            <UserButton.Link
            label="My Organization"
            labelIcon={<ChartNoAxesGantt size={15}/>}
            href="/onboarding"
            />
        </UserButton.MenuItems>
    </UserButton>
  );
}
