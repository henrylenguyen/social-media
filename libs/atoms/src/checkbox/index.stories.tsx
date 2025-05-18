import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';
import { Label } from '../label/label';
import React from 'react';

/**
 * Component Checkbox từ shadcn UI dùng để tạo trường chọn boolean
 */
const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Trạng thái đã chọn hay chưa',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Trạng thái mặc định ban đầu',
    },
    disabled: {
      control: 'boolean',
      description: 'Trạng thái vô hiệu hóa',
    },
    required: {
      control: 'boolean',
      description: 'Trạng thái bắt buộc phải chọn',
    },
    className: {
      control: 'text',
      description: 'Class CSS tùy chỉnh',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Checkbox là component cho phép người dùng chọn một hoặc nhiều mục từ một tập hợp. Thường được sử dụng trong form để lựa chọn, xác nhận điều khoản, và các tùy chọn.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/**
 * Mặc định - Checkbox cơ bản
 */
export const Default: Story = {
  args: {
    id: 'terms',
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" {...args} />
      <Label htmlFor="terms">Chấp nhận điều khoản và điều kiện</Label>
    </div>
  ),
};

/**
 * Checkbox đã chọn
 */
export const Checked: Story = {
  args: {
    id: 'terms',
    defaultChecked: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" {...args} />
      <Label htmlFor="terms">Chấp nhận điều khoản và điều kiện</Label>
    </div>
  ),
};

/**
 * Checkbox bị vô hiệu hóa
 */
export const Disabled: Story = {
  args: {
    id: 'terms',
    disabled: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" {...args} />
      <Label htmlFor="terms" disabled>
        Chấp nhận điều khoản và điều kiện
      </Label>
    </div>
  ),
};

/**
 * Checkbox bị vô hiệu hóa và đã chọn
 */
export const DisabledChecked: Story = {
  args: {
    id: 'terms',
    disabled: true,
    defaultChecked: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" {...args} />
      <Label htmlFor="terms" disabled>
        Chấp nhận điều khoản và điều kiện
      </Label>
    </div>
  ),
};

/**
 * Checkbox với tùy chỉnh màu sắc
 */
export const CustomStyle: Story = {
  args: {
    id: 'custom',
    className: 'border-red-500 text-red-500 focus:ring-red-500',
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="custom" {...args} />
      <Label htmlFor="custom" className="text-red-500">
        Checkbox tùy chỉnh
      </Label>
    </div>
  ),
};

/**
 * Checkbox nhóm trong một danh sách
 */
export const CheckboxGroup: Story = {
  render: () => (
    <div className="space-y-4 border p-4 rounded">
      <h3 className="text-base font-medium mb-2">Lựa chọn sở thích của bạn:</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="music" />
          <Label htmlFor="music">Âm nhạc</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="sports" defaultChecked />
          <Label htmlFor="sports">Thể thao</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="reading" />
          <Label htmlFor="reading">Đọc sách</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="cooking" />
          <Label htmlFor="cooking">Nấu ăn</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="travel" defaultChecked />
          <Label htmlFor="travel">Du lịch</Label>
        </div>
      </div>
    </div>
  ),
};

/**
 * Checkbox trong form hàng ngang
 */
export const HorizontalCheckboxes: Story = {
  render: () => (
    <div className="border p-4 rounded">
      <h3 className="text-base font-medium mb-2">Phương thức liên hệ:</h3>
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="email-contact" defaultChecked />
          <Label htmlFor="email-contact">Email</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="phone-contact" />
          <Label htmlFor="phone-contact">Điện thoại</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="sms-contact" />
          <Label htmlFor="sms-contact">SMS</Label>
        </div>
      </div>
    </div>
  ),
};

/**
 * Checkbox với mô tả
 */
export const CheckboxWithDescription: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Checkbox id="marketing" className="mt-1" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="marketing" className="font-medium">
            Nhận thông tin tiếp thị
          </Label>
          <p className="text-sm text-gray-500">
            Nhận email về sản phẩm mới, khuyến mãi và tin tức từ chúng tôi.
          </p>
        </div>
      </div>

      <div className="flex space-x-2">
        <Checkbox id="terms" className="mt-1" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="terms" className="font-medium">
            Điều khoản dịch vụ
          </Label>
          <p className="text-sm text-gray-500">
            Tôi đồng ý với <a href="#" className="text-primary underline">Điều khoản dịch vụ</a> và{' '}
            <a href="#" className="text-primary underline">Chính sách bảo mật</a>.
          </p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Checkbox với trạng thái đa dạng
 */
export const CheckboxStates: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium mb-1">Mặc định</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="default-unchecked" />
          <Label htmlFor="default-unchecked">Chưa chọn</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="default-checked" defaultChecked />
          <Label htmlFor="default-checked">Đã chọn</Label>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium mb-1">Vô hiệu hóa</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="disabled-unchecked" disabled />
          <Label htmlFor="disabled-unchecked" disabled>
            Vô hiệu hóa & chưa chọn
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="disabled-checked" disabled defaultChecked />
          <Label htmlFor="disabled-checked" disabled>
            Vô hiệu hóa & đã chọn
          </Label>
        </div>
      </div>
    </div>
  ),
};

/**
 * Checkbox tương tác
 */
export const InteractiveCheckbox: Story = {
  render: () => {
    // Giả lập React State
    const CheckboxDemo = () => {
      const [checked, setChecked] = React.useState(false);

      return (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="interactive"
              checked={checked}
              onCheckedChange={() => setChecked(!checked)}
            />
            <Label htmlFor="interactive">
              {checked ? 'Đã chọn' : 'Chưa chọn'}
            </Label>
          </div>

          <div className="bg-gray-100 p-3 rounded text-sm">
            <p>Trạng thái: {checked ? 'Đã chọn ✓' : 'Chưa chọn ✗'}</p>
          </div>

          <button
            className="text-sm text-primary underline"
            onClick={() => setChecked(!checked)}
          >
            {checked ? 'Bỏ chọn' : 'Chọn'} thông qua nút
          </button>
        </div>
      );
    };

    return <CheckboxDemo />;
  },
};
