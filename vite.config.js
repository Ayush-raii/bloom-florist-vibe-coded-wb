import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Custom plugin to serve the untouched `frames` folder seamlessly
function framesPlugin() {
  return {
    name: 'serve-frames-plugin',
    configureServer(server) {
      server.middlewares.use('/frames', (req, res, next) => {
        const decodedUrl = decodeURIComponent(req.url.split('?')[0]);
        const filePath = path.join(process.cwd(), 'frames', decodedUrl);
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          res.setHeader('Content-Type', 'image/jpeg');
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          fs.createReadStream(filePath).pipe(res);
        } else {
          next();
        }
      });
    },
    // Copy frames to dist during production build
    closeBundle() {
      const srcDir = path.join(process.cwd(), 'frames');
      const destDir = path.join(process.cwd(), 'dist', 'frames');
      if (fs.existsSync(srcDir)) {
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        const files = fs.readdirSync(srcDir);
        for (const file of files) {
          fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
        }
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), framesPlugin()],
  server: {
    port: 5173,
    host: true
  }
});
