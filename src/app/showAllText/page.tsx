'use client'

import { useState, useEffect } from 'react'
import { 
  Button, 
  Box, 
  Container, 
  Typography, 
  Alert, 
  CircularProgress, 
  Card,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { WebsiteThemeProvider } from '@/ThemeWebsite'

interface ITestDB {
  _id: string
  name: string
  createdAt: string
}

interface GetAllTextResponse {
  message: string
  data: ITestDB[]
  count: number
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

export default function ShowAllTextPage() {
  const router = useRouter()
  const [texts, setTexts] = useState<ITestDB[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAllTexts = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.get<GetAllTextResponse>(`${API_BASE_URL}/getAllText`)
      setTexts(response.data.data || [])
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        'เกิดข้อผิดพลาดในการดึงข้อมูล'
      setError(errorMessage)
      console.error('Error fetching texts:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllTexts()
  }, [])

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date)
    } catch {
      return dateString
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
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography 
                variant="h4" 
                component="h1" 
                sx={{ color: '#C9B59C', fontWeight: 600 }}
              >
                ข้อความทั้งหมด
              </Typography>
              <Chip 
                label={`ทั้งหมด ${texts.length} รายการ`} 
                color="primary"
                sx={{ fontWeight: 600 }}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={fetchAllTexts}
                disabled={loading}
                sx={{ minWidth: 120 }}
              >
                {loading ? <CircularProgress size={20} /> : 'รีเฟรช'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push('/home')}
                sx={{ minWidth: 120 }}
              >
                กลับหน้าแรก
              </Button>
            </Box>

            {error && (
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            )}

            {loading && texts.length === 0 ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : texts.length === 0 ? (
              <Alert severity="info">
                ไม่มีข้อมูลข้อความ
              </Alert>
            ) : (
              <Card
                variant="outlined"
                sx={{
                  maxHeight: '600px',
                  overflow: 'auto',
                }}
              >
                <List>
                  {texts.map((text, index) => (
                    <Box key={text._id}>
                      <ListItem
                        sx={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          py: 2,
                        }}
                      >
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Chip 
                            label={`#${index + 1}`} 
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                          <Typography 
                            variant="caption" 
                            sx={{ color: 'text.secondary' }}
                          >
                            {formatDate(text.createdAt)}
                          </Typography>
                        </Box>
                        <ListItemText
                          primary={text.name}
                          primaryTypographyProps={{
                            sx: {
                              color: 'text.primary',
                              fontSize: '1rem',
                              wordBreak: 'break-word',
                            },
                          }}
                        />
                      </ListItem>
                      {index < texts.length - 1 && <Divider />}
                    </Box>
                  ))}
                </List>
              </Card>
            )}
          </Box>
        </Card>
      </Container>
    </WebsiteThemeProvider>
  )
}

