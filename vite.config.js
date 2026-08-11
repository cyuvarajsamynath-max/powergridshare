import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // This is the key line!

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // This makes the styles work!
  ],
})
