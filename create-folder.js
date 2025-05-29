#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const boxen = require('boxen')

// Colors for terminal output
const colors = {
  success: '\x1b[32m',
  error: '\x1b[31m',
  info: '\x1b[36m',
  warning: '\x1b[33m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
}

const log = {
  success: (msg) => console.log(`${colors.success}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.error}❌ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.info}ℹ️  ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.warning}⚠️  ${msg}${colors.reset}`),
  bold: (msg) => console.log(`${colors.bold}${msg}${colors.reset}`),
}

// Predefined folder types with descriptions
const folderTypes = [
  {
    name: 'utils - Tiện ích và helper functions',
    value: 'utils',
    description: 'Shared utility functions và helper methods',
    keywords: ['utils', 'helpers', 'shared'],
  },
  {
    name: 'shared - Business logic chung',
    value: 'shared',
    description: 'Shared business logic và common types',
    keywords: ['shared', 'business-logic', 'types'],
  },
  {
    name: 'tools - Development tools',
    value: 'tools',
    description: 'Development tools và build scripts',
    keywords: ['tools', 'scripts', 'development'],
  },
  {
    name: 'configs - Configuration files',
    value: 'configs',
    description: 'Shared configuration files',
    keywords: ['configs', 'configuration', 'settings'],
  },
  {
    name: 'constants - Hằng số chung',
    value: 'constants',
    description: 'Shared constants và enums',
    keywords: ['constants', 'enums', 'shared'],
  },
  {
    name: 'services - API services',
    value: 'services',
    description: 'Shared API services và clients',
    keywords: ['services', 'api', 'clients'],
  },
  {
    name: 'validators - Validation schemas',
    value: 'validators',
    description: 'Shared validation schemas và rules',
    keywords: ['validators', 'validation', 'schemas'],
  },
  {
    name: 'other - Loại khác (tự nhập)',
    value: 'other',
    description: 'Custom folder type',
    keywords: ['custom'],
  },
]

async function createFolder() {
  try {
    // Welcome message
    console.clear()
    console.log(
      boxen(
        `${colors.bold}🚀 NX MONOREPO FOLDER CREATOR${colors.reset}\n\n` +
          `Tạo thư mục mới ở ROOT LEVEL cho dự án NX monorepo\n` +
          `Tự động tạo tất cả files cần thiết và cập nhật config`,
        {
          padding: 1,
          margin: 1,
          borderStyle: 'round',
          borderColor: 'cyan',
        },
      ),
    )

    // Ask questions
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'folderType',
        message: '📁 Chọn loại thư mục bạn muốn tạo:',
        choices: folderTypes,
        pageSize: 8,
      },
      {
        type: 'input',
        name: 'customType',
        message: '📝 Nhập tên loại thư mục (ví dụ: middleware, database):',
        when: (answers) => answers.folderType === 'other',
        validate: (input) => {
          if (!input.trim()) {
            return 'Vui lòng nhập tên loại thư mục!'
          }
          if (!/^[a-z][a-z0-9-]*$/.test(input.trim())) {
            return 'Tên chỉ được chứa chữ thường, số và dấu gạch ngang, bắt đầu bằng chữ!'
          }
          return true
        },
      },
      {
        type: 'input',
        name: 'folderName',
        message: '📂 Nhập tên thư mục:',
        default: (answers) => answers.customType || answers.folderType,
        validate: (input) => {
          if (!input.trim()) {
            return 'Vui lòng nhập tên thư mục!'
          }
          if (!/^[a-z][a-z0-9-]*$/.test(input.trim())) {
            return 'Tên chỉ được chứa chữ thường, số và dấu gạch ngang, bắt đầu bằng chữ!'
          }
          if (fs.existsSync(input.trim())) {
            return 'Thư mục đã tồn tại!'
          }
          return true
        },
      },
      {
        type: 'input',
        name: 'description',
        message: '📋 Nhập mô tả cho thư mục:',
        default: (answers) => {
          const selectedType = folderTypes.find(
            (t) => t.value === answers.folderType,
          )
          return selectedType
            ? selectedType.description
            : 'Custom shared functionality'
        },
      },
      {
        type: 'input',
        name: 'keywords',
        message: '🏷️  Nhập keywords (cách nhau bởi dấu phẩy):',
        default: (answers) => {
          const selectedType = folderTypes.find(
            (t) => t.value === answers.folderType,
          )
          return selectedType
            ? selectedType.keywords.join(', ')
            : 'shared, custom'
        },
      },
      {
        type: 'confirm',
        name: 'confirm',
        message: '✅ Xác nhận tạo thư mục với thông tin trên?',
        default: true,
      },
    ])

    if (!answers.confirm) {
      log.warning('Đã hủy tạo thư mục.')
      return
    }

    const folderName = answers.folderName.trim()
    const description = answers.description.trim()
    const keywords = answers.keywords
      .split(',')
      .map((k) => k.trim())
      .filter((k) => k)

    log.info(`Đang tạo thư mục "${folderName}"...`)

    // 1. Create folder structure
    createFolderStructure(folderName)

    // 2. Create package.json
    createPackageJson(folderName, description, keywords)

    // 3. Create project.json
    createProjectJson(folderName, description)

    // 4. Create tsconfig.json
    createTsConfig(folderName)

    // 5. Create index.ts
    createIndexFile(folderName)

    // 6. Update tsconfig.base.json
    updateTsConfigBase(folderName)

    // 7. Update root package.json
    updateRootPackageJson(folderName)

    // 8. Update libs tsconfig files
    updateLibsTsConfig(folderName)

    // Success message
    console.log(
      boxen(
        `${colors.success}🎉 HOÀN THÀNH!${colors.reset}\n\n` +
          `✅ Đã tạo thư mục: ${colors.bold}${folderName}${colors.reset}\n` +
          `✅ Đã tạo tất cả files cần thiết\n` +
          `✅ Đã cập nhật các config files\n\n` +
          `📁 Cấu trúc đã tạo:\n` +
          `├── ${folderName}/\n` +
          `│   ├── index.ts\n` +
          `│   ├── package.json\n` +
          `│   ├── project.json\n` +
          `│   └── tsconfig.json\n\n` +
          `🚀 Bây giờ bạn có thể sử dụng:\n` +
          `import { ... } from '@social-media/${folderName}'`,
        {
          padding: 1,
          margin: 1,
          borderStyle: 'round',
          borderColor: 'green',
        },
      ),
    )
  } catch (error) {
    log.error(`Lỗi: ${error.message}`)
    console.error(error)
  }
}

