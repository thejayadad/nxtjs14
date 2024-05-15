'use client'
import React from 'react'
import { FiHome,FiPlus} from "react-icons/fi"
import { usePathname } from 'next/navigation'
import SidebarItem from './side-bar-item'


const siteLinks = [

    {
        icon: <FiHome />,
        label: "Home",
        href: "/dashboard"
    },

    {
        icon: <FiPlus/>,
        label: "New",
        href: "/dashboard/new"
    }
]

const SidebarLinks = () => {
    const pathname = usePathname()
    const routes = siteLinks

  return (
    <div
    className='flex flex-col w-full'
    >
        {routes.map(route => (
            <SidebarItem
            icon={route.icon}
            key={route.href}
            label={route.label}
            href={route.href}
        />
        ))}
    </div>
  )
}

export default SidebarLinks