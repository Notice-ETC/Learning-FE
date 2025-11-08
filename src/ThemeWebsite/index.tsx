'use client'

import { ThemeProvider, createTheme } from '@mui/material'
import { ReactNode } from 'react'

const theme = createTheme({
  palette: {
    primary: {
      main: '#473472',
    },
    secondary: {
      main: '#53629E',
    },
    text: {
      primary: '#473472',
      secondary: '#53629E',
    },
    background: {
      default: '#D6F4ED',
      paper: '#fff',
    },
  },
})

interface WebsiteThemeProviderProps {
  children: ReactNode
}

export function WebsiteThemeProvider({ children }: WebsiteThemeProviderProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export { theme }

