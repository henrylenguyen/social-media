const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const readline = require('readline')

// Thêm thư viện chalk để định dạng màu cho terminal
let chalk
try {
  chalk = require('chalk')
} catch (error) {
  console.log('Đang cài đặt chalk để hiển thị màu sắc...')
  execSync('npm install chalk@4.1.2', { stdio: 'inherit' }) // Sử dụng phiên bản 4 để tương thích CommonJS
  chalk = require('chalk')
}

// Thêm thư viện inquirer để tạo menu tương tác
let inquirer
try {
  inquirer = require('inquirer')
} catch (error) {
  console.log('Đang cài đặt inquirer để tạo menu tương tác...')
  execSync('npm install inquirer@8.2.5', { stdio: 'inherit' }) // Sử dụng phiên bản 8 để tương thích CommonJS
  inquirer = require('inquirer')
}

// Thêm thư viện ora để hiển thị spinner
let ora
try {
  ora = require('ora')
} catch (error) {
  console.log('Đang cài đặt ora để hiển thị spinner...')
  execSync('npm install ora@5.4.1', { stdio: 'inherit' }) // Sử dụng phiên bản 5 để tương thích CommonJS
  ora = require('ora')
}

// Thêm thư viện boxen để tạo box
let boxen
try {
  boxen = require('boxen')
} catch (error) {
  console.log('Đang cài đặt boxen để tạo box...')
  execSync('npm install boxen@5.1.2', { stdio: 'inherit' }) // Sử dụng phiên bản 5 để tương thích CommonJS
  boxen = require('boxen')
}

// ==========================================
// DANH SÁCH PHÂN LOẠI COMPONENTS
// ==========================================
// Danh sách các components thuộc nhóm atoms (nguyên tử - những thành phần cơ bản nhất)
const atomComponents = [
  'alert',
  'avatar',
  'badge',
  'button',
  'checkbox',
  'dialog',
  'input',
  'input-otp', // Component với dấu gạch ngang
  'label',
  'progress',
  'radio',
  'select',
  'separator',
  'skeleton',
  'slider',
  'switch',
  'textarea',
  'toast',
  'toggle',
  'aspect-ratio',
  'breadcrumb',
]

// Danh sách các components thuộc nhóm molecules (phân tử - kết hợp từ nhiều atoms)
const moleculeComponents = [
  'card',
  'calendar',
  'command',
  'dropdown-menu',
  'hover-card',
  'menubar',
  'navigation-menu',
  'pagination',
  'popover',
  'sheet',
  'tabs',
  'tooltip',
  'accordion',
  'context-menu',
  'collapsible',
  'carousel',
  'input-otp',
  'alert-dialog',
  'badge',
  'drawer',
]

// Danh sách các components thuộc nhóm organisms (sinh vật - kết hợp từ nhiều molecules)
const organismComponents = [
  'data-table',
  'form',
  'sidebar',
  'table',
  'combobox',
  'resizable',
  'scroll-area',
  'sonner',
  'chart',
  'radio-group',
  'toggle-group',
]

// ==========================================
// CÁC HÀM TIỆN ÍCH
// ==========================================

/**
 * Hiển thị thông báo thành công
 * @param {string} message Nội dung thông báo
 */
function success(message) {
  console.log(chalk.green('✅ ') + message)
}

/**
 * Hiển thị thông báo thông tin
 * @param {string} message Nội dung thông báo
 */
function info(message) {
  console.log(chalk.blue('ℹ️ ') + message)
}

/**
 * Hiển thị thông báo cảnh báo
 * @param {string} message Nội dung thông báo
 */
function warning(message) {
  console.log(chalk.yellow('⚠️ ') + message)
}

/**
 * Hiển thị thông báo lỗi
 * @param {string} message Nội dung thông báo
 */
function error(message) {
  console.log(chalk.red('❌ ') + message)
}

/**
 * Hiển thị tiêu đề
 * @param {string} message Nội dung tiêu đề
 */
function title(message) {
  console.log(
    boxen(chalk.bold.cyan(message), {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'cyan',
    }),
  )
}

/**
 * Hiển thị spinner trong quá trình xử lý
 * @param {string} message Nội dung thông báo
 * @returns {object} Spinner instance
 */
function spinner(message) {
  return ora({
    text: message,
    color: 'cyan',
  }).start()
}

// ==========================================
// CÁC HÀM CHUYỂN ĐỔI TÊN COMPONENT
// ==========================================

/**
 * Chuyển đổi tên từ dạng dash-case sang camelCase
 * Ví dụ: input-otp -> inputOtp
 */
function dashToCamelCase(str) {
  return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
}

/**
 * Chuyển đổi tên từ camelCase sang PascalCase (viết hoa chữ cái đầu)
 * Ví dụ: inputOtp -> InputOtp
 */
function toPascalCase(str) {
  const camelCase = dashToCamelCase(str)
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1)
}

// ==========================================
// XÁC ĐỊNH LOẠI COMPONENT
// ==========================================

/**
 * Xác định loại component (atom, molecule, organism) dựa vào tên
 * @param {string} componentName Tên component cần xác định
 * @returns {string|null} Loại component hoặc null nếu không xác định được
 */
