# 🚀 Social Media NX Monorepo

Dự án Social Media được xây dựng trên NX Monorepo với kiến trúc Atomic Design, sử dụng React, TypeScript, Next.js và Tailwind CSS.

## 📁 Cấu trúc dự án

```
social-media/
├── 📱 apps/                          # Ứng dụng chính
│   └── dating-app/                   # App hẹn hò
│       ├── src/
│       │   ├── app/                  # Pages và layouts
│       │   │   ├── (auth)/           # Auth pages
│       │   │   └── profile/          # Profile pages
│       │   └── components/           # App-specific components
│       ├── public/                   # Static assets
│       └── tsconfig.json             # TypeScript config
│
├── 🧩 libs/                          # Thư viện UI components
│   ├── atoms/                        # Components cơ bản
│   │   ├── src/
│   │   │   ├── button/               # Button component
│   │   │   ├── input/                # Input component
│   │   │   ├── progress/             # Progress component
│   │   │   └── stepIndicator/        # Step indicator
│   │   └── tsconfig.lib.json
│   │
│   ├── molecules/                    # Components phức tạp hơn
│   │   ├── src/
│   │   │   ├── sidebar/              # Sidebar navigation
│   │   │   ├── floatingIcons/        # Floating icons
│   │   │   └── phoneMockup/          # Phone mockup
│   │   └── tsconfig.lib.json
│   │
│   ├── organisms/                    # Components phức tạp nhất
│   │   ├── src/
│   │   │   ├── datePicker/           # Date picker
│   │   │   └── dateRangePicker/      # Date range picker
│   │   └── tsconfig.lib.json
│   │
│   └── templates/                    # Page templates
│       ├── src/
│       └── tsconfig.lib.json
│
├── 🎨 assets/                        # Assets chia sẻ (ROOT LEVEL)
│   ├── icons/                        # SVG icons
│   │   ├── ChatBubbleIcon.tsx
│   │   ├── DatingMessageIcon.tsx
│   │   ├── HeartIcon.tsx
│   │   ├── LocationPinIcon.tsx
│   │   └── Logo.tsx
│   ├── images/                       # Images
│   ├── fonts/                        # Fonts
│   ├── index.ts                      # Export file
│   ├── package.json                  # Package config
│   ├── project.json                  # NX project config
│   └── tsconfig.json                 # TypeScript config
│
├── 🪝 hooks/                         # React hooks chia sẻ (ROOT LEVEL)
│   ├── useDeviceDetection.ts         # Device detection hook
│   ├── useMediaQuery.ts              # Media query hooks
│   ├── index.ts                      # Export file
│   ├── package.json                  # Package config
│   ├── project.json                  # NX project config
│   └── tsconfig.json                 # TypeScript config
│
├── 🎨 styles/                        # Global styles (ROOT LEVEL)
│   └── globals.css                   # Tailwind CSS
│
├── 📋 Config files
│   ├── nx.json                       # NX workspace config
│   ├── package.json                  # Root package.json
│   ├── tsconfig.base.json            # Base TypeScript config
│   ├── tailwind.config.js            # Tailwind config
│   └── prettier.config.js            # Prettier config
│
└── 📚 README.md                      # Documentation
```

## 🔧 Cách tạo thư mục mới ở ROOT LEVEL

### **Bước 1: Tạo cấu trúc thư mục**

```bash
# Tạo thư mục mới (ví dụ: utils)
mkdir utils

# Tạo các file cần thiết
touch utils/index.ts
touch utils/package.json
touch utils/project.json
touch utils/tsconfig.json
```

### **Bước 2: Cấu hình package.json**

```json
// utils/package.json
{
  "name": "@social-media/utils",
  "version": "1.0.0",
  "description": "Shared utility functions",
  "main": "index.ts",
  "types": "index.ts",
  "private": true,
  "keywords": ["utils", "helpers", "shared"],
  "peerDependencies": {
    "react": ">=16.8.0"
  }
}
```

### **Bước 3: Cấu hình project.json (NX)**

```json
// utils/project.json
{
  "name": "utils",
  "$schema": "../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "utils",
  "projectType": "library",
  "tags": ["scope:shared", "type:util"],
  "targets": {
    "lint": {
      "executor": "@nx/eslint:lint",
      "outputs": ["{options.outputFile}"],
      "options": {
        "lintFilePatterns": ["utils/**/*.{ts,tsx,js,jsx}"]
      }
    },
    "type-check": {
      "executor": "@nx/js:tsc",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/utils",
        "main": "utils/index.ts",
        "tsConfig": "utils/tsconfig.json"
      }
    }
  }
}
```

### **Bước 4: Cấu hình tsconfig.json**

