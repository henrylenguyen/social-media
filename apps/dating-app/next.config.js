//@ts-check

const { composePlugins, withNx } = require('@nx/next')
const path = require('path')

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {},
  // Configure webpack to allow src/ imports in libraries
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      src: path.resolve(__dirname, '../../libs/atoms/src'),
      '@social-media/styles': path.resolve(__dirname, '../../styles/globals.css'),
      '@styles': path.resolve(__dirname, '../../styles'),
    }
    return config
  },
}

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
]

module.exports = composePlugins(...plugins)(nextConfig)
