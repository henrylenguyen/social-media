const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const readline = require('readline')

// Component type classification
const atomComponents = [
  'alert',
  'avatar',
  'badge',
  'button',
  'checkbox',
  'dialog',
  'input',
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

const organismComponents = [
  'data-table',
  'form',
  'sidebar',
  'table',
  'combobox',
  'date-picker',
  'resizable',
  'scroll-area',
  'sonner',
  'chart',
  'radio-group',
  'toggle-group',
]

// Create interface to read user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Determine the component type (atom, molecule, organism)
function getComponentType(componentName) {
  if (atomComponents.includes(componentName)) {
    return 'atoms'
  } else if (moleculeComponents.includes(componentName)) {
    return 'molecules'
  } else if (organismComponents.includes(componentName)) {
    return 'organisms'
  }

  // For unknown components, return null
  return null
}

// Check if necessary files exist for shadcn
function ensureComponentsJson(libPath) {
  const componentsJsonPath = path.join(libPath, 'components.json')

  // If components.json doesn't exist, create it
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

    // Create components.json
    fs.writeFileSync(
      componentsJsonPath,
      JSON.stringify(componentsJsonContent, null, 2),
    )
    console.log(
      `✅ Đã tạo file components.json trong ${path.basename(libPath)}`,
    )
  }
}