function getComponentType(componentName) {
  if (atomComponents.includes(componentName)) {
    return 'atoms'
  } else if (moleculeComponents.includes(componentName)) {
    return 'molecules'
  } else if (organismComponents.includes(componentName)) {
    return 'organisms'
  }

  // Nếu không tìm thấy trong danh sách, trả về null
  return null
}

// ==========================================
// CÁC HÀM THIẾT LẬP MÔI TRƯỜNG
// ==========================================

/**
 * Đảm bảo file components.json tồn tại (cần thiết cho shadcn)
 * @param {string} libPath Đường dẫn thư viện
 */
function ensureComponentsJson(libPath) {
  const componentsJsonPath = path.join(libPath, 'components.json')

  // Nếu components.json chưa tồn tại, tạo mới
  if (!fs.existsSync(componentsJsonPath)) {
    const componentsJsonContent = {
      $schema: 'https://ui.shadcn.com/schema.json',
      style: 'default',
      rsc: false,
      tsx: true,
      tailwind: {
        config: '../../tailwind.config.js',
        css: '../../styles/globals.css',
        baseColor: 'slate',
        cssVariables: true,
      },
      aliases: {
        components: 'src',
        utils: 'src/utils',
      },
    }

    // Tạo file components.json
    fs.writeFileSync(
      componentsJsonPath,
      JSON.stringify(componentsJsonContent, null, 2),
    )
    success(`Đã tạo file components.json trong ${path.basename(libPath)}`)
  }
}

/**
 * Đảm bảo thư mục utils và file cn.ts tồn tại
 * @param {string} libPath Đường dẫn thư viện
 */
