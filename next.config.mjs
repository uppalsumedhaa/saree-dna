/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Let next/image serve AVIF (smaller still) when the browser supports it,
    // falling back to WebP. Originals stay on disk as a hard fallback.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