// Ensure utils directory and cn.ts exists
function ensureUtils(libPath) {
  const utilsDir = path.join(libPath, 'src', 'utils')
  const cnFilePath = path.join(utilsDir, 'cn.ts')

  // Create utils directory if it doesn't exist
  if (!fs.existsSync(utilsDir)) {
    fs.mkdirSync(utilsDir, { recursive: true })
  }

  // Create cn.ts if it doesn't exist
  if (!fs.existsSync(cnFilePath)) {
    const cnFileContent = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}`
    fs.writeFileSync(cnFilePath, cnFileContent)
    console.log(`✅ Đã tạo file utils/cn.ts trong ${path.basename(libPath)}`)
  }
}

// Ensure styles directory and globals.css exists (Deprecated - no longer needed)
function ensureStyles(libPath) {
  // No longer creating styles directory in libs since we use global styles
  console.log(`ℹ️ Bỏ qua tạo thư mục styles trong ${path.basename(libPath)} - sử dụng '@social-media/styles' thay thế`)
}

// Ensure tailwind.config.js exists
function ensureTailwindConfig(libPath) {
  const tailwindConfigPath = path.join(libPath, 'tailwind.config.js')

  // Create tailwind.config.js if it doesn't exist
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
    console.log(
      `✅ Đã tạo file tailwind.config.js trong ${path.basename(libPath)} tham chiếu đến cấu hình root`,
    )
  }
}

// Ensure postcss.config.js exists
function ensurePostcssConfig(libPath) {
  const postcssConfigPath = path.join(libPath, 'postcss.config.js')

  // Create postcss.config.js if it doesn't exist
  if (!fs.existsSync(postcssConfigPath)) {
    const postcssConfigContent = `// Sử dụng cấu hình PostCSS từ thư mục root
module.exports = require('../../postcss.config.js');`
    fs.writeFileSync(postcssConfigPath, postcssConfigContent)
    console.log(
      `✅ Đã tạo file postcss.config.js trong ${path.basename(libPath)} tham chiếu đến cấu hình root`,
    )
  }
}

// Ensure all required files exist for shadcn
function ensureRequiredFiles(libPath) {
  ensureComponentsJson(libPath)
  ensureUtils(libPath)
  ensureStyles(libPath)
  ensureTailwindConfig(libPath)
  ensurePostcssConfig(libPath)
}

// Create Storybook file for the component
function createStorybookFile(componentName, componentType, componentFilePath) {
  let storyFilePath
  let storyImportPath

  if (componentType === 'atoms') {
    storyFilePath = path.join(
      path.dirname(componentFilePath),
      `${componentName}.stories.tsx`,
    )
    storyImportPath = `./${componentName}`
  } else {
    storyFilePath = path.join(
      path.dirname(componentFilePath),
      `${componentName}.stories.tsx`,
    )
    storyImportPath = `./${componentName}`
  }

  // Read the component file to get the exported component names
  const componentContent = fs.readFileSync(componentFilePath, 'utf8')
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

  // Find the main component export (usually has the same name as the file)
  let mainComponentName = exportNames.find(
    (name) =>
      name.toLowerCase() ===
      componentName.charAt(0).toUpperCase() +
      componentName.slice(1).toLowerCase() ||
      name === componentName.charAt(0).toUpperCase() + componentName.slice(1),
  )

  // If we can't find a matching name, use the first export or a default name
  if (!mainComponentName && exportNames.length > 0) {
    mainComponentName = exportNames[0]
  } else if (!mainComponentName) {
    mainComponentName =
      componentName.charAt(0).toUpperCase() + componentName.slice(1)
  }

  // Create story file content based on component type
  let storyContent

  if (componentType === 'atoms') {
    storyContent = `import type { Meta, StoryObj } from '@storybook/react';
import { ${mainComponentName} } from '${storyImportPath}';

/**
 * ${mainComponentName} component from shadcn UI
 */
const meta: Meta<typeof ${mainComponentName}> = {
  title: 'Atoms/${mainComponentName}',
  component: ${mainComponentName},
  tags: ['autodocs'],
  argTypes: {
    // Define controls for the component props here
  },
};

export default meta;
type Story = StoryObj<typeof ${mainComponentName}>;

/**
 * Default ${mainComponentName} component
 */
export const Default: Story = {
  args: {
    // Define default props here
  },
};
`
  } else if (componentType === 'molecules') {
    storyContent = `import type { Meta, StoryObj } from '@storybook/react';
import { ${mainComponentName} } from '${storyImportPath}';

/**
 * ${mainComponentName} component from shadcn UI
 */
const meta: Meta<typeof ${mainComponentName}> = {
  title: 'Molecules/${mainComponentName}',
  component: ${mainComponentName},
  tags: ['autodocs'],
  argTypes: {
    // Define controls for the component props here
  },
};

export default meta;
type Story = StoryObj<typeof ${mainComponentName}>;

/**
 * Default ${mainComponentName} component
 */
export const Default: Story = {
  args: {
    // Define default props here
  },
};
`
  } else {
    // organisms
    storyContent = `import type { Meta, StoryObj } from '@storybook/react';
import { ${mainComponentName} } from '${storyImportPath}';

/**
 * ${mainComponentName} component from shadcn UI
 */
const meta: Meta<typeof ${mainComponentName}> = {
  title: 'Organisms/${mainComponentName}',
  component: ${mainComponentName},
  tags: ['autodocs'],
  argTypes: {
    // Define controls for the component props here
  },
};

export default meta;
type Story = StoryObj<typeof ${mainComponentName}>;

/**
 * Default ${mainComponentName} component
 */
export const Default: Story = {
  args: {
    // Define default props here
  },
};
`
  }

  fs.writeFileSync(storyFilePath, storyContent)
  console.log(`✅ Đã tạo file Storybook cho component ${componentName}`)

  return storyFilePath
}

// Main function to create component
function createComponent(componentName, componentType = null) {
  if (!componentName || componentName.trim() === '') {
    console.error('Lỗi: Tên component không được để trống!')
    process.exit(1)
  }

  // Try to find Tailwind and other dependencies
  try {
    require.resolve('tailwindcss')
    require.resolve('tailwind-merge')
    require.resolve('clsx')
  } catch (error) {
    console.log('⚠️ Thiếu các thư viện cần thiết. Đang cài đặt...')
    execSync(
      'npm install -D tailwindcss autoprefixer postcss tailwindcss-animate',
      { stdio: 'inherit' },
    )
    execSync(
      'npm install tailwind-merge clsx class-variance-authority lucide-react',
      { stdio: 'inherit' },
    )
  }

  // Determine component type if not provided
  if (!componentType) {
    componentType = getComponentType(componentName)
  }

  try {
    // If componentType is still null, we couldn't determine it automatically
    if (!componentType) {
      return askComponentType(componentName)
    }

    const libPath = path.join(__dirname, 'libs', componentType)

    // Make sure library directory exists
    if (!fs.existsSync(libPath)) {
      console.error(`Thư viện ${componentType} không tồn tại.`)
      process.exit(1)
    }

    // Make sure all required files exist
    ensureRequiredFiles(libPath)

    // Create component directory if it doesn't exist
    let componentDir
    if (componentType === 'atoms') {
      componentDir = path.join(libPath, 'src', componentName)
    } else {
      componentDir = path.join(libPath, 'src', 'lib', componentName)
    }

    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true })
      console.log(`✅ Đã tạo thư mục ${componentName} trong ${componentType}`)
    }

    console.log(
      `⏳ Đang tạo component ${componentName} trong ${componentType}...`,
    )

    // Path where shadcn should create the component
    let shadcnPath
    if (componentType === 'atoms') {
      shadcnPath = `src/${componentName}`
    } else {
      shadcnPath = `src/lib/${componentName}`
    }

    // Create component with shadcn
    execSync(
      `cd ${libPath} && npx shadcn@latest add ${componentName} -y --path=${shadcnPath}`,
      { stdio: 'inherit' },
    )

    // Check if file was created successfully
    let targetFilePath
    let possiblePaths = []

    if (componentType === 'atoms') {
      targetFilePath = path.join(componentDir, `${componentName}.tsx`)
      possiblePaths = [
        path.join(libPath, 'src', '@', 'ui', `${componentName}.tsx`),
        path.join(libPath, 'src', 'ui', `${componentName}.tsx`),
      ]
    } else {
      targetFilePath = path.join(componentDir, `${componentName}.tsx`)
      possiblePaths = [
        path.join(libPath, 'src', 'lib', '@', 'ui', `${componentName}.tsx`),
        path.join(libPath, 'src', 'lib', 'ui', `${componentName}.tsx`),
        path.join(libPath, 'src', '@', 'ui', `${componentName}.tsx`),
        path.join(libPath, 'src', 'ui', `${componentName}.tsx`),
      ]
    }

    // Move file if it was created in a different location
    let fileFound = false
    for (const oldPath of possiblePaths) {
      if (fs.existsSync(oldPath)) {
        fileFound = true

        // Read file content
        const fileContent = fs.readFileSync(oldPath, 'utf8')

        // Update import paths based on component type
        let updatedContent
        if (componentType === 'atoms') {
          updatedContent = fileContent
            .replace(/from "..\/utils\/cn"/g, 'from "../utils/cn"')
            .replace(/from "..\/lib\/utils"/g, 'from "../utils/cn"')
            .replace(/from "@\/lib\/utils"/g, 'from "../utils/cn"')
            .replace(/from "src\/lib\/utils"/g, 'from "src/utils/cn"')
        } else {
          updatedContent = fileContent
            .replace(
              /from "..\/utils\/cn"/g,
              'from "@social-media/atoms/utils/cn"',
            )
            .replace(
              /from "..\/lib\/utils"/g,
              'from "@social-media/atoms/utils/cn"',
            )
            .replace(
              /from "@\/lib\/utils"/g,
              'from "@social-media/atoms/utils/cn"',
            )
            .replace(
              /from "src\/lib\/utils"/g,
              'from "@social-media/atoms/utils/cn"',
            )

          // Add import for any atom dependencies if they exist in atoms lib
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

            // Check for common atom dependencies
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
                  `import { ${dep.charAt(0).toUpperCase() + dep.slice(1)
                  } } from '@social-media/atoms';`,
                )
                // Replace local imports with package imports
                updatedContent = updatedContent.replace(
                  new RegExp(`from "\\.\/${dep}`, 'g'),
                  `from '@social-media/atoms'`,
                )
              }
            }

            if (atomImports.length > 0) {
              // Add imports at the top of the file
              updatedContent = atomImports.join('\n') + '\n' + updatedContent
            }
          }
        }

        // Write to the new location
        fs.writeFileSync(targetFilePath, updatedContent)
        fs.unlinkSync(oldPath) // Delete old file
        console.log(
          `✅ Đã di chuyển component ${componentName} đến đúng thư mục`,
        )
        break
      }
    }

    // Clean up any empty directories
    cleanupEmptyDirectories(libPath)

    // Check if component file was created successfully
    if (fs.existsSync(targetFilePath)) {
      console.log(`✅ Đã tạo thành công component ${componentName}`)

      // Create Storybook file
      createStorybookFile(componentName, componentType, targetFilePath)

      // Create index.ts file in component directory if needed (for molecules and organisms)
      if (componentType !== 'atoms') {
        const indexComponentPath = path.join(componentDir, 'index.ts')
        if (!fs.existsSync(indexComponentPath)) {
          fs.writeFileSync(
            indexComponentPath,
            `export * from './${componentName}';\n`,
          )
          console.log(`✅ Đã tạo file index.ts trong thư mục component`)
        }
      }

      // Update main index.ts to export new component
      const indexFilePath =
        componentType === 'atoms'
          ? path.join(libPath, 'src', 'index.ts')
          : path.join(libPath, 'src', 'index.ts')

      if (fs.existsSync(indexFilePath)) {
        const indexContent = fs.readFileSync(indexFilePath, 'utf8')
        let exportStatement

        if (componentType === 'atoms') {
          exportStatement = `export * from './${componentName}/${componentName}';\n`
        } else {
          exportStatement = `export * from './lib/${componentName}';\n`
        }

        if (!indexContent.includes(exportStatement.trim())) {
          fs.appendFileSync(indexFilePath, exportStatement)
          console.log(`✅ Đã cập nhật index.ts để export component mới`)
        } else {
          console.log(`ℹ️ Component đã được export trong index.ts`)
        }
      } else {
        // Create index.ts if it doesn't exist
        const indexDir = path.dirname(indexFilePath)
        if (!fs.existsSync(indexDir)) {
          fs.mkdirSync(indexDir, { recursive: true })
        }

        let exportStatement
        if (componentType === 'atoms') {
          exportStatement = `export * from './${componentName}/${componentName}';\n`
        } else {
          exportStatement = `export * from './lib/${componentName}';\n`
        }

        fs.writeFileSync(indexFilePath, exportStatement)
        console.log(`✅ Đã tạo file index.ts để export component mới`)
      }
    } else if (!fileFound) {
      console.log(`❌ Không tìm thấy file component sau khi tạo`)
      console.log(
        `⚠️ Vui lòng kiểm tra thư mục ui hoặc @/ui xem component đã được tạo ở đó chưa`,
      )
    }
  } catch (error) {
    console.error('Lỗi:', error.message)
  }
}