function ensureUtils(libPath) {
  const utilsDir = path.join(libPath, 'src', 'utils')
  const cnFilePath = path.join(utilsDir, 'cn.ts')
  const indexFilePath = path.join(utilsDir, 'index.ts')

  // Tạo thư mục utils nếu chưa tồn tại
  if (!fs.existsSync(utilsDir)) {
    fs.mkdirSync(utilsDir, { recursive: true })
  }

  // Tạo file cn.ts nếu chưa tồn tại
  if (!fs.existsSync(cnFilePath)) {
    const cnFileContent = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}`
    fs.writeFileSync(cnFilePath, cnFileContent)
    success(`Đã tạo file utils/cn.ts trong ${path.basename(libPath)}`)
  }

  // Tạo file index.ts để export cn
  if (!fs.existsSync(indexFilePath)) {
    const indexFileContent = `export { cn } from './cn'
`
    fs.writeFileSync(indexFilePath, indexFileContent)
    success(
      `Đã tạo file utils/index.ts để export cn trong ${path.basename(libPath)}`,
    )
  }
}

/**
 * Hàm này đã không còn cần thiết vì chúng ta sử dụng styles toàn cục
 * @param {string} libPath Đường dẫn thư viện
 */
function ensureStyles(libPath) {
  // Không còn tạo thư mục styles trong libs vì sử dụng styles toàn cục
  info(
    `Bỏ qua tạo thư mục styles trong ${path.basename(
      libPath,
    )} - sử dụng '@social-media/styles' thay thế`,
  )
}

/**
 * Đảm bảo file tailwind.config.js tồn tại
 * @param {string} libPath Đường dẫn thư viện
 */
function ensureTailwindConfig(libPath) {
  const tailwindConfigPath = path.join(libPath, 'tailwind.config.js')

  // Tạo tailwind.config.js nếu chưa tồn tại
  if (!fs.existsSync(tailwindConfigPath)) {
    const tailwindConfigContent = `// Sử dụng cấu hình Tailwind từ thư mục root
const rootTailwindConfig = require('../../tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Kế thừa tất cả từ cấu hình root
  ...rootTailwindConfig,
  // Tùy chỉnh nội dung cho thư viện này nếu cần
  content: [
    './src/**/*.{ts,tsx,js,jsx,html}',
    '!./src/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
    ...rootTailwindConfig.content,
  ],
};`
    fs.writeFileSync(tailwindConfigPath, tailwindConfigContent)
    success(
      `Đã tạo file tailwind.config.js trong ${path.basename(
        libPath,
      )} tham chiếu đến cấu hình root`,
    )
  }
}

/**
 * Đảm bảo file postcss.config.js tồn tại
 * @param {string} libPath Đường dẫn thư viện
 */
function ensurePostcssConfig(libPath) {
  const postcssConfigPath = path.join(libPath, 'postcss.config.js')

  // Tạo postcss.config.js nếu chưa tồn tại
  if (!fs.existsSync(postcssConfigPath)) {
    const postcssConfigContent = `// Sử dụng cấu hình PostCSS từ thư mục root
module.exports = require('../../postcss.config.js');`
    fs.writeFileSync(postcssConfigPath, postcssConfigContent)
    success(
      `Đã tạo file postcss.config.js trong ${path.basename(
        libPath,
      )} tham chiếu đến cấu hình root`,
    )
  }
}

/**
 * Đảm bảo các tsconfig bao gồm files stories
 * @param {string} libPath Đường dẫn thư viện
 */
function ensureTsConfigIncludesStories(libPath) {
  // Cập nhật tsconfig.spec.json
  const tsConfigSpecPath = path.join(libPath, 'tsconfig.spec.json')
  if (fs.existsSync(tsConfigSpecPath)) {
    try {
      // Đọc file hiện tại
      const tsConfigSpec = JSON.parse(fs.readFileSync(tsConfigSpecPath, 'utf8'))

      // Kiểm tra phần include
      if (!tsConfigSpec.include) {
        tsConfigSpec.include = []
      }

      // Thêm pattern stories nếu chưa có
      const hasStoriesPattern = tsConfigSpec.include.some(
        (pattern) =>
          pattern.includes('stories.tsx') || pattern.includes('stories.ts'),
      )

      if (!hasStoriesPattern) {
        tsConfigSpec.include.push('src/**/*.stories.tsx')
        tsConfigSpec.include.push('src/**/*.stories.ts')

        // Ghi lại file
        fs.writeFileSync(
          tsConfigSpecPath,
          JSON.stringify(tsConfigSpec, null, 2),
        )
        success(`Đã cập nhật tsconfig.spec.json để bao gồm các file stories`)
      }
    } catch (err) {
      error(`Lỗi khi cập nhật tsconfig.spec.json: ${err.message}`)
    }
  }

  // Cập nhật tsconfig.storybook.json
  const tsConfigStorybookPath = path.join(libPath, 'tsconfig.storybook.json')
  if (fs.existsSync(tsConfigStorybookPath)) {
    try {
      // Đọc file hiện tại
      const tsConfigStorybook = JSON.parse(
        fs.readFileSync(tsConfigStorybookPath, 'utf8'),
      )

      // Đảm bảo có cấu hình đúng cho Storybook
      if (!tsConfigStorybook.include) {
        tsConfigStorybook.include = []
      }

      // Thêm patterns nếu chưa có
      const patterns = [
        'src/**/*.stories.tsx',
        'src/**/*.stories.ts',
        'src/**/*.tsx',
        'src/**/*.ts',
      ]

      let updated = false
      for (const pattern of patterns) {
        if (!tsConfigStorybook.include.includes(pattern)) {
          tsConfigStorybook.include.push(pattern)
          updated = true
        }
      }

      if (updated) {
        // Ghi lại file
        fs.writeFileSync(
          tsConfigStorybookPath,
          JSON.stringify(tsConfigStorybook, null, 2),
        )
        success(`Đã cập nhật tsconfig.storybook.json cho cấu hình Storybook`)
      }
    } catch (err) {
      error(`Lỗi khi cập nhật tsconfig.storybook.json: ${err.message}`)
    }
  }
}

/**
 * Đảm bảo tất cả các file cần thiết cho shadcn tồn tại
 * @param {string} libPath Đường dẫn thư viện
 */
function ensureRequiredFiles(libPath) {
  ensureComponentsJson(libPath)
  ensureUtils(libPath)
  ensureStyles(libPath)
  ensureTailwindConfig(libPath)
  ensurePostcssConfig(libPath)
  ensureTsConfigIncludesStories(libPath) // Thêm dòng này để cập nhật tsconfig
}

// ==========================================
// TẠO CÁC FILE COMPONENT
// ==========================================

/**
 * Tạo file kiểm thử Jest dựa trên Storybook đã có
 * @param {string} componentName Tên component
 * @param {string} componentType Loại component
 * @param {string} componentFilePath Đường dẫn file component
 * @returns {string} Đường dẫn file test đã tạo
 */
function createTestFile(componentName, componentType, componentFilePath) {
  const camelCaseName = dashToCamelCase(componentName)
  const pascalCaseName = toPascalCase(componentName)
  const testFilePath = path.join(
    path.dirname(componentFilePath),
    `${camelCaseName}.test.tsx`,
  )

  // Viết nội dung file test không sử dụng stories trực tiếp
  const testContent = `import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import * as stories from './index.stories'
import { ${pascalCaseName} } from './${camelCaseName}'

// Sử dụng component trực tiếp để test
describe('${pascalCaseName}', () => {
  it('renders correctly from direct import', () => {
    // Render component trực tiếp
    render(<${pascalCaseName} data-testid="${camelCaseName}" />)

    // Kiểm tra component được render đúng
    expect(screen.getByTestId("${camelCaseName}")).toBeInTheDocument()
  })

  it('renders with Default story props', () => {
    // Lấy props từ Default story nếu có
    const defaultProps = stories.Default?.args || {}

    // Render component với props từ story
    render(<${pascalCaseName} {...defaultProps} data-testid="${camelCaseName}-with-story-props" />)

    // Kiểm tra component được render đúng với props từ story
    expect(screen.getByTestId("${camelCaseName}-with-story-props")).toBeInTheDocument()
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
`

  // Ghi file test
  fs.writeFileSync(testFilePath, testContent)
  success(
    `Đã tạo file test kết nối với Storybook cho component ${componentName}`,
  )

  // Định dạng file
  formatFile(testFilePath)

  return testFilePath
}

/**
 * Tạo file Storybook cho component
 * @param {string} componentName Tên component
 * @param {string} componentType Loại component
 * @param {string} componentFilePath Đường dẫn file component
 * @returns {string|null} Đường dẫn file story hoặc null nếu có lỗi
 */
function createStorybookFile(componentName, componentType, componentFilePath) {
  const camelCaseName = dashToCamelCase(componentName)
  const pascalCaseName = toPascalCase(componentName)

  const storyFilePath = path.join(
    path.dirname(componentFilePath),
    `index.stories.tsx`,
  )

  // Đảm bảo sử dụng đúng đường dẫn import (sử dụng camelCase)
  const storyImportPath = `./${camelCaseName}`

  // Đọc file component để cố gắng xác định tên component chính
  try {
    const componentContent = fs.readFileSync(componentFilePath, 'utf8')
    // Trích xuất tên export
    const exportMatches =
      componentContent.match(
        /export\s+(?:const|function|class|interface)\s+(\w+)/g,
      ) || []

    const exportNames = exportMatches
      .map((match) => {
        const parts = match.split(/\s+/)
        return parts[parts.length - 1]
      })
      .filter((name) => name !== 'interface' && !name.includes('Props'))

    // Tìm tên phù hợp hoặc sử dụng PascalCase
    let mainComponentName = pascalCaseName
    for (const name of exportNames) {
      if (
        name.toLowerCase() === pascalCaseName.toLowerCase() ||
        name === pascalCaseName
      ) {
        mainComponentName = name
        break
      }
    }

    // Tạo nội dung story
    const categoryMap = {
      atoms: 'Atoms',
      molecules: 'Molecules',
      organisms: 'Organisms',
      templates: 'Templates',
    }

    const categoryTitle = categoryMap[componentType] || 'Components'

    const storyContent = `import type { Meta, StoryObj } from '@storybook/react';
import { ${mainComponentName} } from '${storyImportPath}';

/**
 * ${mainComponentName} component
 */
const meta: Meta<typeof ${mainComponentName}> = {
  title: '${categoryTitle}/${mainComponentName}',
  component: ${mainComponentName},
  tags: ['autodocs'],
  argTypes: {
    // Định nghĩa controls cho component props tại đây
    className: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ${mainComponentName}>;

/**
 * Default ${mainComponentName} component
 */
export const Default: Story = {
  args: {
    // Định nghĩa props mặc định tại đây
    'data-testid': '${camelCaseName}',
    className: '${camelCaseName}-container',
    children: '${pascalCaseName} Example',
  },
};

/**
 * Customized ${mainComponentName} example
 */
export const Customized: Story = {
  args: {
    // Định nghĩa props tùy chỉnh tại đây
    'data-testid': '${camelCaseName}-customized',
    className: '${camelCaseName}-customized',
    children: 'Customized ${pascalCaseName}',
  },
};
`

    fs.writeFileSync(storyFilePath, storyContent)
    success(`Đã tạo file Storybook cho component ${componentName}`)

    // Định dạng file story
    formatFile(storyFilePath)

    return storyFilePath
  } catch (err) {
    error(`Lỗi khi tạo file Storybook: ${err.message}`)
    return null
  }
}

// ==========================================
// XỬ LÝ DỌN DẸP THƯ MỤC
// ==========================================

/**
 * Dọn dẹp các thư mục trống
 * @param {string} basePath Đường dẫn cơ sở
 */
function cleanupEmptyDirectories(basePath) {
  const dirsToCheck = [
    path.join(basePath, 'src', 'ui'),
    path.join(basePath, 'src', '@', 'ui'),
    path.join(basePath, 'src', '@'),
    path.join(basePath, 'src', 'components'),
    path.join(basePath, 'src', '@', 'components'),
  ]

  for (const dir of dirsToCheck) {
    if (fs.existsSync(dir) && fs.readdirSync(dir).length === 0) {
      fs.rmdirSync(dir)
    }
  }
}

/**
 * Xóa hoàn toàn các thư mục UI và nội dung bên trong
 * @param {string} basePath Đường dẫn cơ sở
 */
function cleanupUIDirectories(basePath) {
  const dirsToRemove = [
    path.join(basePath, 'src', 'ui'),
    path.join(basePath, 'src', '@', 'ui'),
    path.join(basePath, 'src', 'components'),
    path.join(basePath, 'src', '@', 'components'),
  ]

  for (const dir of dirsToRemove) {
    if (fs.existsSync(dir)) {
      console.log(chalk.yellow('🧹 ') + `Đang xóa thư mục ${dir}...`)
      try {
        // Xóa đệ quy thư mục và nội dung bên trong
        fs.rmSync(dir, { recursive: true, force: true })
        success(`Đã xóa thư mục ${dir} và các file bên trong`)
      } catch (err) {
        error(`Không thể xóa thư mục ${dir}: ${err.message}`)
      }
    }
  }
}

/**
 * Kiểm tra các component phụ do shadcn tạo ra
 * @param {string} libPath Đường dẫn thư viện
 * @param {string} componentType Loại component
 */
function handleAdditionalComponents(libPath, componentType) {
  // Các thư mục có thể chứa component do shadcn tạo
  const uiDirs = [
    path.join(libPath, 'src', 'ui'),
    path.join(libPath, 'src', '@', 'ui'),
    path.join(libPath, 'src', 'components'),
    path.join(libPath, 'src', '@', 'components'),
  ]

  // Danh sách các component atom có thể được tạo ra như là component phụ
  const atomComponentsList = atomComponents.map((c) => {
    const camelCase = dashToCamelCase(c)
    return `${camelCase}.tsx`
  })

  // Kiểm tra từng thư mục UI
  for (const uiDir of uiDirs) {
    if (fs.existsSync(uiDir)) {
      const files = fs.readdirSync(uiDir)

      // Tìm component atom nào được tạo ra như là component phụ
      for (const file of files) {
        if (atomComponentsList.includes(file)) {
          const componentName = file.replace('.tsx', '')
          warning(`Phát hiện component phụ "${componentName}" được tạo ra`)

          // Kiểm tra xem component đã tồn tại trong atoms chưa
          const atomsDir = path.join(__dirname, 'libs', 'atoms')
          const atomsComponentDir = path.join(atomsDir, 'src', componentName)
          const atomsComponentPath = path.join(
            atomsComponentDir,
            `${componentName}.tsx`,
          )

          if (fs.existsSync(atomsComponentPath)) {
            info(`Component ${componentName} đã tồn tại trong atoms, bỏ qua`)
            fs.unlinkSync(path.join(uiDir, file)) // Xóa bản trùng lặp
          } else {
            console.log(
              chalk.magenta('🔄 ') +
                `Di chuyển component ${componentName} vào thư viện atoms...`,
            )

            // Tạo thư mục trong atoms
            if (!fs.existsSync(atomsComponentDir)) {
              fs.mkdirSync(atomsComponentDir, { recursive: true })
            }

            // Đọc nội dung file
            const fileContent = fs.readFileSync(path.join(uiDir, file), 'utf8')

            // Cập nhật các đường dẫn import dựa vào loại component
            let updatedContent
            if (componentType === 'atoms') {
              updatedContent = fileContent
                .replace(/from "..\/utils\/cn"/g, 'from "../utils"')
                .replace(/from "..\/lib\/utils"/g, 'from "../utils"')
                .replace(/from "@\/lib\/utils"/g, 'from "src/utils"')
                .replace(/from "src\/utils\/cn"/g, 'from "src/utils"')
                .replace(/from "src\/lib\/utils"/g, 'from "src/utils"')
                .replace(/from "src\/ui\/(.+?)"/g, 'from "@social-media/atoms"')
                .replace(
                  /from "@social-media\/atoms\/utils"/g,
                  'from "src/utils"',
                )
            } else {
              updatedContent = fileContent
                .replace(/from "..\/utils\/cn"/g, 'from "src/utils"')
                .replace(/from "..\/lib\/utils"/g, 'from "src/utils"')
                .replace(/from "@\/lib\/utils"/g, 'from "src/utils"')
                .replace(/from "src\/utils\/cn"/g, 'from "src/utils"')
                .replace(/from "src\/lib\/utils"/g, 'from "src/utils"')
                .replace(/from "src\/ui\/(.+?)"/g, 'from "@social-media/atoms"')
                .replace(
                  /from "@social-media\/atoms\/utils"/g,
                  'from "src/utils"',
                )

              // Thêm import cho các dependency atom nếu tồn tại trong atoms lib
              const atomsIndexPath = path.join(
                __dirname,
                'libs',
                'atoms',
                'src',
                'index.ts',
              )
              if (fs.existsSync(atomsIndexPath)) {
                const atomsIndex = fs.readFileSync(atomsIndexPath, 'utf8')
                const atomImports = []

                // Kiểm tra các dependency atom phổ biến
                const potentialDependencies = [
                  'button',
                  'input',
                  'label',
                  'checkbox',
                ]
                for (const dep of potentialDependencies) {
                  if (
                    updatedContent.includes(`from "./${dep}`) &&
                    atomsIndex.includes(`from './${dep}`)
                  ) {
                    atomImports.push(
                      `import { ${
                        dep.charAt(0).toUpperCase() + dep.slice(1)
                      } } from '@social-media/atoms'`,
                    )
                    // Thay thế import cục bộ bằng import từ package
                    updatedContent = updatedContent.replace(
                      new RegExp('from "\\./' + dep, 'g'),
                      `from '@social-media/atoms'`,
                    )
                  }
                }

                if (atomImports.length > 0) {
                  // Thêm imports vào đầu file
                  updatedContent =
                    atomImports.join('\n') + '\n' + updatedContent
                }
              }
            }

            // Ghi vào vị trí mới
            const targetPath = path.join(
              atomsComponentDir,
              `${componentName}.tsx`,
            )
            fs.writeFileSync(targetPath, updatedContent)

            // Định dạng file
            formatFile(targetPath)

            // Tạo file Storybook
            createStorybookFile(componentName, 'atoms', targetPath)

            // Tạo file Test
            createTestFile(componentName, 'atoms', targetPath)

            // Cập nhật atoms index.ts
            const atomsIndexPath = path.join(atomsDir, 'src', 'index.ts')
            const exportStatement = `export * from './${componentName}/${componentName}';\n`

            if (fs.existsSync(atomsIndexPath)) {
              const indexContent = fs.readFileSync(atomsIndexPath, 'utf8')
              if (!indexContent.includes(exportStatement.trim())) {
                fs.appendFileSync(atomsIndexPath, exportStatement)
                success(
                  `Đã cập nhật index.ts atoms để export component ${componentName}`,
                )

                // Định dạng file
                formatFile(atomsIndexPath)
              }
            }

            // Xóa file gốc
            fs.unlinkSync(path.join(uiDir, file))
            success(
              `Đã di chuyển thành công component ${componentName} vào atoms`,
            )
          }
        }
      }
    }
  }

  // Dọn dẹp các thư mục UI sau khi xử lý các component phụ
  cleanupUIDirectories(libPath)
}

