# Panduan Deployment Kemiri Cafe

## Masalah yang Diperbaiki

Sebelumnya aplikasi menggunakan `output: 'export'` yang membuat static export, namun admin routes memerlukan server-side functionality untuk autentikasi. Ini menyebabkan error saat:
- Mengakses `/admin` langsung
- Refresh halaman setelah login admin

## Solusi yang Diterapkan

### 1. Konfigurasi Next.js
- Menghapus `output: 'export'` dari `next.config.js`
- Aplikasi sekarang menggunakan server-side rendering untuk admin routes

### 2. Middleware Protection
- Middleware di `middleware.ts` menangani autentikasi admin di level server
- Otomatis redirect ke `/admin/login` jika tidak terautentikasi

### 3. Error Handling
- Admin layout memiliki error handling yang lebih baik
- Not-found page untuk admin routes yang tidak valid

## Cara Deploy

### Opsi 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Opsi 2: Railway/Netlify dengan Server
```bash
npm run build
npm run start
```

### Opsi 3: Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Environment Variables

Pastikan environment variables berikut tersedia:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Testing Deployment

1. Akses homepage: `https://yourdomain.com`
2. Akses admin: `https://yourdomain.com/admin` (harus redirect ke login)
3. Login admin dan refresh halaman (harus tetap di admin area)

## Troubleshooting

### Jika masih error:
1. Cek logs server untuk error messages
2. Pastikan environment variables benar
3. Cek koneksi Supabase
4. Pastikan database memiliki tabel `profiles` dengan kolom `is_admin`

### Jika redirect loop:
1. Hapus cookies browser
2. Cek middleware configuration
3. Pastikan Supabase auth session valid