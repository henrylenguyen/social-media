# Storybook Next.js Navigation Mocking

## Cách hoạt động

Chúng ta đã thiết lập một hệ thống mock cho Next.js navigation trong Storybook để có thể test các component sử dụng `usePathname()` với các trạng thái active khác nhau.

## Cấu trúc

1. **Mock module** (`__mocks__/next-navigation.js`):
   - Tạo mock cho `usePathname`, `useRouter`, etc.
   - Expose function `__setPathname` để update pathname dynamically

2. **Webpack alias** (trong `main.ts`):
   ```typescript
   'next/navigation': join(__dirname, '__mocks__/next-navigation.js')
   ```

3. **Decorator** (trong `preview.tsx`):
   - Đọc `pathname` từ story parameters
   - Gọi `window.__setPathname()` để update mock

## Cách sử dụng trong Stories

```typescript
export const ChatsActive: Story = {
  parameters: {
    nextRouter: {
      pathname: '/chats', // Này sẽ được set vào mock
    },
  },
}
```

## Test Components

- `libs/molecules/src/sidebar/sidebar.tsx` - Test active states
- `.storybook/test-pathname.stories.tsx` - Simple test component

## Debug

Kiểm tra console log để xem:
- "Setting pathname to: [path]" 
- "usePathname called, returning: [path]"

Này sẽ giúp debug nếu có vấn đề với mocking.
