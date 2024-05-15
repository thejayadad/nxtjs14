'use client'
import React from 'react';
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";


const SidebarItem = ({ icon, label, href }) => {
    const pathname = usePathname();
    const router = useRouter();
    const onClick = () => {
        router.push(href);
    };
    const isActive = 
    (pathname === href) 

  return (
    <button
    onClick={onClick}
    className={clsx(
        "flex items-center gap-x-2 text-sm font-[500] pl-5 transition-all",
        isActive ? "text-darkBlue bg-primary/60" : "text-secondary hover:text-secondary hover:bg-primary/60"
    )}
>
    <div className='flex items-center gap-x-2 py-4'>
        <span className={clsx(icon.props.className, isActive ? 'text-darkBlue' : 'text-gray-700')}>
            {icon}
        </span>
        <span className={isActive ? 'text-darkBlue' : 'text-gray-700'}>{label}</span>
    </div>
    <div
        className={clsx (
            "ml-auto opacity-0 border-2 border-darkBlue h-full transition-all", isActive && 'opacity-100'
        )}
    />
</button>
  )
}

export default SidebarItem