function createFolderStructure(folderName) {
  log.info('📁 Tạo cấu trúc thư mục...')

  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName, { recursive: true })
    log.success(`Đã tạo thư mục: ${folderName}/`)
  }
}

function createPackageJson(folderName, description, keywords) {
  log.info('📦 Tạo package.json...')

  const packageJson = {
    name: `@social-media/${folderName}`,
    version: '1.0.0',
    description: description,
    main: 'index.ts',
    types: 'index.ts',
    exports: {
      '.': {
        types: './index.ts',
        import: './index.ts',
        default: './index.ts',
      },
      './package.json': './package.json',
    },
    keywords: keywords,
    private: true,
    peerDependencies: {
      react: '>=16.8.0',
    },
  }

  const packagePath = path.join(folderName, 'package.json')
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2))
  log.success(`Đã tạo: ${packagePath}`)
}

function createProjectJson(folderName, description) {
  log.info('⚙️ Tạo project.json...')

  const projectJson = {
    name: folderName,
    $schema: '../node_modules/nx/schemas/project-schema.json',
    sourceRoot: folderName,
    projectType: 'library',
    tags: ['scope:shared', `type:${folderName}`],
    targets: {
      lint: {
        executor: '@nx/eslint:lint',
        outputs: ['{options.outputFile}'],
        options: {
          lintFilePatterns: [`${folderName}/**/*.{ts,tsx,js,jsx}`],
        },
      },
      'type-check': {
        executor: '@nx/js:tsc',
        outputs: ['{options.outputPath}'],
        options: {
          outputPath: `dist/${folderName}`,
          main: `${folderName}/index.ts`,
          tsConfig: `${folderName}/tsconfig.json`,
        },
      },
    },
  }

  const projectPath = path.join(folderName, 'project.json')
  fs.writeFileSync(projectPath, JSON.stringify(projectJson, null, 2))
  log.success(`Đã tạo: ${projectPath}`)
}

function createTsConfig(folderName) {
  log.info('📝 Tạo tsconfig.json...')

  const tsConfig = {
    extends: '../tsconfig.base.json',
    compilerOptions: {
      module: 'esnext',
      lib: ['DOM', 'DOM.Iterable', 'ES6'],
      allowJs: true,
      skipLibCheck: true,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      strict: true,
      forceConsistentCasingInFileNames: true,
      moduleResolution: 'node',
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: 'react-jsx',
    },
    include: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    exclude: ['node_modules', 'dist'],
  }

  const tsConfigPath = path.join(folderName, 'tsconfig.json')
  fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2))
  log.success(`Đã tạo: ${tsConfigPath}`)
}

