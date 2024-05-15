import React from 'react'
import MobileNav from './mobile-nav'
import NavLinks from './nav-links'

const Header = () => {
  return (
    <header className=''>
        <div
            className='p-4 border-b border-primary/30 h-full flex items-center shadow-sm'

        >
            <MobileNav />
            <NavLinks />
        </div>
    </header>
  )
}

export default Header