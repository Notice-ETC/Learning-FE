'use client'

import { useState } from 'react'
import { Button, Box, Container, Typography, Card } from '@mui/material'
import axios from 'axios'
import { WebsiteThemeProvider } from '@/ThemeWebsite'

interface ShortIdResponse {
  message: string
  shortId: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

export default function CreateShortIdPage() {
  const [shortId, setShortId] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleGetShortId = async () => {
    setLoading(true)
    try {
      const response = await axios.get<ShortIdResponse>(`${API_BASE_URL}/createShortId`)
      setShortId(response.data.shortId)
    } catch (error) {
      console.error('Error:', error)
      setShortId('เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }

  return (
    <WebsiteThemeProvider>
      <Container maxWidth="sm" sx={{ py: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Card
          sx={{
            p: 4,
            borderRadius: '8px',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              alignItems: 'center',
            }}
          >
            <Typography 
              variant="h4" 
              component="h1"
              sx={{ color: '#C9B59C', fontWeight: 600 }}
            >
              สร้าง Short ID
            </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={handleGetShortId}
          disabled={loading}
          sx={{ minWidth: 200 }}
        >
          {loading ? 'กำลังโหลด...' : 'สร้าง Short ID'}
        </Button>

        {shortId && (
          <Typography variant="h5" sx={{ mt: 2 }}>
            Short ID: {shortId}
          </Typography>
        )}
          </Box>
        </Card>
      </Container>
    </WebsiteThemeProvider>
  )
}

