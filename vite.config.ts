import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'Portfolio-2026';

// https://vite.dev/config/
export default defineConfig({
  base: `/${repoName}/`,
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
