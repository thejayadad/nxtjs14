import React from 'react'
import ThemeToogle from './theme-toggle'
import { auth, signIn, signOut } from '@/auth';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { Button } from '@nextui-org/react';

const NavLinks = async () => {
    const session = await auth();
    const user = session?.user;
  return (
    <div className='flex gap-x-1 ml-auto items-center'>          
        <ThemeToogle />
        {user ? <LogoutButton /> : <SignInButton />}
    </div>
  )
}

function SignInButton() {
    return (
      <form
        action={async () => {
          "use server";
          await signIn();
        }}
      >
        <Button
        variant='light'
        type="submit">
            <FiUser />
        </Button>
      </form>
    );
  }

  function LogoutButton(){
    return (
        <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit" className="flex w-full items-center">
          <FiLogOut className="mr-1 h-4 w-4" /> <span className='text-sm font-[500]'>LogOut</span>
        </button>
      </form>
    )
  }

export default NavLinks