/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    SERVER_URL: 'http://localhost:8001/api/v1',
    DESCRIPTION: 'Hrku adalah aplikasi AllInOne yang dibuat untuk memudahkan HRD dalam mengelola penggajian, data karyawan, cuti karyawan, dll.'
  },
  images: {
    domains: ['cdn.antaranews.com'],
  },
}
