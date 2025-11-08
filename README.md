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
│   │   ├── testPost/           # หน้า POST form สำหรับสร้างข้อความ
│   │   │   └── page.tsx
│   │   ├── testGet/            # หน้า GET สำหรับสร้าง Short ID
│   │   │   └── page.tsx
│   │   └── slide/
│   │       └── page.tsx        # หน้า slide
│   ├── ThemeWebsite/           # Material-UI Theme Provider
│   │   └── index.tsx           # WebsiteThemeProvider component
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

## 🎨 Theme และสีของเว็บไซต์

โปรเจกต์นี้ใช้ชุดสีเฉพาะที่กำหนดไว้ใน `src/ThemeWebsite/index.tsx`:

### สีที่ใช้

- **Primary**: `#473472` (ม่วงเข้ม) - ใช้สำหรับข้อความหลักและปุ่ม
- **Secondary**: `#53629E` (ม่วงอ่อน) - ใช้สำหรับข้อความรอง
- **Background**: `#D6F4ED` (เขียวอ่อน) - ใช้สำหรับพื้นหลัง
- **Accent**: `#87BAC3` (ฟ้าอ่อน) - ใช้สำหรับองค์ประกอบเสริม

### การใช้งาน WebsiteThemeProvider

`WebsiteThemeProvider` เป็น wrapper component ที่จัดการ Material-UI theme สำหรับทั้งเว็บไซต์

**ตัวอย่างการใช้งาน:**

```tsx
'use client'

import { WebsiteThemeProvider } from '@/ThemeWebsite'
import { Container, Typography } from '@mui/material'

export default function MyPage() {
  return (
    <WebsiteThemeProvider>
      <Container>
        <Typography variant="h4">หน้าเว็บของฉัน</Typography>
      </Container>
    </WebsiteThemeProvider>
  )
}
```

**หมายเหตุ:** ควร wrap component ที่ใช้ Material-UI components ด้วย `WebsiteThemeProvider` เพื่อให้สีและ theme ทำงานถูกต้อง

### หน้าตัวอย่างที่ใช้ Theme

- **`/testPost`** - หน้า POST form สำหรับสร้างข้อความ
- **`/testGet`** - หน้า GET สำหรับสร้าง Short ID

ทั้งสองหน้านี้ใช้ `WebsiteThemeProvider` และ Card component ที่มี:
- `borderRadius: 8px`
- `boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)'`

## 📄 หน้าตัวอย่าง

### TestPost Page (`/testPost`)

หน้า POST form สำหรับส่งข้อความไปยัง Backend API endpoint `/createText`

**คุณสมบัติ:**
- Form สำหรับกรอกข้อความ (multiline text field)
- Validation (ตรวจสอบว่ามีข้อความก่อนส่ง)
- Loading state ขณะส่งข้อมูล
- Error handling และแสดง error message
- Success message เมื่อส่งสำเร็จ
- แสดง response data ในรูปแบบ JSON
- ใช้ Card component พร้อม shadow และ rounded corners

**ตัวอย่างการใช้งาน:**

1. เปิดหน้า `/testPost`
2. กรอกข้อความในช่อง text field
3. กดปุ่ม "ส่งข้อมูล"
4. ระบบจะส่ง POST request ไปยัง `/createText` endpoint
5. แสดงผลลัพธ์ (success/error) และ response data

### TestGet Page (`/testGet`)

หน้า GET สำหรับเรียก API endpoint `/createShortId` เพื่อสร้าง Short ID ใหม่

**คุณสมบัติ:**
- ปุ่มสำหรับสร้าง Short ID
- Loading state ขณะเรียก API
- แสดง Short ID ที่สร้างได้
- Error handling
- ใช้ Card component พร้อม shadow และ rounded corners

**ตัวอย่างการใช้งาน:**

1. เปิดหน้า `/testGet`
2. กดปุ่ม "สร้าง Short ID"
3. ระบบจะส่ง GET request ไปยัง `/createShortId` endpoint
4. แสดง Short ID ที่สร้างได้

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
- `src/ThemeWebsite/` - Material-UI Theme Provider สำหรับทั้งเว็บไซต์

### การตั้งค่า API Base URL

สำหรับหน้า `testGet` ใช้ environment variable `NEXT_PUBLIC_API_BASE_URL`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

ถ้าไม่กำหนด จะใช้ค่า default `http://localhost:5000`

**หมายเหตุ:** สำหรับหน้า `testPost` ใช้ relative path `/createText` ซึ่งจะเรียกไปยัง Next.js API route หรือ proxy ไปยัง backend (ขึ้นอยู่กับการตั้งค่า)

---

## 📄 License

ISC
