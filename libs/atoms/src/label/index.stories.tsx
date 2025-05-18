import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';
import { Input } from '../input/input';
import { Checkbox } from '../checkbox/checkbox';

/**
 * Component Label từ shadcn UI dùng để tạo nhãn cho các trường form
 */
const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: 'text',
      description: 'ID của element mà label kết nối đến',
    },
    className: {
      control: 'text',
      description: 'Class CSS tùy chỉnh',
    },
    disabled: {
      control: 'boolean',
      description: 'Trạng thái vô hiệu hóa',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

/**
 * Mặc định - Label cơ bản
 */
export const Default: Story = {
  args: {
    children: 'Tên người dùng',
    htmlFor: 'username',
  },
};

/**
 * Label bị vô hiệu hóa
 */
export const Disabled: Story = {
  args: {
    children: 'Tên người dùng',
    htmlFor: 'username',
    disabled: true,
  },
};

/**
 * Label với kích thước và màu sắc tùy chỉnh
 */
export const CustomStyle: Story = {
  args: {
    children: 'Email',
    htmlFor: 'email',
    className: 'text-blue-500 font-bold text-lg',
  },
};

/**
 * Label kết hợp với Input
 */
export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email của bạn" />
    </div>
  ),
};

/**
 * Label kết hợp với Checkbox
 */
export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Chấp nhận điều khoản và điều kiện</Label>
    </div>
  ),
};

/**
 * Label bắt buộc
 */
export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email" className="after:content-['*'] after:ml-0.5 after:text-red-500">
        Email
      </Label>
      <Input type="email" id="email" placeholder="Email của bạn" required />
    </div>
  ),
};

/**
 * Nhiều Label và trường nhập trong form
 */
export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 max-w-md border p-4 rounded">
      <div className="space-y-2">
        <Label htmlFor="name">Họ tên</Label>
        <Input id="name" placeholder="Nhập họ tên của bạn" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="after:content-['*'] after:ml-0.5 after:text-red-500">
          Email
        </Label>
        <Input id="email" type="email" placeholder="Nhập địa chỉ email" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Số điện thoại</Label>
        <Input id="phone" type="tel" placeholder="Nhập số điện thoại" />
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox id="marketing" />
        <Label htmlFor="marketing" className="text-sm text-gray-500">
          Nhận thông tin khuyến mãi qua email
        </Label>
      </div>
    </div>
  ),
};

/**
 * Label với văn bản dài hơn và mô tả
 */
export const LongLabel: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="bio" className="text-base font-medium">
          Giới thiệu bản thân
        </Label>
        <p className="text-sm text-gray-500 -mt-1">
          Viết vài câu để mọi người hiểu thêm về bạn. Thông tin này sẽ hiển thị công khai.
        </p>
        <textarea
          id="bio"
          className="min-h-[80px] w-full rounded-md border border-input px-3 py-2 text-sm"
          placeholder="Viết vài điều về bản thân..."
        />
      </div>
    </div>
  ),
};

/**
 * Label với các trạng thái khác nhau
 */
export const States: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="default">Label mặc định</Label>
        <Input id="default" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="disabled" disabled>
          Label bị vô hiệu hóa
        </Label>
        <Input id="disabled" disabled />
      </div>

      <div className="space-y-2">
        <Label htmlFor="error" className="text-red-500">
          Label lỗi
        </Label>
        <Input id="error" className="border-red-500" />
        <p className="text-xs text-red-500">Thông tin nhập không hợp lệ</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="success" className="text-green-500">
          Label thành công
        </Label>
        <Input id="success" className="border-green-500" />
      </div>
    </div>
  ),
};
