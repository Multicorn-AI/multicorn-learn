import createMDX from '@next/mdx'

const isDev = process.env.NODE_ENV !== 'production'
const connectSrc = isDev
  ? "'self' https: http://127.0.0.1:8080 http://localhost:8080 ws: wss:"
  : "'self' https:"

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  `connect-src ${connectSrc}`,
  "frame-ancestors 'none'",
].join('; ')

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/learn/ai-101/articles',
        destination: '/learn/course-1',
        permanent: true,
      },
      {
        source: '/learn/ai-101',
        destination: '/learn/course-1',
        permanent: true,
      },
      {
        source: '/learn/ai-101/:slug',
        destination: '/learn/course-1/:slug',
        permanent: true,
      },
    ]
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {},
})

export default withMDX(nextConfig)
