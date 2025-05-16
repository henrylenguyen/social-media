import { CircleWithImage } from '@social-media/atoms'
import * as React from 'react'
import { cn } from 'src/utils'
import './floatingIcons.css'

/**
 * Component hiển thị nhiều biểu tượng hình tròn di chuyển trôi nổi với hiệu ứng animation.
 * Thường được sử dụng để tạo hiệu ứng trang trí hoặc hiển thị danh sách avatar người dùng một cách sinh động.
 *
 * @example
 * ```tsx
 * <FloatingIcons
 *   items={[
 *     { id: 1, imageUrl: "/images/avatar1.jpg", size: "md" },
 *     { id: 2, imageUrl: "/images/avatar2.jpg", size: "sm" },
 *     { id: 3, imageUrl: "/images/avatar3.jpg", size: "lg" }
 *   ]}
 * />
 * ```
 */

export interface FloatingItem {
  /**
   * Định danh duy nhất cho mỗi biểu tượng.
   * Được sử dụng làm key khi render danh sách.
   */
  id: string | number

  /**
   * Đường dẫn hình ảnh hoặc ReactNode sẽ được hiển thị trong biểu tượng.
   */
  imageUrl: string | React.ReactNode

  /**
   * Kích thước của biểu tượng.
   * - 'sm': Nhỏ (75% kích thước mặc định)
   * - 'md': Trung bình (kích thước mặc định)
   * - 'lg': Lớn (125% kích thước mặc định)
   *
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Class CSS tùy chỉnh cho biểu tượng.
   * Dùng để tùy chỉnh kiểu dáng cho từng biểu tượng riêng lẻ.
   */
  className?: string
}

export interface FloatingIconsProps {
  /**
   * Mảng các đối tượng FloatingItem cần hiển thị.
   * Mỗi item sẽ được hiển thị như một biểu tượng trôi nổi riêng biệt.
   */
  items: FloatingItem[]

  /**
   * Class CSS tùy chỉnh cho container chính.
   * Dùng để thay đổi kiểu dáng của toàn bộ component.
   */
  className?: string

  /**
   * Cho biết có hiển thị container layout cho các icon hay không.
   * Nếu không có container, nó sẽ lấy layout nào có position 'relative'.
   */
  haveContainer?: boolean

  /**
   * Xác định vị trí hiển thị của các biểu tượng.
   * - 'front': Hiển thị phía trước nội dung (mặc định)
   * - 'back': Hiển thị phía sau nội dung và có độ mờ hơn
   *
   * @default 'front'
   */
  position?: 'front' | 'back'
}

/**
 * Component tạo hiệu ứng các biểu tượng hình tròn di chuyển trôi nổi.
 * Mỗi biểu tượng sẽ di chuyển theo đường dẫn ngẫu nhiên nhưng có tính xác định,
 * với tốc độ và độ trễ khác nhau để tạo cảm giác tự nhiên.
 */
const FloatingIcons: React.FC<FloatingIconsProps> = ({
  items,
  className,
  haveContainer,
  position = 'front', // Default to front
}) => {
  const [isClient, setIsClient] = React.useState(false)

  // Only run on client-side
  React.useEffect(() => {
    setIsClient(true)

    // Create all the keyframes for the items
    items.forEach((_, index) => {
      createKeyframes(index)
    })

    // Cleanup on unmount
    return () => {
      items.forEach((_, index) => {
        const animationName = `float-item-${index}`
        const existingStyle = document.querySelector(
          `style[data-animation="${animationName}"]`,
        )
        if (existingStyle) {
          existingStyle.remove()
        }
      })
    }
  }, [items.length]) // Only re-run if the number of items changes

  const getSizeClass = (size?: 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'sm':
        return 'scale-75'
      case 'lg':
        return 'scale-125'
      default:
        return ''
    }
  }

  // Generate the keyframes for an item and add them to the document
  const createKeyframes = (index: number) => {
    // Create semi-random but deterministic values based on index
    const seed = (index * 17) % 100

    // Create a unique path for this item
    // We use 3-4 control points for a more natural movement
    const path = [
      { x: 0, y: 0, rotation: 0 },
      { x: 50 + (seed % 80), y: -30 - (seed % 40), rotation: 5 },
      { x: 100 + (seed % 100), y: 20 + (seed % 30), rotation: -3 },
      { x: 50 - (seed % 50), y: 40 + (seed % 30), rotation: 2 },
      { x: 0, y: 0, rotation: 0 },
    ]

    // Create a unique animation name for this item
    const animationName = `float-item-${index}`

    // Add the keyframes to the document if it doesn't exist yet
    const existingStyle = document.querySelector(
      `style[data-animation="${animationName}"]`,
    )
    if (!existingStyle) {
      const keyframes = `
        @keyframes ${animationName} {
          0% { transform: translate(${path[0].x}px, ${path[0].y}px) rotate(${path[0].rotation}deg); }
          25% { transform: translate(${path[1].x}px, ${path[1].y}px) rotate(${path[1].rotation}deg); }
          50% { transform: translate(${path[2].x}px, ${path[2].y}px) rotate(${path[2].rotation}deg); }
          75% { transform: translate(${path[3].x}px, ${path[3].y}px) rotate(${path[3].rotation}deg); }
          100% { transform: translate(${path[4].x}px, ${path[4].y}px) rotate(${path[4].rotation}deg); }
        }
      `

      const styleElement = document.createElement('style')
      styleElement.setAttribute('data-animation', animationName)
      styleElement.textContent = keyframes
      document.head.appendChild(styleElement)
    }
  }

  // Generate animation style for an item
  const getAnimationStyle = (index: number) => {
    // Create semi-random but deterministic values based on index
    const seed = (index * 17) % 100

    // Starting positions (distributed across the container)
    const startX = 10 + (seed % 4) * 20
    const startY = 15 + (seed % 5) * 15

    // Animation duration (between 40-60s)
    const duration = 40 + (seed % 20)

    // Animation delay (staggered)
    const delay = (index % 5) * 3

    // Create a unique animation name for this item
    const animationName = `float-item-${index}`

    return {
      top: `${startY}%`,
      left: `${startX}%`,
      animation: isClient
        ? `${animationName} ${duration}s ease-in-out infinite ${delay}s`
        : 'none',
    }
  }

  // Determine container classes based on position prop
  const containerClasses = cn(
    haveContainer ?? 'floating-icons-container',
    position === 'back'
      ? 'floating-icons-background'
      : 'floating-icons-foreground',
    className,
  )

  // Determine icon classes based on position prop
  const getIconClasses = (item: FloatingItem) => {
    return cn(
      'shadow-lg',
      getSizeClass(item.size),
      position === 'back'
        ? 'opacity-30 hover:opacity-40'
        : 'opacity-90 hover:opacity-100',
      item.className,
    )
  }

  return (
    <div className={containerClasses}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className={cn('floating-icon', position === 'back' ? 'z-0' : 'z-10')}
          style={getAnimationStyle(index)}
        >
          <CircleWithImage
            imageUrl={item.imageUrl}
            className={getIconClasses(item)}
          />
        </div>
      ))}
    </div>
  )
}

export default FloatingIcons
