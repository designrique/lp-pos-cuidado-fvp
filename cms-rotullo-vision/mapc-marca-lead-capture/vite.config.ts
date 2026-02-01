import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// Função auxiliar para copiar diretórios recursivamente
function copyFolderRecursive(source: string, target: string) {
  // Ensure target directory exists
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  // Copy all files and subdirectories
  fs.readdirSync(source).forEach((item: string) => {
    const sourcePath = path.join(source, item);
    const targetPath = path.join(target, item);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      copyFolderRecursive(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    {
      name: 'copy-netlify-files',
      closeBundle() {
        try {
          // Copiar o arquivo _redirects para a pasta dist após o build
          fs.copyFileSync('public/_redirects', 'dist/_redirects');
          console.log('✅ _redirects file copied to dist folder');
          
          // Garantir que o diretório de funções exista
          if (!fs.existsSync('dist/.netlify/functions')) {
            fs.mkdirSync('dist/.netlify/functions', { recursive: true });
          }
          
          // Copiar funções do Netlify para o diretório correto
          copyFolderRecursive('netlify/functions', 'dist/.netlify/functions');
          console.log('✅ Netlify functions copied to dist folder');
        } catch (error) {
          console.error('❌ Error copying Netlify files:', error);
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: true,
        pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : [],
        passes: 2, // Reduzir para evitar problemas com React
        unsafe: false, // Desabilitar otimizações unsafe que podem quebrar React
        unsafe_comps: false,
        unsafe_math: false,
      },
      mangle: {
        safari10: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separar node_modules em chunks menores e mais específicos
          if (id.includes('node_modules')) {
            // React e React DOM devem ficar juntos no vendor principal
            // para garantir que sempre estejam disponíveis antes de qualquer lazy load
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor'; // Manter no vendor principal - sempre carregado primeiro
            }
            // Radix UI components (dependem de React)
            if (id.includes('@radix-ui')) {
              return 'radix-ui';
            }
            // React Router e TanStack Query (dependem de React)
            if (id.includes('@tanstack') || id.includes('react-router')) {
              return 'router-vendor';
            }
            // Supabase
            if (id.includes('@supabase')) {
              return 'supabase-vendor';
            }
            // Lucide icons (pode ser grande)
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            // Resto das dependências (incluindo React)
            return 'vendor';
          }
          // Não separar componentes em chunks próprios para evitar problemas com React
          // Os componentes lazy-loaded já fazem code splitting naturalmente
        },
        // Otimizar nomes de chunks
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Otimizar nomes de assets
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    cssCodeSplit: true,
    cssMinify: true,
    sourcemap: false,
    chunkSizeWarningLimit: 500, // Reduzir ainda mais para forçar chunks menores
    target: 'es2015', // Melhor compatibilidade e menor tamanho
    reportCompressedSize: false, // Melhorar velocidade de build
  },
}));