# 🧭 Frontend Web App - Learning Project

Frontend ของระบบเรียนรู้สำหรับเชื่อมต่อกับ [Backend API](../backend/README.md)  
พัฒนาโดยใช้ **Next.js + TypeScript + CSS Modules + MUI + Axios + FontAwesome**

---

## 📋 สารบัญ

- [ภาพรวม](#ภาพรวม)
- [เทคโนโลยีที่ใช้](#เทคโนโลยีที่ใช้)
- [โครงสร้างโปรเจกต์](#โครงสร้างโปรเจกต์)
- [การติดตั้งและใช้งาน](#การติดตั้งและใช้งาน)
- [การตั้งค่า FontAwesome](#การตั้งค่า-fontawesome)
- [การตั้งค่า Axios](#การตั้งค่า-axios)
- [การใช้งาน CSS Modules และ MUI](#การใช้งาน-css-modules-และ-mui)
- [Lint & Format](#lint--format)
- [ตัวอย่างเรียก API](#ตัวอย่างเรียก-api)
- [Scripts](#scripts)
- [Notes](#notes)

---

## 🎯 ภาพรวม

Frontend นี้สร้างขึ้นเพื่อเชื่อมต่อกับ Backend API ที่ใช้ Express + TypeScript  
และออกแบบมาให้เป็นโปรเจกต์สาธิตสำหรับนักศึกษาระดับปี 1–2

**คุณสมบัติหลัก:**

- พัฒนาโดยใช้ **Next.js (App Router)** + **TypeScript**
- UI ด้วย **MUI (Material UI)**
- การเรียก API ด้วย **Axios**
- จัดรูปแบบโค้ดด้วย **Prettier + ESLint**
- ใช้ **FontAwesome** สำหรับ icon
- แยก style ด้วย **CSS Modules**

---

## 🧠 เทคโนโลยีที่ใช้

| หมวด | เทคโนโลยี |
|------|-------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | CSS Modules + MUI |
| HTTP Client | Axios |
| Icons | FontAwesome |
| Code Quality | ESLint + Prettier |
| React Compiler | babel-plugin-react-compiler |
| Package Manager | npm |

---

## 📁 โครงสร้างโปรเจกต์

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # หน้าแรก
│   │   ├── page.module.css     # Styles สำหรับหน้าแรก
│   │   ├── globals.css         # Global styles
│   │   └── slide/
│   │       └── page.tsx        # หน้า slide
│   ├── components/             # Reusable components (ยังไม่มี)
│   ├── services/               # API services (ยังไม่มี)
│   ├── types/                  # TypeScript types (ยังไม่มี)
│   └── utils/                  # Utility functions (ยังไม่มี)
├── public/                     # Static files
├── eslint.config.mjs           # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json
```

---

## ⚙️ การติดตั้งและใช้งาน

### 1. ติดตั้ง Dependencies

```bash
npm install
```

### 2. รัน Dev Server

```bash
npm run dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:3000`

---

## 🪶 การตั้งค่า FontAwesome

FontAwesome ได้ติดตั้งไว้แล้วใน package.json  
สามารถใช้งานได้โดย:

1. สร้างไฟล์ `src/lib/fontawesome.ts` (ถ้ายังไม่มี):
```typescript
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faHome, faPlus } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false
library.add(faUser, faHome, faPlus)
```

2. Import ที่ `src/app/layout.tsx`:
```tsx
import '@/lib/fontawesome'
```

3. ใช้งานใน component:
```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

<FontAwesomeIcon icon="home" />
```

---

## 🌐 การตั้งค่า Axios

Axios ได้ติดตั้งไว้แล้วใน package.json  
สร้างไฟล์ `src/utils/axios.ts` เพื่อสร้าง Axios instance:

```typescript
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:5000', // Backend API URL
  timeout: 10000,
})

// สามารถเพิ่ม interceptors สำหรับจัดการ token และ error ที่นี่
```

ใช้งาน:
```tsx
import { api } from '@/utils/axios'

// GET request
const response = await api.get('/endpoint')

// POST request
const response = await api.post('/endpoint', data)
```

---

## 🎨 การใช้งาน CSS Modules และ MUI

### CSS Modules

ใช้ CSS Modules สำหรับจัด style component โดยเฉพาะ  
ตัวอย่าง: `src/app/page.module.css`
```css
.page {
  /* styles */
}
.main {
  /* styles */
}
```

ใช้งานใน component:
```tsx
import styles from './page.module.css'

<div className={styles.page}>
  {/* content */}
</div>
```

### MUI (Material UI)

MUI ได้ติดตั้งไว้แล้วใน package.json  
สามารถใช้งาน component ได้ทันที:

```tsx
import { Button, Card, Typography } from '@mui/material'

export default function MyComponent() {
  return (
    <Card>
      <Typography variant="h6">Title</Typography>
      <Button variant="contained">Click Me</Button>
    </Card>
  )
}
```

สามารถใช้ CSS Modules ร่วมกับ MUI ได้โดยการส่ง className:
```tsx
import { AppBar } from '@mui/material'
import styles from './Header.module.css'

<AppBar className={styles.header}>
  {/* content */}
</AppBar>
```

---

## 🧹 Lint & Format

### ESLint Configuration

โปรเจกต์ใช้ ESLint แบบใหม่ (flat config) ผ่าน `eslint.config.mjs`  
ติดตั้ง dependencies ไว้แล้ว:
- `eslint`
- `eslint-config-next`
- `eslint-config-prettier`
- `eslint-plugin-prettier`

### Prettier Configuration

ไฟล์ `.prettierrc`:
```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always"
}
```

### คำสั่งที่ใช้บ่อย
```bash
npm run lint          # ตรวจสอบปัญหา lint
npm run lint:fix      # แก้ไขปัญหา lint อัตโนมัติ
npm run format        # จัดรูปแบบโค้ดทั้งหมด
npm run format:check  # ตรวจสอบว่ามีโค้ดที่ต้อง format หรือไม่
```

---

## 🧪 ตัวอย่างเรียก API

### Client Component (ใช้ State)

สร้างหน้าใหม่ที่ `src/app/example/page.tsx`:
```tsx
'use client'
import { useEffect, useState } from 'react'
import { api } from '@/utils/axios'
import { Card, CardContent, Typography, CircularProgress } from '@mui/material'

interface DataItem {
  id: string
  name: string
  // เพิ่ม fields อื่นๆ ตามต้องการ
}

export default function ExamplePage() {
  const [data, setData] = useState<DataItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/api/endpoint')
      .then((res) => {
        setData(res.data.data || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <CircularProgress />
  }

  return (
    <div>
      <Typography variant="h4">Data List</Typography>
      {data.map((item) => (
        <Card key={item.id} style={{ marginTop: 10 }}>
          <CardContent>
            <Typography variant="h6">{item.name}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

### Server Component (Next.js App Router)

สำหรับ Server Component สามารถใช้ fetch โดยตรง:
```tsx
// src/app/data/page.tsx
async function getData() {
  const res = await fetch('http://localhost:5000/api/endpoint', {
    cache: 'no-store', // หรือ 'force-cache' สำหรับ caching
  })
  return res.json()
}

export default async function DataPage() {
  const data = await getData()
  
  return (
    <div>
      {data.map((item: DataItem) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}
```

---

## 📜 Scripts

```bash
# Development mode
npm run dev            # รัน dev server (port 3000)

# Production build
npm run build          # Build สำหรับ production
npm start              # รัน production server

# Code Quality
npm run lint           # ตรวจสอบปัญหา lint
npm run lint:fix       # แก้ไขปัญหา lint อัตโนมัติ
npm run format         # จัดรูปแบบโค้ดทั้งหมด
npm run format:check   # ตรวจสอบว่ามีโค้ดที่ต้อง format หรือไม่
```

หมายเหตุ: โปรเจกต์ใช้ `--webpack` flag สำหรับ Next.js เพื่อรองรับ React Compiler

---

## 📝 Notes

### Best Practices

- ใช้ **TypeScript strict mode** เพื่อเพิ่มความปลอดภัยของโค้ด
- ใช้ **Axios instance** เดียวกันทุกหน้าเพื่อการจัดการ token และ error ที่ง่ายขึ้น
- แนะนำให้สร้าง component แยกใน `src/components/` เพื่อให้แต่ละหน้าสะอาด
- ใช้ **CSS Modules** สำหรับ component-specific styles
- ใช้ **Server Components** เป็นค่าเริ่มต้น และใช้ `'use client'` เฉพาะเมื่อจำเป็น (state, effects, event handlers)
- FontAwesome สามารถเพิ่ม icon ได้ที่ `src/lib/fontawesome.ts` (สร้างไฟล์ใหม่ถ้ายังไม่มี)

### React Compiler

โปรเจกต์เปิดใช้ **React Compiler** (babel-plugin-react-compiler) ใน `next.config.ts`  
React Compiler จะช่วย optimize re-renders และ memoization อัตโนมัติ

### Deployment

- ถ้าต้องการ deploy สามารถใช้ **Vercel** ได้ฟรี (integrate กับ GitHub ได้โดยตรง)
- อย่าลืมตั้งค่า environment variables สำหรับ API URL ใน production

### โครงสร้างโปรเจกต์ที่แนะนำ

- `src/components/` - Reusable UI components
- `src/services/` - API service functions
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions (axios, helpers, etc.)

---

## 📄 License

ISC
