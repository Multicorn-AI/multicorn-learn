import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
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
