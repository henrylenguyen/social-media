import * as React from 'react';

interface IStep1Props {
}

const Step1: React.FunctionComponent<IStep1Props> = (props) => {
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-2xl font-bold text-gray-900'>
        Bước 1: Tạo Hồ Sơ Của Bạn
      </h1>
      <p className='text-md text-gray-600'>
        Hãy cung cấp những thông tin cơ bản và hình ảnh để bắt đầu.
      </p>
      <h2 className='text-xl font-semibold text-gray-900'>Thông tin cơ bản</h2>
      <h2 className='text-xl font-semibold text-gray-900'>
        Giới thiệu về bản thân
      </h2>
      <h2 className='text-xl font-semibold text-gray-900'>
        Thêm ảnh của bạn (ít nhất 2 ảnh)
      </h2>
    </div>
  )
};

export default Step1;