```json
// utils/tsconfig.json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "module": "esnext",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "**/*.js",
    "**/*.jsx"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

### **Bước 5: Cập nhật tsconfig.base.json**

```json
// tsconfig.base.json
{
  "compilerOptions": {
    "paths": {
      "@social-media/styles": ["./styles/globals.css"],
      "@styles/*": ["./styles/*"],
      "@social-media/assets": ["./assets/index.ts"],
      "@assets/*": ["./assets/*"],
      "@social-media/hooks": ["./hooks/index.ts"],
      "@hooks/*": ["./hooks/*"],
      "@social-media/utils": ["./utils/index.ts"],  // ← Thêm dòng này
      "@utils/*": ["./utils/*"]                     // ← Thêm dòng này
    }
  }
}
```

### **Bước 6: Cập nhật package.json root**

```json
// package.json (root)
{
  "workspaces": [
    "apps/*",
    "libs/*",
    "hooks",
    "styles",
    "assets",
    "utils"    // ← Thêm dòng này
  ]
}
```

### **Bước 7: Cấu hình TypeScript cho libs**

**Cập nhật tất cả `libs/*/tsconfig.lib.json`:**

```json
// libs/atoms/tsconfig.lib.json, libs/molecules/tsconfig.lib.json, etc.
{
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "../..",           // ← Quan trọng: Set về project root
    "baseUrl": ".",
    "skipLibCheck": true,         // ← Quan trọng: Skip lib checking
    "allowJs": true,              // ← Quan trọng: Allow JS files
    "paths": {
      "src/*": ["src/*"],
      "@social-media/assets": ["../../assets/index.ts"],
      "@assets/*": ["../../assets/*"],
      "@social-media/hooks": ["../../hooks/index.ts"],
      "@hooks/*": ["../../hooks/*"],
      "@social-media/utils": ["../../utils/index.ts"],    // ← Thêm
      "@utils/*": ["../../utils/*"]                        // ← Thêm
    }
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "../../assets/**/*.ts",       // ← Quan trọng: Include external files
    "../../assets/**/*.tsx",
    "../../hooks/**/*.ts",
    "../../hooks/**/*.tsx",
    "../../utils/**/*.ts",        // ← Thêm
    "../../utils/**/*.tsx"        // ← Thêm
  ]
}
```

### **Bước 8: Cấu hình TypeScript cho apps**

**Cập nhật `apps/*/tsconfig.json`:**

```json
// apps/dating-app/tsconfig.json
{
  "compilerOptions": {
    "rootDir": "../..",           // ← Quan trọng: Set về project root
    "skipLibCheck": true,         // ← Quan trọng: Skip lib checking
    "paths": {
      "@/*": ["./src/*"],
      "@social-media/assets": ["../../assets/index.ts"],
      "@social-media/hooks": ["../../hooks/index.ts"],
      "@social-media/utils": ["../../utils/index.ts"]     // ← Thêm
    }
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "../../assets/**/*.ts",       // ← Include external files
    "../../assets/**/*.tsx",
    "../../hooks/**/*.ts",
    "../../hooks/**/*.tsx",
    "../../utils/**/*.ts",        // ← Thêm
    "../../utils/**/*.tsx"        // ← Thêm
  ]
}
```

## 🎯 Sử dụng trong dự án

### **Import từ thư mục ROOT LEVEL:**

```tsx
// ✅ Import assets
import { LogoIcon, HeartIcon } from '@social-media/assets'

// ✅ Import hooks
import { useDeviceDetection, useIsMobile } from '@social-media/hooks'

// ✅ Import utils (ví dụ)
import { formatDate, validateEmail } from '@social-media/utils'

// ✅ Import styles
import '@social-media/styles'
```

### **Sử dụng trong component:**

```tsx
import React from 'react'
import { LogoIcon } from '@social-media/assets'
import { useDeviceDetection } from '@social-media/hooks'
import { formatDate } from '@social-media/utils'

const MyComponent = () => {
  const { isMobile, deviceType } = useDeviceDetection()
  const currentDate = formatDate(new Date())

  return (
    <div>
      <LogoIcon />
      <p>Device: {deviceType}</p>
      <p>Date: {currentDate}</p>
      {isMobile ? 'Mobile View' : 'Desktop View'}
    </div>
  )
}

export default MyComponent
```

## 🔑 Key Points để nhớ

### **1. Cấu hình TypeScript quan trọng:**
- ✅ `"rootDir": "../.."` - Set về project root
- ✅ `"skipLibCheck": true` - Skip external lib checking
- ✅ `"allowJs": true` - Allow JS files
- ✅ Include external files trong `"include"` array

### **2. Pattern đặt tên:**
- ✅ Thư mục: `kebab-case` (utils, assets, hooks)
- ✅ Package name: `@social-media/folder-name`
- ✅ Import path: `@social-media/folder-name`

### **3. Cấu trúc file bắt buộc:**
- ✅ `index.ts` - Export file
- ✅ `package.json` - Package metadata
- ✅ `project.json` - NX project config
- ✅ `tsconfig.json` - TypeScript config

### **4. Workspaces:**
- ✅ Thêm vào `package.json` root workspaces
- ✅ Thêm paths vào `tsconfig.base.json`
- ✅ Cập nhật tất cả libs và apps tsconfig

## 🚀 Commands hữu ích

```bash
# Chạy dev server
npx nx dev dating-app

# Build production
npx nx build dating-app

# Lint code
npx nx lint dating-app

# Type check
npx nx type-check hooks

# Xem dependency graph
npx nx graph

# List tất cả projects
npx nx show projects
```

## 📚 Tài liệu tham khảo

- [NX Documentation](https://nx.dev)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
- [TypeScript Paths](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
- [Tailwind CSS](https://tailwindcss.com/docs)
