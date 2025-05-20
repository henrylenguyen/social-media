import type { Meta, StoryObj } from '@storybook/react'
import AuthOTPComponent from './authOTP'

/**
 * Component xác thực OTP hoàn chỉnh với đếm ngược và khả năng gửi lại mã.
 *
 * Component này bao gồm:
 * - Đồng hồ đếm ngược cho thời hạn của mã OTP
 * - Trường nhập mã OTP với 6 số
 * - Trạng thái mã hết hạn và nút gửi lại
 * - Trạng thái đếm ngược để gửi lại mã
 */
const meta: Meta<typeof AuthOTPComponent> = {
  title: 'Templates/AuthOTP',
  component: AuthOTPComponent,
  tags: ['autodocs'],
  parameters: {
    // Đặt layout để hiển thị component ở giữa
    layout: 'centered',
    // Thêm hướng dẫn sử dụng chi tiết trong docs
    docs: {
      description: {
        component: `

Component xác thực OTP hoàn chỉnh với nhiều trạng thái khác nhau, giúp người dùng nhập và xác thực mã OTP.

## Các tính năng chính:

- Hiển thị đồng hồ đếm ngược thời gian hiệu lực của mã OTP
- Trường nhập mã OTP với 6 chữ số
- Tự động chuyển trạng thái khi mã OTP hết hạn
- Tính năng gửi lại mã với đếm ngược thời gian chờ
- Trải nghiệm người dùng mượt mà với hiệu ứng chuyển đổi giữa các trạng thái

## Cách sử dụng:

\`\`\`tsx
import { AuthOTP } from '@social-media/templates'

const MyPage = () => {
  return <AuthOTP />
}
\`\`\`

## Giải thích về các trạng thái

1. **Trạng thái mặc định**: Hiển thị đồng hồ đếm ngược OTP và người dùng có thể nhập mã
2. **Mã OTP hết hạn**: Đồng hồ đếm ngược biến mất, trường nhập bị vô hiệu hóa, hiển thị nút "Gửi lại mã"
3. **Có thể gửi lại**: Hiển thị nút "Thử lại" thay vì đồng hồ đếm ngược
4. **Đang gửi lại**: Hiển thị trạng thái loading khi gửi lại mã OTP
        `,
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'CSS classes tùy chỉnh cho container',
    },
  },
}

export default meta
type Story = StoryObj<typeof AuthOTPComponent>

/**
 * Trạng thái mặc định: Đang nhập mã OTP
 *
 * Trong trạng thái này:
 * - Đồng hồ đếm ngược hiển thị thời gian còn lại
 * - Người dùng có thể nhập mã OTP
 * - Có đếm ngược thời gian trước khi có thể gửi lại mã
 */
export const Default: Story = {
  args: {
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Trạng thái mặc định của component, người dùng có thể nhập mã OTP. Đồng hồ đếm ngược hiển thị thời gian còn lại cho mã OTP và người dùng chưa thể gửi lại mã ngay lập tức.',
      },
    },
  },
}

/**
 * Trạng thái trường hợp
 *
 * Để mô phỏng các trạng thái khác nhau của OTP, hãy tham khảo tài liệu hook useAuthOTP
 * và xem cách hook quản lý các trạng thái sau:
 *
 * 1. isCountdownFinished: true - khi mã OTP hết hạn
 * 2. isResendCountdownFinished: true - khi có thể gửi lại mã
 *
 * Lưu ý: Trong ứng dụng thực, các trạng thái này được quản lý tự động
 * bởi các hàm xử lý sự kiện và countdown timers.
 */
export const Examples: Story = {
  parameters: {
    docs: {
      description: {
        story: `
## Cách hoạt động của component

Component AuthOTP sử dụng custom hook useAuthOTP để quản lý các trạng thái khác nhau của quá trình xác thực OTP.

### Các trạng thái chính:

1. **isCountdownFinished**: Xác định xem mã OTP có hết hạn hay không
   - false: Mã OTP còn hiệu lực, hiển thị đồng hồ đếm ngược và trường nhập
   - true: Mã OTP đã hết hạn, ẩn đồng hồ, vô hiệu hóa trường nhập, hiển thị nút "Gửi lại mã"

2. **isResendCountdownFinished**: Xác định xem người dùng có thể gửi lại mã hay không
   - false: Chưa thể gửi lại, hiển thị đồng hồ đếm ngược thời gian chờ
   - true: Có thể gửi lại, hiển thị nút "Thử lại"

### Các hàm xử lý chính:

1. **handleCountdownFinish**: Được gọi khi đồng hồ đếm ngược mã OTP kết thúc
2. **handleResendCountdownFinish**: Được gọi khi đồng hồ đếm ngược gửi lại kết thúc
3. **handleResendOTP**: Được gọi khi người dùng nhấn nút gửi lại mã

### Cách sử dụng thời gian động:

Component sử dụng hai hàm helper để tạo thời gian động:
1. **getOTPTimerEnd()**: Tạo thời gian kết thúc cho mã OTP (thêm 5 phút từ thời điểm hiện tại)
2. **getResendTimerEnd()**: Tạo thời gian kết thúc cho đồng hồ gửi lại (thêm 30 giây từ thời điểm hiện tại)

Nhờ các hàm này, thời gian đếm ngược luôn mới và chính xác mỗi khi component được render.
        `,
      },
    },
  },
  render: () => {
    return (
      <div className='space-y-8'>
        <div className='p-4 bg-blue-50 rounded-lg border border-blue-200'>
          <h3 className='text-lg font-medium text-blue-800 mb-2'>
            Thông tin về Component
          </h3>
          <p className='text-blue-700'>
            Component AuthOTP là một component đầy đủ chức năng quản lý và hiển
            thị trạng thái của quá trình xác thực OTP. Component này sử dụng
            hook <code>useAuthOTP</code> để quản lý các trạng thái nội bộ, không
            cần thêm props để điều khiển.
          </p>
        </div>

        <div className='p-4 bg-orange-50 rounded-lg border border-orange-200'>
          <h3 className='text-lg font-medium text-orange-800 mb-2'>
            Mẹo sử dụng thành phần
          </h3>
          <ul className='space-y-2 text-orange-700'>
            <li>
              • Nếu muốn điều chỉnh thời gian, hãy sửa các hàm{' '}
              <code>getOTPTimerEnd</code> và <code>getResendTimerEnd</code>.
            </li>
            <li>
              • Sử dụng prop <code>className</code> để styling container của
              component.
            </li>
            <li>
              • Component này tự xử lý tất cả các trạng thái, bạn không cần
              truyền thêm props.
            </li>
            <li>
              • Component sẽ tự động gọi <code>console.log</code> khi cần gửi
              lại mã. Thay thế bằng API call trong ứng dụng thực.
            </li>
          </ul>
        </div>

        <AuthOTPComponent />
      </div>
    )
  },
}
