import type {NextConfig} from 'next';
import {PHASE_DEVELOPMENT_SERVER} from 'next/constants';
import fs from 'fs';
import path from 'path';

function ensureRoutesManifest(distDirName: string) {
  try {
    const nextDir = path.join(process.cwd(), distDirName);
    const target = path.join(nextDir, 'routes-manifest.json');
    const template = path.join(process.cwd(), 'scripts', 'routes-manifest.template.json');

    if (!fs.existsSync(nextDir)) {
      fs.mkdirSync(nextDir, {recursive: true});
    }

    if (!fs.existsSync(target) && fs.existsSync(template)) {
      fs.copyFileSync(template, target);
    }
  } catch {
    // Graceful fallback
  }
}

export default function getNextConfig(phase: string): NextConfig {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const distDir = isDev ? '.next-dev' : '.next';

  if (isDev) {
    ensureRoutesManifest(distDir);
  }

  return {
    distDir,
    reactStrictMode: true,
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: false,
    },
    // Allow access to remote image placeholder.
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'picsum.photos',
          port: '',
          pathname: '/**', // This allows any path under the hostname
        },
      ],
    },
    output: 'standalone',
    transpilePackages: ['motion'],
    webpack: (config, {dev}) => {
      if (dev) {
        ensureRoutesManifest(distDir);
      }

      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      if (dev && process.env.DISABLE_HMR === 'true') {
        config.watchOptions = {
          ignored: /.*/,
        };
      }
      return config;
    },
  };
}
