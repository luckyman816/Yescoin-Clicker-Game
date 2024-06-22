// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Load environment variables from .env file
import dotenv from 'dotenv'
dotenv.config()

export default defineConfig({
  plugins: [react()],
  server: {
    port:  4200, // Default to 3000 if not set
  },
})
