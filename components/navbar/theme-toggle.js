'use client'
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Switch } from "@nextui-org/react"
import {FiSun, FiMoon} from "react-icons/fi"


const ThemeToogle = () => {
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme, resolvedTheme} = useTheme()
    useEffect(() => {
        setMounted(true)
    }, [])
    const handleToggle =() => {
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
    }
    if(!mounted) return null
  return (
    <div>
        <Switch
        defaultSelected={resolvedTheme === 'dark'}
        size='lg'
        onChange={handleToggle}
        startContent={<FiSun />}
        endContent={<FiMoon />}
        >
            {resolvedTheme === 'dark'}
        </Switch>
    </div>
  )
}

export default ThemeToogle