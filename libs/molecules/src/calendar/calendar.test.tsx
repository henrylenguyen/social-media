import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Calendar } from './calendar'
import * as stories from './index.stories'

// Sử dụng component trực tiếp để test
describe('Calendar', () => {
  it('renders correctly from direct import', () => {
    // Render component trực tiếp
    render(<Calendar data-testid='calendar' />)

    // Kiểm tra component được render đúng
    expect(screen.getByTestId('calendar')).toBeInTheDocument()
  })

  it('renders with Default story props', () => {
    // Lấy props từ Default story nếu có
    const defaultProps = stories.Default?.args || {}

    // Render component với props từ story
    render(
      <Calendar {...defaultProps} data-testid='calendar-with-story-props' />,
    )

    // Kiểm tra component được render đúng với props từ story
    expect(screen.getByTestId('calendar-with-story-props')).toBeInTheDocument()
  })

  // Thêm các test case đặc biệt khác nếu cần
})

/*
 * Để sử dụng composeStories từ @storybook/test, cài đặt:
 * npm install -D @storybook/test
 *
 * Sau đó bạn có thể sử dụng:
 *
 * import { composeStories } from '@storybook/test'
 * const { Default } = composeStories(stories)
 * render(<Default />)
 */