// ==========================================
// TẠO COMPONENT TÙY CHỈNH
// ==========================================

/**
 * Tạo component tùy chỉnh (không phải từ shadcn)
 * @param {string} componentName Tên component
 * @param {string} componentType Loại component
 * @returns {string} Đường dẫn file component đã tạo
 */
function createCustomComponent(componentName, componentType) {
  const libPath = path.join(__dirname, 'libs', componentType)
  const camelCaseName = dashToCamelCase(componentName)
  const pascalCaseName = toPascalCase(componentName)

  // Tạo thư mục component
  const componentDir = path.join(libPath, 'src', camelCaseName)
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true })
    success(`Đã tạo thư mục ${camelCaseName} trong ${componentType}`)
  }

  // Tạo file component
  const componentFilePath = path.join(componentDir, `${camelCaseName}.tsx`)
  const componentContent = `import * as React from 'react'
import { cn } from 'src/utils'

export interface ${pascalCaseName}Props {
  /**
   * Class CSS tùy chỉnh cho component
   */
  className?: string

  /**
   * Nội dung bên trong component
   */
  children?: React.ReactNode

  /**
   * Các props khác được truyền vào component
   */
  [x: string]: any
}

/**
 * Component ${pascalCaseName} - Mô tả chức năng của component này
 */
const ${pascalCaseName}: React.FC<${pascalCaseName}Props> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn('${camelCaseName}-container', className)}
      {...props}
    >
      {children || '${pascalCaseName} Component'}
    </div>
  )
}

export default ${pascalCaseName}
export { ${pascalCaseName} }
`

  fs.writeFileSync(componentFilePath, componentContent)
  success(`Đã tạo file component ${camelCaseName}.tsx`)

  // Định dạng file
  formatFile(componentFilePath)

  // Tạo file story
  createStorybookFile(componentName, componentType, componentFilePath)

  // Tạo file test
  createTestFile(componentName, componentType, componentFilePath)

  // Cập nhật index.ts thư viện
  const libIndexPath = path.join(libPath, 'src', 'index.ts')
  const exportStatement = `export * from './${camelCaseName}/${camelCaseName}';\n`

  if (fs.existsSync(libIndexPath)) {
    const indexContent = fs.readFileSync(libIndexPath, 'utf8')
    if (!indexContent.includes(exportStatement.trim())) {
      fs.appendFileSync(libIndexPath, exportStatement)
      success(`Đã cập nhật index.ts để export component mới`)

      // Định dạng file index thư viện
      formatFile(libIndexPath)
    }
  } else {
    // Tạo index.ts nếu chưa tồn tại
    const libIndexDir = path.dirname(libIndexPath)
    if (!fs.existsSync(libIndexDir)) {
      fs.mkdirSync(libIndexDir, { recursive: true })
    }

    fs.writeFileSync(libIndexPath, `"use client"\n${exportStatement}`)
    success(`Đã tạo file index.ts để export component mới`)

    // Định dạng file index thư viện
    formatFile(libIndexPath)
  }

  return componentFilePath
}