function createIndexFile(folderName) {
  log.info('📄 Tạo index.ts...')

  const indexContent = `// ${
    folderName.charAt(0).toUpperCase() + folderName.slice(1)
  } exports
// Add your exports here

// Example:
// export { default as SomeUtil } from './some-util'
// export * from './some-module'
// export type { SomeType } from './types'

export const ${folderName}Info = {
  name: '${folderName}',
  version: '1.0.0',
  description: 'Shared ${folderName} functionality'
}
`

  const indexPath = path.join(folderName, 'index.ts')
  fs.writeFileSync(indexPath, indexContent)
  log.success(`Đã tạo: ${indexPath}`)
}

function updateTsConfigBase(folderName) {
  log.info('🔧 Cập nhật tsconfig.base.json...')

  const tsConfigBasePath = 'tsconfig.base.json'
  if (!fs.existsSync(tsConfigBasePath)) {
    log.error('Không tìm thấy tsconfig.base.json')
    return
  }

  const tsConfigBase = JSON.parse(fs.readFileSync(tsConfigBasePath, 'utf8'))

  if (!tsConfigBase.compilerOptions) {
    tsConfigBase.compilerOptions = {}
  }
  if (!tsConfigBase.compilerOptions.paths) {
    tsConfigBase.compilerOptions.paths = {}
  }

  // Add new paths
  tsConfigBase.compilerOptions.paths[`@social-media/${folderName}`] = [
    `./${folderName}/index.ts`,
  ]
  tsConfigBase.compilerOptions.paths[`@${folderName}/*`] = [`./${folderName}/*`]

  fs.writeFileSync(tsConfigBasePath, JSON.stringify(tsConfigBase, null, 2))
  log.success('Đã cập nhật tsconfig.base.json')
}

function updateRootPackageJson(folderName) {
  log.info('📦 Cập nhật package.json root...')

  const packageJsonPath = 'package.json'
  if (!fs.existsSync(packageJsonPath)) {
    log.error('Không tìm thấy package.json root')
    return
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

  if (!packageJson.workspaces) {
    packageJson.workspaces = []
  }

  if (!packageJson.workspaces.includes(folderName)) {
    packageJson.workspaces.push(folderName)
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  log.success('Đã cập nhật package.json root')
}

function updateLibsTsConfig(folderName) {
  log.info('🔧 Cập nhật libs tsconfig files...')

  const libsDir = 'libs'
  if (!fs.existsSync(libsDir)) {
    log.warning('Không tìm thấy thư mục libs')
    return
  }

  const libFolders = fs
    .readdirSync(libsDir)
    .filter((item) => fs.statSync(path.join(libsDir, item)).isDirectory())

  libFolders.forEach((libFolder) => {
    const tsConfigLibPath = path.join(libsDir, libFolder, 'tsconfig.lib.json')

    if (fs.existsSync(tsConfigLibPath)) {
      try {
        const tsConfigLib = JSON.parse(fs.readFileSync(tsConfigLibPath, 'utf8'))

        if (!tsConfigLib.compilerOptions) {
          tsConfigLib.compilerOptions = {}
        }
        if (!tsConfigLib.compilerOptions.paths) {
          tsConfigLib.compilerOptions.paths = {}
        }

        // Add paths if they don't exist
        const socialMediaPath = `@social-media/${folderName}`
        const shortPath = `@${folderName}/*`

        if (!tsConfigLib.compilerOptions.paths[socialMediaPath]) {
          tsConfigLib.compilerOptions.paths[socialMediaPath] = [
            `../../${folderName}/index.ts`,
          ]
        }
        if (!tsConfigLib.compilerOptions.paths[shortPath]) {
          tsConfigLib.compilerOptions.paths[shortPath] = [
            `../../${folderName}/*`,
          ]
        }

        // Add to include array
        if (!tsConfigLib.include) {
          tsConfigLib.include = []
        }

        const includePattern1 = `../../${folderName}/**/*.ts`
        const includePattern2 = `../../${folderName}/**/*.tsx`

        if (!tsConfigLib.include.includes(includePattern1)) {
          tsConfigLib.include.push(includePattern1)
        }
        if (!tsConfigLib.include.includes(includePattern2)) {
          tsConfigLib.include.push(includePattern2)
        }

        fs.writeFileSync(tsConfigLibPath, JSON.stringify(tsConfigLib, null, 2))
        log.success(`Đã cập nhật: ${tsConfigLibPath}`)
      } catch (error) {
        log.warning(`Không thể cập nhật ${tsConfigLibPath}: ${error.message}`)
      }
    }
  })
}

// Run the script
if (require.main === module) {
  createFolder().catch(console.error)
}

module.exports = { createFolder }
