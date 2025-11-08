'use client'

import { useState, FormEvent } from 'react'
import { TextField, Button, Box, Container, Typography, Alert, CircularProgress, Card } from '@mui/material'
import axios, { AxiosError } from 'axios'
import { WebsiteThemeProvider } from '@/ThemeWebsite'


interface ApiResponse {
  message?: string
  data?: unknown
  [key: string]: unknown
}

export default function TestPost() {
  const [text, setText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [responseData, setResponseData] = useState<unknown>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!text.trim()) {
      setError('กรุณากรอกข้อความ')
      setSuccess(null)
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)
    setResponseData(null)

    try {
      const response = await axios.post<ApiResponse>('/createText', {
        text: text.trim(),
      })

      // Log response เพื่อ debug
      console.log('API Response:', response)
      console.log('Response Data:', response.data)
      console.log('Response Status:', response.status)

      // เก็บ response data ทั้งหมด
      setResponseData(response.data)

      // แสดงข้อความสำเร็จ
      const successMessage = 
        typeof response.data === 'object' && response.data !== null && 'message' in response.data
          ? String(response.data.message)
          : 'ส่งข้อมูลสำเร็จ'
      
      setSuccess(successMessage)
      setText('')
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>
      
      // Log error เพื่อ debug
      console.error('API Error:', err)
      console.error('Error Response:', axiosError.response)
      console.error('Error Message:', axiosError.message)
      
      // แสดง error message
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        `เกิดข้อผิดพลาดในการส่งข้อมูล (${axiosError.response?.status || 'Unknown'})`
      
      setError(errorMessage)
      setResponseData(axiosError.response?.data || null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <WebsiteThemeProvider>
      <Container maxWidth="md" sx={{ py: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Card
          sx={{
            p: 4,
            borderRadius: '8px',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ color: '#C9B59C', fontWeight: 600 }}
        >
          สร้างข้อความ
        </Typography>

        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" onClose={() => setSuccess(null)}>
            {success}
          </Alert>
        )}

        {responseData !== null && (
          <Box
            sx={{
              p: 2,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Response Data:
            </Typography>
            <Box
              component="pre"
              sx={{
                mt: 1,
                p: 1,
                bgcolor: 'grey.100',
                borderRadius: 1,
                overflow: 'auto',
                fontSize: '0.875rem',
                maxHeight: '300px',
              }}
            >
              {JSON.stringify(responseData, null, 2)}
            </Box>
          </Box>
        )}

        <TextField
          label="ข้อความ"
          multiline
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
          fullWidth
          variant="outlined"
          placeholder="กรุณากรอกข้อความที่ต้องการส่ง"
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading || !text.trim()}
          sx={{ py: 1.5 }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} color="inherit" />
              <span>กำลังส่ง...</span>
            </Box>
          ) : (
            'ส่งข้อมูล'
          )}
        </Button>
          </Box>
        </Card>
      </Container>
    </WebsiteThemeProvider>
  )
}