// ==========================================
// HÀM TẠO COMPONENT CHÍNH
// ==========================================

/**
 * Hàm chính để tạo component - xử lý cả component từ shadcn và component tùy chỉnh
 * @param {string} componentName Tên component
 * @param {string} componentType Loại component (có thể null)
 * @returns {Promise<void>} Promise resolved khi hoàn thành
 */
async function createComponent(componentName, componentType = null) {
  if (!componentName || componentName.trim() === '') {
    error('Lỗi: Tên component không được để trống!')
    process.exit(1)
  }

  const originalName = componentName // Giữ nguyên tên gốc
  const camelCaseName = dashToCamelCase(componentName)
  console.log(
    chalk.cyan('🔆 ') +
      `Sử dụng tên camelCase: ${chalk.bold(camelCaseName)} cho thư mục và file`,
  )

  // Kiểm tra các thư viện cần thiết
  try {
    require.resolve('tailwindcss')
    require.resolve('tailwind-merge')
    require.resolve('clsx')
  } catch (error) {
    warning('Thiếu các thư viện cần thiết. Đang cài đặt...')
    const spin = spinner('Đang cài đặt tailwindcss và các dependencies...')
    try {
      execSync(
        'npm install -D tailwindcss autoprefixer postcss tailwindcss-animate',
        { stdio: 'inherit' },
      )
      execSync(
        'npm install tailwind-merge clsx class-variance-authority lucide-react',
        { stdio: 'inherit' },
      )
      spin.succeed('Đã cài đặt xong các dependencies!')
    } catch (err) {
      spin.fail('Cài đặt thất bại!')
      error(err.message)
      process.exit(1)
    }
  }

  // Xác định loại component nếu không được cung cấp
  if (!componentType) {
    componentType = getComponentType(componentName)
  }

  try {
    // Nếu componentType vẫn là null, không thể xác định tự động
    if (!componentType) {
      componentType = await askComponentType(componentName)
    }

    const libPath = path.join(__dirname, 'libs', componentType)

    // Đảm bảo thư viện tồn tại
    if (!fs.existsSync(libPath)) {
      error(`Thư viện ${componentType} không tồn tại.`)
      process.exit(1)
    }

    // Đảm bảo tất cả các file cần thiết tồn tại
    ensureRequiredFiles(libPath)

    // Kiểm tra xem component có phải từ shadcn không
    const isShadcnComponent =
      atomComponents.includes(originalName) ||
      moleculeComponents.includes(originalName) ||
      organismComponents.includes(originalName)

    if (isShadcnComponent) {
      // ===== XỬ LÝ COMPONENT TỪ SHADCN =====
      // Tạo thư mục component nếu chưa tồn tại
      const componentDir = path.join(libPath, 'src', camelCaseName)

      if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir, { recursive: true })
        success(`Đã tạo thư mục ${camelCaseName} trong ${componentType}`)
      }

      console.log(
        chalk.cyan('⏳ ') +
          `Đang tạo component ${chalk.bold(originalName)} trong ${chalk.bold(
            componentType,
          )}...`,
      )

      // Đường dẫn cho shadcn - chỉ dùng thư mục src, để shadcn tự chọn thư mục con
      const shadcnPath = `src`

      // Tạo component với shadcn CLI - sử dụng tên gốc
      const spin = spinner(`Đang tạo component ${originalName} với shadcn...`)
      try {
        execSync(
          `cd ${libPath} && npx shadcn@latest add ${originalName} -y --path=${shadcnPath}`,
          { stdio: 'ignore' },
        )
        spin.succeed(`Đã tạo component với shadcn CLI!`)
      } catch (err) {
        spin.fail(`Tạo component thất bại!`)
        error(err.message)
        return
      }

      // Kiểm tra các file có thể được tạo ở vị trí khác nhau
      const possibleFilePaths = [
        // Kiểm tra cả tên gốc và tên camelCase
        path.join(libPath, 'src', 'ui', `${originalName}.tsx`),
        path.join(libPath, 'src', 'ui', `${camelCaseName}.tsx`),
        path.join(libPath, 'src', '@', 'ui', `${originalName}.tsx`),
        path.join(libPath, 'src', '@', 'ui', `${camelCaseName}.tsx`),
        path.join(libPath, 'src', 'components', `${originalName}.tsx`),
        path.join(libPath, 'src', 'components', `${camelCaseName}.tsx`),
        path.join(libPath, 'src', '@', 'components', `${originalName}.tsx`),
        path.join(libPath, 'src', '@', 'components', `${camelCaseName}.tsx`),
      ]

      let fileFound = false
      let sourceFilePath = null

      // Kiểm tra tất cả vị trí có thể có của file đã tạo
      for (const filePath of possibleFilePaths) {
        if (fs.existsSync(filePath)) {
          fileFound = true
          sourceFilePath = filePath
          success(`Tìm thấy file component tại: ${filePath}`)
          break
        }
      }

      if (!fileFound) {
        error(`Không tìm thấy file component sau khi tạo`)
        warning(`Vui lòng kiểm tra các thư mục UI để tìm component`)
        return
      }

      // Đường dẫn file mục tiêu trong thư mục component mong muốn
      const targetFilePath = path.join(componentDir, `${camelCaseName}.tsx`)

      // Đọc và sửa đổi nội dung
      const fileContent = fs.readFileSync(sourceFilePath, 'utf8')

      // Cập nhật đường dẫn import dựa trên loại component
      let updatedContent
      if (componentType === 'atoms') {
        updatedContent = fileContent
          .replace(/from "..\/utils\/cn"/g, 'from "../utils"')
          .replace(/from "..\/lib\/utils"/g, 'from "../utils"')
          .replace(/from "@\/lib\/utils"/g, 'from "src/utils"')
          .replace(/from "src\/utils\/cn"/g, 'from "src/utils"')
          .replace(/from "src\/lib\/utils"/g, 'from "src/utils"')
          .replace(/from "src\/ui\/(.+?)"/g, 'from "@social-media/atoms"')
          .replace(/from "@social-media\/atoms\/utils"/g, 'from "src/utils"')
      } else {
        updatedContent = fileContent
          .replace(/from "..\/utils\/cn"/g, 'from "src/utils"')
          .replace(/from "..\/lib\/utils"/g, 'from "src/utils"')
          .replace(/from "@\/lib\/utils"/g, 'from "src/utils"')
          .replace(/from "src\/utils\/cn"/g, 'from "src/utils"')
          .replace(/from "src\/lib\/utils"/g, 'from "src/utils"')
          .replace(/from "src\/ui\/(.+?)"/g, 'from "@social-media/atoms"')
          .replace(/from "@social-media\/atoms\/utils"/g, 'from "src/utils"')
      }

      // Ghi vào vị trí mục tiêu
      fs.writeFileSync(targetFilePath, updatedContent)
      success(`Đã lưu component vào: ${targetFilePath}`)

      // Định dạng file
      formatFile(targetFilePath)

      // Tạo file story
      createStorybookFile(componentName, componentType, targetFilePath)

      // Tạo file test
      createTestFile(componentName, componentType, targetFilePath)

      // Bây giờ an toàn để xóa file gốc và dọn dẹp
      if (sourceFilePath !== targetFilePath) {
        try {
          fs.unlinkSync(sourceFilePath)
        } catch (err) {
          warning(`Không thể xóa file gốc: ${err.message}`)
        }
      }

      // Dọn dẹp các thư mục UI
      cleanupUIDirectories(libPath)

      // Xử lý các component phụ do shadcn tạo ra
      handleAdditionalComponents(libPath, componentType)

      // Cập nhật index.ts thư viện để export component mới
      const libIndexPath = path.join(libPath, 'src', 'index.ts')
      const exportStatement = `export * from './${camelCaseName}/${camelCaseName}';\n`

      if (fs.existsSync(libIndexPath)) {
        const libIndexContent = fs.readFileSync(libIndexPath, 'utf8')
        if (!libIndexContent.includes(exportStatement.trim())) {
          fs.appendFileSync(libIndexPath, exportStatement)
          success(`Đã cập nhật index.ts để export component mới`)
          formatFile(libIndexPath)
        } else {
          info(`Component đã được export trong index.ts`)
        }
      } else {
        fs.writeFileSync(libIndexPath, `"use client"\n${exportStatement}`)
        success(`Đã tạo file index.ts để export component mới`)
        formatFile(libIndexPath)
      }

      success(`Đã tạo thành công component ${componentName}`)
    } else {
      // ===== TẠO COMPONENT TÙY CHỈNH (KHÔNG PHẢI TỪ SHADCN) =====
      console.log(
        chalk.magenta('\n🚀 ') +
          `Component "${chalk.bold(
            componentName,
          )}" không phải là component từ Shadcn`,
      )
      const spin = spinner(`Đang tạo component tùy chỉnh ${componentName}...`)
      try {
        const componentFilePath = createCustomComponent(
          componentName,
          componentType,
        )
        spin.succeed(`Đã tạo component ${componentName} tùy chỉnh thành công!`)
      } catch (err) {
        spin.fail(`Tạo component thất bại!`)
        error(err.message)
      }
    }
  } catch (err) {
    error(`Lỗi: ${err.message}`)
    if (err.stack) {
      console.error(chalk.gray(err.stack))
    }
  }
}

