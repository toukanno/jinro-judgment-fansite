import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        character: resolve(__dirname, 'character.html'),
        characters: resolve(__dirname, 'characters.html'),
        composition: resolve(__dirname, 'composition.html'),
        copipe: resolve(__dirname, 'copipe.html'),
        exclusion: resolve(__dirname, 'exclusion.html'),
        faq: resolve(__dirname, 'faq.html'),
        glossary: resolve(__dirname, 'glossary.html'),
        guide: resolve(__dirname, 'guide.html'),
        'queen-wise': resolve(__dirname, 'queen-wise.html'),
        roles: resolve(__dirname, 'roles.html'),
        'rope-calc': resolve(__dirname, 'rope-calc.html'),
        strategy: resolve(__dirname, 'strategy.html'),
        templates: resolve(__dirname, 'templates.html'),
        timer: resolve(__dirname, 'timer.html'),
        v3roles: resolve(__dirname, 'v3roles.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
})
