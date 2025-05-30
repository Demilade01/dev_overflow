"use client"

import React from 'react'
import { useTheme } from '@/context/ThemeProvider'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import Image from 'next/image'
import { themes } from '@/constants'


const Theme = () => {
  const { mode, setMode, handleThemeChange } = useTheme();

  return (
    <Menubar className='relative border-none bg-transparent shadow-none'>
      <MenubarMenu>
        <MenubarTrigger className='focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data[state=open]:bg-dark-200 cursor-pointer'>
            <Image
            src={
              mode === 'dark'
              ? "/assets/icons/moon.svg"
              : mode === 'light'
              ? "/assets/icons/sun.svg"
              : "/assets/icons/computer.svg"
            }
            alt={mode === 'dark' ? 'moon' : 'sun'} // Update alt text accordingly
            width={20}
            height={20}
            className='active-theme'
          />
        </MenubarTrigger>
        <MenubarContent className='absolute right-[-3rem] mt-3 min-w-[120px] rounded border py-2 dark:border-dark-400 dark:bg-dark-300 bg-light-900'>
          {themes.map((theme) => (
            <MenubarItem
              key={theme.value}
              onClick={() => {
                if (theme.value === 'system') {
                  setMode(theme.value); // Set mode to system
                  localStorage.theme = theme.value; // Store in localStorage
                } else {
                  setMode(theme.value); // Set the selected theme
                  localStorage.removeItem('theme'); // Remove theme from localStorage
                  handleThemeChange(); // Toggle the theme
                }
              }}
              className='flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400 focus:bg-light-800 cursor-pointer'
            >
              <Image
                src={theme.icon}
                alt={theme.value}
                width={20}
                height={20}
                className={`${mode === theme.value && 'active-theme'}`}
              />
              <p className={`body-semibold text-light-500 ${mode === theme.value ? 'text-primary-500' : 'text-dark100_light900'}`}>{theme.label}</p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export default Theme;