// ==========================================
// HÀM YÊU CẦU NGƯỜI DÙNG CHỌN LOẠI COMPONENT
// ==========================================

/**
 * Yêu cầu người dùng chọn loại component
 * @param {string} componentName Tên component
 * @returns {Promise<string>} Promise với loại component đã chọn
 */
async function askComponentType(componentName) {
  console.log(
    chalk.magenta('\n🚀 ') +
      `Component "${chalk.bold(
        componentName,
      )}" không phải là component từ Shadcn`,
  )

  // Sử dụng inquirer để lấy lựa chọn của người dùng
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'componentType',
      message: 'Chọn loại component:',
      choices: [
        { name: 'Atom (thành phần cơ bản)', value: 'atoms' },
        { name: 'Molecule (kết hợp từ nhiều atoms)', value: 'molecules' },
        { name: 'Organism (kết hợp từ nhiều molecules)', value: 'organisms' },
        { name: 'Template (layout hoặc page template)', value: 'templates' },
      ],
    },
  ])

  console.log(
    chalk.cyan('✓ ') +
      `Đã chọn loại component: ${chalk.bold(answer.componentType)}`,
  )
  return answer.componentType
}

// ==========================================
// HÀM ĐỊNH DẠNG FILE BẰNG PRETTIER
// ==========================================

