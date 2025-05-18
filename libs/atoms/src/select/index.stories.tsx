import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '../label/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select'

/**
 * Component Select từ shadcn UI cho phép người dùng chọn một giá trị từ danh sách.
 *
 * Select bao gồm các component con để tạo đầy đủ chức năng:
 * - `Select`: Container chính cho toàn bộ component
 * - `SelectTrigger`: Nút kích hoạt hiển thị dropdown
 * - `SelectValue`: Hiển thị giá trị đã chọn trong trigger
 * - `SelectContent`: Container chứa các tùy chọn trong dropdown
 * - `SelectItem`: Một tùy chọn đơn lẻ trong dropdown
 * - `SelectGroup`: Nhóm các tùy chọn có liên quan
 * - `SelectLabel`: Nhãn cho một nhóm tùy chọn
 * - `SelectSeparator`: Dòng phân cách giữa các nhóm hoặc các tùy chọn
 * - `SelectScrollUpButton`: Nút cuộn lên trong danh sách tùy chọn
 * - `SelectScrollDownButton`: Nút cuộn xuống trong danh sách tùy chọn
 *
 * Các thành phần này cần được sử dụng cùng nhau để tạo ra một dropdown select đầy đủ chức năng.
 */
const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Select>

/**
 * Mặc định - Select cơ bản
 */
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Chọn một lựa chọn' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='option1'>Lựa chọn 1</SelectItem>
        <SelectItem value='option2'>Lựa chọn 2</SelectItem>
        <SelectItem value='option3'>Lựa chọn 3</SelectItem>
      </SelectContent>
    </Select>
  ),
}

/**
 * Select với nhóm tùy chọn và nhãn
 */
export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className='w-[220px]'>
        <SelectValue placeholder='Chọn một quốc gia' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Đông Nam Á</SelectLabel>
          <SelectItem value='vietnam'>Việt Nam</SelectItem>
          <SelectItem value='thailand'>Thái Lan</SelectItem>
          <SelectItem value='singapore'>Singapore</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Đông Bắc Á</SelectLabel>
          <SelectItem value='japan'>Nhật Bản</SelectItem>
          <SelectItem value='korea'>Hàn Quốc</SelectItem>
          <SelectItem value='china'>Trung Quốc</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

/**
 * Select với label
 */
export const WithLabel: Story = {
  render: () => (
    <div className='flex flex-col space-y-2'>
      <Label htmlFor='language'>Ngôn ngữ</Label>
      <Select name='language'>
        <SelectTrigger id='language' className='w-[180px]'>
          <SelectValue placeholder='Chọn ngôn ngữ' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='vn'>Tiếng Việt</SelectItem>
          <SelectItem value='en'>Tiếng Anh</SelectItem>
          <SelectItem value='fr'>Tiếng Pháp</SelectItem>
          <SelectItem value='de'>Tiếng Đức</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

/**
 * Select bị vô hiệu hóa
 */
export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Không thể chọn' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='option1'>Lựa chọn 1</SelectItem>
        <SelectItem value='option2'>Lựa chọn 2</SelectItem>
      </SelectContent>
    </Select>
  ),
}

/**
 * SelectItem bị vô hiệu hóa
 */
export const DisabledItem: Story = {
  render: () => (
    <Select>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Chọn một lựa chọn' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='option1'>Lựa chọn 1</SelectItem>
        <SelectItem value='option2' disabled>
          Lựa chọn bị khóa
        </SelectItem>
        <SelectItem value='option3'>Lựa chọn 3</SelectItem>
      </SelectContent>
    </Select>
  ),
}

/**
 * Select với nhiều mục lựa chọn và cuộn
 */
export const ScrollableSelect: Story = {
  render: () => (
    <Select>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Chọn tháng' />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: 12 }, (_, i) => (
          <SelectItem key={i} value={`${i + 1}`}>
            Tháng {i + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
}

/**
 * Select với kích thước tùy chỉnh
 */
export const CustomSizes: Story = {
  render: () => (
    <div className='flex flex-col space-y-4'>
      <Select>
        <SelectTrigger className='h-8 text-xs w-[180px]'>
          <SelectValue placeholder='Kích thước nhỏ' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='small'>Nhỏ</SelectItem>
          <SelectItem value='medium'>Vừa</SelectItem>
          <SelectItem value='large'>Lớn</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Kích thước mặc định' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='small'>Nhỏ</SelectItem>
          <SelectItem value='medium'>Vừa</SelectItem>
          <SelectItem value='large'>Lớn</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className='h-12 text-base w-[180px]'>
          <SelectValue placeholder='Kích thước lớn' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='small'>Nhỏ</SelectItem>
          <SelectItem value='medium'>Vừa</SelectItem>
          <SelectItem value='large'>Lớn</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

/**
 * Select với màu sắc và kiểu dáng tùy chỉnh
 */
export const CustomStyles: Story = {
  render: () => (
    <div className='flex flex-col space-y-4'>
      <Select>
        <SelectTrigger className='w-[180px] border-primary text-primary'>
          <SelectValue placeholder='Màu chính' />
        </SelectTrigger>
        <SelectContent className='border-primary'>
          <SelectItem value='option1'>Lựa chọn 1</SelectItem>
          <SelectItem value='option2'>Lựa chọn 2</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className='w-[180px] bg-secondary text-white border-secondary'>
          <SelectValue placeholder='Nền xanh' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='option1'>Lựa chọn 1</SelectItem>
          <SelectItem value='option2'>Lựa chọn 2</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className='w-[180px] rounded-full'>
          <SelectValue placeholder='Bo tròn đầy đủ' />
        </SelectTrigger>
        <SelectContent className='rounded-lg'>
          <SelectItem value='option1'>Lựa chọn 1</SelectItem>
          <SelectItem value='option2'>Lựa chọn 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

/**
 * Select trong form
 */
export const InForm: Story = {
  render: () => (
    <form className='space-y-4 border p-4 rounded max-w-md'>
      <div className='space-y-2'>
        <Label htmlFor='name'>Họ tên</Label>
        <input
          id='name'
          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
          placeholder='Họ và tên'
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='country'>Quốc gia</Label>
        <Select name='country'>
          <SelectTrigger id='country' className='w-full'>
            <SelectValue placeholder='Chọn quốc gia' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='vn'>Việt Nam</SelectItem>
            <SelectItem value='us'>Hoa Kỳ</SelectItem>
            <SelectItem value='jp'>Nhật Bản</SelectItem>
            <SelectItem value='kr'>Hàn Quốc</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='city'>Thành phố</Label>
        <Select name='city'>
          <SelectTrigger id='city' className='w-full'>
            <SelectValue placeholder='Chọn thành phố' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='hanoi'>Hà Nội</SelectItem>
            <SelectItem value='hcm'>TP. Hồ Chí Minh</SelectItem>
            <SelectItem value='danang'>Đà Nẵng</SelectItem>
            <SelectItem value='other'>Khác</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <button
        className='px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90'
        type='submit'
      >
        Đăng ký
      </button>
    </form>
  ),
}
