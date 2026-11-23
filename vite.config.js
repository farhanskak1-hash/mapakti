import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Mode SPA / Vercel: build static bundle to /dist with index.html as entry
    const isSpa = mode === 'spa' || process.env.VERCEL === '1' || process.env.BUILD_SPA === 'true';

    const sharedBuild = {
        chunkSizeWarningLimit: 1200,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('xlsx')) {
                            return 'vendor-xlsx';
                        }
                        if (id.includes('lucide-react')) {
                            return 'vendor-icons';
                        }
                        if (id.includes('react') || id.includes('scheduler')) {
                            return 'vendor-react';
                        }
                        return 'vendor';
                    }
                }
            }
        }
    };

    if (isSpa) {
        return {
            plugins: [react()],
            build: {
                outDir: 'dist',
                emptyOutDir: true,
                ...sharedBuild,
            },
        };
    }

    // Default: Laravel Vite integration for local Laragon/PHP server
    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/main.jsx'],
                refresh: true,
            }),
            react(),
        ],
        build: {
            ...sharedBuild,
        },
        server: {
            watch: {
                ignored: ['**/storage/framework/views/**'],
            },
        },
    };
});
