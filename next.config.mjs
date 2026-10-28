/** @type {import('next').NextConfig} */
const [repositoryOwner, repositoryName] = (process.env.GITHUB_REPOSITORY || '').split('/');
const isUserOrOrgSite =
  repositoryName?.toLowerCase() === `${repositoryOwner?.toLowerCase()}.github.io`;
const basePath =
  process.env.GITHUB_ACTIONS === 'true' && repositoryName && !isUserOrOrgSite
    ? `/${repositoryName}`
    : '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'www.bugatti.com',
      },
      {
        protocol: 'https',
        hostname: 'newsroom.bugatti.com',
      },
    ],
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
};

export default nextConfig;
