import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      // Especifica o framework para o qual as rotas são geradas (ex: 'react', 'vue').
      target: 'react',
      // Habilita a divisão automática de código para rotas, melhorando a performance de carregamento.
      autoCodeSplitting: true,
      // Define o caminho de saída para o arquivo da árvore de rotas gerado.
      generatedRouteTree: './src/router-tree-gen.ts',
      // Especifica o diretório onde os arquivos de rota estão localizados.
      routesDirectory: './src/pages',
      // Uma string especial usada para identificar rotas de layout, geralmente para layouts aninhados.
      routeToken: 'layout',
    }),
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  }
})
