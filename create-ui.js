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
  const indexFilePath = path.join(utilsDir, 'index.ts')

  // Create utils directory if it doesn't exist
  if (!fs.existsSync(utilsDir)) {
    fs.mkdirSync(utilsDir, { recursive: true })
  }

  // Create cn.ts if it doesn't exist
  if (!fs.existsSync(cnFilePath)) {
    const cnFileContent = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}`
    fs.writeFileSync(cnFilePath, cnFileContent)
    console.log(`✅ Đã tạo file utils/cn.ts trong ${path.basename(libPath)}`)
  }

  // Create index.ts to export cn
  if (!fs.existsSync(indexFilePath)) {
    const indexFileContent = `export { cn } from './cn'
`
    fs.writeFileSync(indexFilePath, indexFileContent)
    console.log(
      `✅ Đã tạo file utils/index.ts để export cn trong ${path.basename(
        libPath,
      )}`,
    )
  }
}

// Ensure styles directory and globals.css exists (Deprecated - no longer needed)
function ensureStyles(libPath) {
  // No longer creating styles directory in libs since we use global styles
  console.log(
    `ℹ️ Bỏ qua tạo thư mục styles trong ${path.basename(
      libPath,
    )} - sử dụng '@social-media/styles' thay thế`,
  )
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
      `✅ Đã tạo file tailwind.config.js trong ${path.basename(
        libPath,
      )} tham chiếu đến cấu hình root`,
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
      `✅ Đã tạo file postcss.config.js trong ${path.basename(
        libPath,
      )} tham chiếu đến cấu hình root`,
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

  // Always create story file with the name index.stories.tsx
  if (componentType === 'atoms') {
    storyFilePath = path.join(
      path.dirname(componentFilePath),
      `index.stories.tsx`,
    )
    storyImportPath = `./${componentName}`
  } else {
    storyFilePath = path.join(
      path.dirname(componentFilePath),
      `index.stories.tsx`,
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

  // Format story file
  formatFile(storyFilePath)

  return storyFilePath
}

// Helper function to clean up empty directories
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

// Function to forcefully remove UI directories and their contents
function cleanupUIDirectories(basePath) {
  const dirsToRemove = [
    path.join(basePath, 'src', 'ui'),
    path.join(basePath, 'src', '@', 'ui'),
    path.join(basePath, 'src', 'components'),
    path.join(basePath, 'src', '@', 'components'),
  ]

  for (const dir of dirsToRemove) {
    if (fs.existsSync(dir)) {
      console.log(`🧹 Đang xóa thư mục ${dir}...`)
      try {
        // Recursively delete directory and its contents
        fs.rmSync(dir, { recursive: true, force: true })
        console.log(`✅ Đã xóa thư mục ${dir} và các file bên trong`)
      } catch (error) {
        console.error(`❌ Không thể xóa thư mục ${dir}: ${error.message}`)
      }
    }
  }
}

// Function to check for additional components created by shadcn
function handleAdditionalComponents(libPath, componentType) {
  // Path where shadcn might create additional components
  const uiDirs = [
    path.join(libPath, 'src', 'ui'),
    path.join(libPath, 'src', '@', 'ui'),
    path.join(libPath, 'src', 'components'),
    path.join(libPath, 'src', '@', 'components'),
  ]

  // Atom components that should be moved if found
  const atomComponentsList = atomComponents.map((c) => `${c}.tsx`)

  // Check each potential UI directory
  for (const uiDir of uiDirs) {
    if (fs.existsSync(uiDir)) {
      const files = fs.readdirSync(uiDir)

      // Find any atom components that were created as secondary files
      for (const file of files) {
        if (atomComponentsList.includes(file)) {
          const componentName = file.replace('.tsx', '')
          console.log(
            `⚠️ Phát hiện component phụ "${componentName}" được tạo ra`,
          )

          // Check if component already exists in atoms
          const atomsDir = path.join(__dirname, 'libs', 'atoms')
          const atomsComponentDir = path.join(atomsDir, 'src', componentName)
          const atomsComponentPath = path.join(
            atomsComponentDir,
            `${componentName}.tsx`,
          )

          if (fs.existsSync(atomsComponentPath)) {
            console.log(
              `ℹ️ Component ${componentName} đã tồn tại trong atoms, bỏ qua`,
            )
            fs.unlinkSync(path.join(uiDir, file)) // Delete the duplicate
          } else {
            console.log(
              `🔄 Di chuyển component ${componentName} vào thư viện atoms...`,
            )

            // Create directory in atoms
            if (!fs.existsSync(atomsComponentDir)) {
              fs.mkdirSync(atomsComponentDir, { recursive: true })
            }

            // Read file content
            const fileContent = fs.readFileSync(path.join(uiDir, file), 'utf8')

            // Update import paths based on component type
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
                      `import { ${
                        dep.charAt(0).toUpperCase() + dep.slice(1)
                      } } from '@social-media/atoms'`,
                    )
                    // Replace local imports with package imports
                    updatedContent = updatedContent.replace(
                      new RegExp('from "\\./' + dep, 'g'),
                      `from '@social-media/atoms'`,
                    )
                  }
                }

                if (atomImports.length > 0) {
                  // Add imports at the top of the file
                  updatedContent =
                    atomImports.join('\n') + '\n' + updatedContent
                }
              }
            }

            // Write to the new location
            const targetPath = path.join(
              atomsComponentDir,
              `${componentName}.tsx`,
            )
            fs.writeFileSync(targetPath, updatedContent)

            // Format the file
            formatFile(targetPath)

            // Create Storybook file
            createStorybookFile(componentName, 'atoms', targetPath)

            // Update atoms index.ts
            const atomsIndexPath = path.join(atomsDir, 'src', 'index.ts')
            const exportStatement = `export * from './${componentName}/${componentName}';\n`

            if (fs.existsSync(atomsIndexPath)) {
              const indexContent = fs.readFileSync(atomsIndexPath, 'utf8')
              if (!indexContent.includes(exportStatement.trim())) {
                fs.appendFileSync(atomsIndexPath, exportStatement)
                console.log(
                  `✅ Đã cập nhật index.ts atoms để export component ${componentName}`,
                )

                // Format file
                formatFile(atomsIndexPath)
              }
            }

            // Delete original file
            fs.unlinkSync(path.join(uiDir, file))
            console.log(
              `✅ Đã di chuyển thành công component ${componentName} vào atoms`,
            )
          }
        }
      }
    }
  }

  // Clean up UI directories after handling additional components
  cleanupUIDirectories(libPath)
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
    const componentDir = path.join(libPath, 'src', componentName)

    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true })
      console.log(`✅ Đã tạo thư mục ${componentName} trong ${componentType}`)
    }

    console.log(
      `⏳ Đang tạo component ${componentName} trong ${componentType}...`,
    )

    // Path where shadcn should create the component
    const shadcnPath = `src/${componentName}`

    // Create component with shadcn
    execSync(
      `cd ${libPath} && npx shadcn@latest add ${componentName} -y --path=${shadcnPath}`,
      { stdio: 'inherit' },
    )

    // Check if file was created successfully
    const targetFilePath = path.join(componentDir, `${componentName}.tsx`)
    const possiblePaths = [
      path.join(libPath, 'src', '@', 'ui', `${componentName}.tsx`),
      path.join(libPath, 'src', 'ui', `${componentName}.tsx`),
      path.join(libPath, 'src', '@', 'components', `${componentName}.tsx`),
      path.join(libPath, 'src', 'components', `${componentName}.tsx`),
    ]

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
                  `import { ${
                    dep.charAt(0).toUpperCase() + dep.slice(1)
                  } } from '@social-media/atoms'`,
                )
                // Replace local imports with package imports
                updatedContent = updatedContent.replace(
                  new RegExp('from "\\./' + dep, 'g'),
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
        const targetPath = path.join(componentDir, `${componentName}.tsx`)
        fs.writeFileSync(targetPath, updatedContent)

        // Format the file
        formatFile(targetPath)

        // Create Storybook file
        createStorybookFile(componentName, componentType, targetPath)

        break
      }
    }

    // Clean up any empty directories
    cleanupEmptyDirectories(libPath)

    // Check for additional components created by shadcn
    handleAdditionalComponents(libPath, componentType)

    // Check if component file was created successfully
    if (fs.existsSync(targetFilePath)) {
      console.log(`✅ Đã tạo thành công component ${componentName}`)

      // Create Storybook file
      createStorybookFile(componentName, componentType, targetFilePath)

      // Update main index.ts to export new component
      const indexFilePath = path.join(libPath, 'src', 'index.ts')

      if (fs.existsSync(indexFilePath)) {
        const indexContent = fs.readFileSync(indexFilePath, 'utf8')
        // Use component file path to export directly from the component file
        const exportStatement = `export * from './${componentName}/${componentName}';\n`
        const duplicateExport = `export * from './${componentName}/${componentName}';\n`
        // Check for old style export that might exist
        const oldStyleExport = `export * from './${componentName}';\n`

        if (
          !indexContent.includes(exportStatement.trim()) &&
          !indexContent.includes(duplicateExport.trim()) &&
          !indexContent.includes(oldStyleExport.trim())
        ) {
          fs.appendFileSync(indexFilePath, exportStatement)
          console.log(`✅ Đã cập nhật index.ts để export component mới`)

          // Format index file
          formatFile(indexFilePath)
        } else if (indexContent.includes(duplicateExport.trim())) {
          console.log(`ℹ️ Phát hiện export dư thừa trong index.ts, sửa lại...`)
          // Replace duplicated export
          const newContent = indexContent.replace(duplicateExport, '')
          fs.writeFileSync(indexFilePath, newContent)

          // Add correct export if it doesn't exist
          if (!newContent.includes(exportStatement.trim())) {
            fs.appendFileSync(indexFilePath, exportStatement)
          }

          console.log(`✅ Đã sửa export dư thừa trong index.ts`)

          // Format index file
          formatFile(indexFilePath)
        } else if (indexContent.includes(oldStyleExport.trim())) {
          console.log(`ℹ️ Phát hiện export kiểu cũ trong index.ts, sửa lại...`)
          // Replace old style export with new style export
          const newContent = indexContent.replace(
            oldStyleExport,
            exportStatement,
          )
          fs.writeFileSync(indexFilePath, newContent)
          console.log(`✅ Đã sửa export kiểu cũ trong index.ts`)

          // Format index file
          formatFile(indexFilePath)
        } else {
          console.log(`ℹ️ Component đã được export trong index.ts`)
        }
      } else {
        // Create index.ts if it doesn't exist
        const indexDir = path.dirname(indexFilePath)
        if (!fs.existsSync(indexDir)) {
          fs.mkdirSync(indexDir, { recursive: true })
        }

        const exportStatement = `export * from './${componentName}/${componentName}';\n`

        fs.writeFileSync(indexFilePath, exportStatement)
        console.log(`✅ Đã tạo file index.ts để export component mới`)

        // Format index file
        formatFile(indexFilePath)
      }
    } else if (!fileFound) {
      console.log(`❌ Không tìm thấy file component sau khi tạo`)
      console.log(
        `⚠️ Vui lòng kiểm tra thư mục ui hoặc @/ui xem component đã được tạo ở đó chưa`,
      )
    }

    // Make sure UI directories are completely removed
    cleanupUIDirectories(libPath)
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

// Function to format a file using Prettier
function formatFile(filePath) {
  try {
    console.log(`🔄 Đang format file ${path.basename(filePath)}...`)
    execSync(`npx prettier --write "${filePath}"`, { stdio: 'ignore' })
    console.log(`✅ Đã format file ${path.basename(filePath)}`)
    return true
  } catch (error) {
    console.log(
      `⚠️ Không thể format file ${path.basename(filePath)}: ${error.message}`,
    )
    return false
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
