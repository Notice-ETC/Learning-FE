'use client'

import { ThemeProvider, createTheme } from '@mui/material'
import { ReactNode } from 'react'

const theme = createTheme({
  palette: {
    primary: {
      main: '#C9B59C',
    },
    secondary: {
      main: '#D9CFC7',
    },
    text: {
      primary: '#C9B59C',
      secondary: '#D9CFC7',
    },
    background: {
      default: '#EFE9E3',
      paper: '#F9F8F6',
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