/**
 * Định dạng file sử dụng Prettier
 * @param {string} filePath Đường dẫn file cần định dạng
 * @returns {boolean} true nếu thành công, false nếu thất bại
 */
function formatFile(filePath) {
  try {
    console.log(
      chalk.cyan('🔄 ') + `Đang format file ${path.basename(filePath)}...`,
    )
    execSync(`npx prettier --write "${filePath}"`, { stdio: 'ignore' })
    console.log(chalk.green('✓ ') + `Đã format file ${path.basename(filePath)}`)
    return true
  } catch (err) {
    warning(`Không thể format file ${path.basename(filePath)}: ${err.message}`)
    return false
  }
}

// ==========================================
// HIỂN THỊ BANNER KHỞI ĐỘNG
// ==========================================

function showBanner() {
  console.log('\n')
  console.log(
    boxen(
      chalk.bold.cyan('Component Creator') +
        '\n\n' +
        chalk.white('Công cụ tạo component nhanh chóng cho dự án React') +
        '\n' +
        chalk.dim('Hỗ trợ Shadcn UI, Storybook, và Jest Testing'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'cyan',
      },
    ),
  )
}

// ==========================================
// XỬ LÝ CHÍNH CỦA SCRIPT
// ==========================================

// Hiển thị banner khởi động
showBanner()

// Hàm main sẽ xử lý quy trình tạo component
async function main() {
  try {
    // Lấy tên component từ tham số dòng lệnh hoặc prompt người dùng
    const componentNameFromArgs = process.argv[2]

    if (componentNameFromArgs) {
      // Nếu tên component đã có trong tham số, sử dụng nó
      await createComponent(componentNameFromArgs)
    } else {
      // Yêu cầu người dùng nhập tên component
      const answer = await inquirer.prompt([
        {
          type: 'input',
          name: 'componentName',
          message: 'Nhập tên component bạn muốn tạo:',
          validate: (input) => {
            if (!input.trim()) {
              return 'Tên component không được để trống!'
            }
            return true
          },
        },
      ])
      await createComponent(answer.componentName)
    }

    // Hiển thị thông báo hoàn thành
    console.log(
      '\n' +
        boxen(chalk.bold.green('✨ Quá trình tạo component đã hoàn tất!'), {
          padding: 1,
          margin: 1,
          borderStyle: 'round',
          borderColor: 'green',
        }),
    )
  } catch (err) {
    error(`Lỗi không xử lý được: ${err.message}`)
    process.exit(1)
  }
}

// Chạy hàm main
main()
