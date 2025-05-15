/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    unoptimized: true,
  },
  // Se o site estiver em um subdiretório do domínio, descomente e ajuste a linha abaixo
  // basePath: '/seu-subdiretorio',
}

export default nextConfig