// Function to ask for component type
function askComponentType(componentName) {
  rl.question(
    'Chọn loại component (1: atom, 2: molecule, 3: organism): ',
    (answer) => {
      let componentType
      switch (answer.trim()) {
        case '1':
          componentType = 'atoms'
          break
        case '2':
          componentType = 'molecules'
          break
        case '3':
          componentType = 'organisms'
          break
        default:
          console.error('Lựa chọn không hợp lệ!')
          rl.close()
          return
      }

      createComponent(componentName, componentType)
      rl.close()
    },
  )
}

// Helper function to clean up empty directories
function cleanupEmptyDirectories(basePath) {
  const dirsToCheck = [
    path.join(basePath, 'src', 'ui'),
    path.join(basePath, 'src', '@', 'ui'),
    path.join(basePath, 'src', '@'),
    path.join(basePath, 'src', 'lib', 'ui'),
    path.join(basePath, 'src', 'lib', '@', 'ui'),
    path.join(basePath, 'src', 'lib', '@'),
  ]

  for (const dir of dirsToCheck) {
    if (fs.existsSync(dir) && fs.readdirSync(dir).length === 0) {
      fs.rmdirSync(dir)
    }
  }
}

// Get component name from command line args or prompt
const componentNameFromArgs = process.argv[2]

if (componentNameFromArgs) {
  // If component name is already in args, use it
  createComponent(componentNameFromArgs)
  rl.close()
} else {
  // Ask user to input component name
  rl.question('Nhập tên component bạn muốn tạo: ', (componentName) => {
    createComponent(componentName)
    rl.close()
  })
}

// Handle interface close
rl.on('close', () => {
  console.log('✨ Quá trình tạo component đã hoàn tất!')
})
