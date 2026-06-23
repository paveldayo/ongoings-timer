'use client'

import { Info, LogIn, LogOut, Menu, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession, signIn, signOut } from "next-auth/react"

export default function UserMenu() {
  const session = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        }
      />

      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Info className="mr-2 h-4 w-4" />
          <span>About</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {
          session.data && 
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/sign-in" })} variant="destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
        }

        {
          !session.data && 
            <DropdownMenuItem onClick={() => signIn("github", { callbackUrl: "/cards-list" })}>
              <LogIn className="mr-2 h-4 w-4" />
              <span>Sign in</span>
            </DropdownMenuItem>
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
