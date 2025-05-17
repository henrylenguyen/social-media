import * as React from 'react'
import { cn } from 'src/utils/cn'

/**
 * Component hiển thị một hình ảnh hoặc nội dung trong một hình tròn.
 * Hỗ trợ cả Next.js Image và thẻ img thông thường cho khả năng tương thích tối đa.
 *
 * @example Sử dụng trong React thông thường:
 * ```tsx
 * <CircleWithImage
 *   imageUrl="https://example.com/avatar.jpg"
 *   className="border border-gray-200"
 * />
 * ```
 *
 * @example Sử dụng với Next.js Image:
 * ```tsx
 * <CircleWithImage
 *   imageUrl="https://example.com/avatar.jpg"
 *   useNextImage={true}
 *   alt="User avatar"
 * />
 * ```
 *
 * @example Sử dụng với React Node:
 * ```tsx
 * <CircleWithImage imageUrl={<HeartIcon width={50} height={50} />} />
 * ```
 */
interface ICircleWithImageProps {
  /**
   * URL của hình ảnh hoặc React Node để hiển thị trong hình tròn.
   * - Nếu là string: Hiển thị hình ảnh (sử dụng next/image hoặc thẻ img tùy vào prop useNextImage)
   * - Nếu là ReactNode: Hiển thị trực tiếp nội dung đó
   */
  imageUrl: string | React.ReactNode

  /**
   * Class CSS tùy chỉnh để áp dụng cho container.
   */
  className?: string

  /**
   * Thuộc tính alt cho hình ảnh, cần thiết cho SEO và accessibility.
   * Chỉ áp dụng khi imageUrl là string.
   * @default 'profile image'
   */
  alt?: string

  /**
   * Xác định có sử dụng Next.js Image hay không.
   * - true: Sử dụng Next.js Image để tối ưu hóa (chỉ hoạt động trong môi trường Next.js)
   * - false: Sử dụng thẻ img thông thường (tương thích với mọi môi trường)
   * @default false
   */
  useNextImage?: boolean
}

/**
 * Kiểm tra có đang chạy trong môi trường Storybook không
 */
const isStorybook = () => {
  try {
    return (
      typeof window !== 'undefined' &&
      window.location &&
      window.location.href.includes('story')
    )
  } catch (e) {
    return false
  }
}

const CircleWithImage: React.FunctionComponent<ICircleWithImageProps> = ({
  className,
  imageUrl,
  alt = 'profile image',
  useNextImage = false,
}) => {
  // React.lazy không hoạt động ở server side nên cần kiểm tra
  const isClient = typeof window !== 'undefined'
  const [NextImageComponent, setNextImageComponent] = React.useState<any>(null)

  // Chỉ import Next/Image khi client-side, cần dùng và không phải trong Storybook
  React.useEffect(() => {
    // Nếu đang chạy trong Storybook, bỏ qua việc import next/image
    if (isClient && useNextImage && !isStorybook()) {
      try {
        import('next/image')
          .then((module) => {
            setNextImageComponent(() => module.default)
          })
          .catch((err) => {
            console.warn('Next/Image không khả dụng:', err)
          })
      } catch (e) {
        console.warn('Error importing next/image:', e)
      }
    }
  }, [isClient, useNextImage])

  return (
    <div
      className={cn(
        'w-[90px] h-[90px] rounded-full bg-white flex items-center justify-center text-2xl p-2',
        useNextImage && 'relative overflow-hidden',
        className,
      )}
    >
      {imageUrl && typeof imageUrl === 'string' ? (
        useNextImage && NextImageComponent && !isStorybook() ? (
          // Sử dụng Next Image khi có sẵn và được yêu cầu
          React.createElement(NextImageComponent, {
            src: imageUrl ?? 'https://i.pravatar.cc/150?u=3',
            alt: alt,
            fill: true,
            sizes: '90px',
            className: 'object-cover rounded-full',
          })
        ) : (
          // Fallback về img thông thường
          <img
            loading='lazy'
            src={imageUrl ?? 'https://i.pravatar.cc/150?u=3'}
            alt={alt}
            width={100}
            height={100}
            className='rounded-full object-cover w-full h-full'
          />
        )
      ) : (
        // Trường hợp imageUrl là React node
        <div>{imageUrl}</div>
      )}
    </div>
  )
}

export default CircleWithImage
