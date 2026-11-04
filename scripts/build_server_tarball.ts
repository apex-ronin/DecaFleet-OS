/**
 * DecaFleet-OS: Server Deployment Tarball Builder
 * 
 * Packages decafleet-os-v1.0.0-server.tar.gz for deployment on Linux/VPS/Docker servers.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const TARBALL_NAME = 'decafleet-os-v1.0.0-server.tar.gz';
const outputPath = path.resolve(process.cwd(), TARBALL_NAME);
const docsTarballPath = path.resolve(process.cwd(), 'docs', TARBALL_NAME);

console.log('======================================================================');
console.log('DECAFLEET-OS // PACKAGING DEPLOYMENT SERVER TARBALL');
console.log(`OUTPUT: ${TARBALL_NAME}`);
console.log('======================================================================\n');

// Exclude patterns for clean deployment archive
const excludeArgs = [
  '--exclude="node_modules"',
  '--exclude=".git"',
  '--exclude=".aistudio"',
  '--exclude=".vscode"',
  '--exclude="dist"',
  '--exclude=".env"',
  `--exclude="${TARBALL_NAME}"`
].join(' ');

// Files and directories to package
const itemsToInclude = [
  'src',
  'scripts',
  'shared',
  'docs',
  'server.ts',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'vite.config.ts',
  'index.html',
  'metadata.json',
  '.env.example',
  'README.md',
  'ROADMAP.md',
  'CHANGELOG.md',
  'CONTRIBUTING.md',
  'SECURITY.md',
  'launch.sh',
  'Dockerfile',
  'docker-compose.yml'
].join(' ');

const tarCmd = `tar -czvf "${TARBALL_NAME}" ${excludeArgs} ${itemsToInclude}`;

console.log(`[Executing Tarball Compression]...`);
try {
  execSync(tarCmd, { stdio: 'inherit' });
  
  if (fs.existsSync(outputPath)) {
    const stats = fs.statSync(outputPath);
    const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`\n[SUCCESS] Tarball created at: ${outputPath}`);
    console.log(`Size: ${stats.size} bytes (~${sizeMb} MB)`);
    
    // Copy to docs directory for download access
    fs.copyFileSync(outputPath, docsTarballPath);
    console.log(`[MIRROR] Copied to docs directory: ${docsTarballPath}`);
  }
} catch (err) {
  console.error('[ERROR] Failed to generate tarball:', err);
  process.exit(1);
}

console.log('\n======================================================================');
console.log('SERVER TARBALL PACKAGING COMPLETE!');
console.log('Deploy on server with:');
console.log(`  1. tar -xzvf ${TARBALL_NAME}`);
console.log('  2. cd DecaFleet-OS (or extracted directory)');
console.log('  3. chmod +x launch.sh && ./launch.sh');
console.log('======================================================================');

