'use client'

import { Button, Box, Container, Typography, Card, Grid } from '@mui/material'
import { useRouter } from 'next/navigation'
import { WebsiteThemeProvider } from '@/ThemeWebsite'

export default function HomePage() {
  const router = useRouter()

  const navigationButtons = [
    {
      path: '/testPost',
      label: 'สร้างข้อความ',
      description: 'สร้างและบันทึกข้อความใหม่',
    },
    {
      path: '/testGet',
      label: 'สร้าง Short ID',
      description: 'สร้าง Short ID ใหม่',
    },
    {
      path: '/showAllText',
      label: 'แสดงข้อความทั้งหมด',
      description: 'ดูข้อความทั้งหมดที่บันทึกไว้',
    },
  ]

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
              gap: 4,
              alignItems: 'center',
            }}
          >
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom
              sx={{ color: '#C9B59C', fontWeight: 600, textAlign: 'center' }}
            >
              หน้าแรก
            </Typography>

            <Typography 
              variant="body1" 
              sx={{ color: 'text.secondary', textAlign: 'center', mb: 2 }}
            >
              เลือกเมนูที่ต้องการใช้งาน
            </Typography>

            <Grid container spacing={3} sx={{ width: '100%', mt: 2 }}>
              {navigationButtons.map((button) => (
                <Grid item xs={12} sm={6} md={4} key={button.path}>
                  <Card
                    sx={{
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                    onClick={() => router.push(button.path)}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{ 
                        mb: 2,
                        py: 1.5,
                        fontWeight: 600,
                      }}
                    >
                      {button.label}
                    </Button>
                    <Typography 
                      variant="body2" 
                      sx={{ color: 'text.secondary' }}
                    >
                      {button.description}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Card>
      </Container>
    </WebsiteThemeProvider>
  )
}

