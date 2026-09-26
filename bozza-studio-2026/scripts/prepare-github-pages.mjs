import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const [buildArg, repoArg] = process.argv.slice(2);
if (!buildArg || !repoArg) throw new Error('Usage: node prepare-github-pages.mjs BUILD_CLIENT_DIR REPOSITORY_DIR');
const build = path.resolve(buildArg);
const repo = path.resolve(repoArg);
if (readFileSync(path.join(repo, 'CNAME'), 'utf8').trim() !== 'studiobalsamo.com') throw new Error('Unexpected production domain');
const html = readFileSync(path.join(build, 'index.html'), 'utf8');
if (/noindex|Anteprima del nuovo sito/.test(html)) throw new Error('Prototype metadata must not be published');
const publicAssets = ['antonio-balsamo-cutout.webp', 'antonio-balsamo.jpg', 'bilancio-editoriale.webp'];
const generatedAssets = readdirSync(path.join(build, 'assets')).filter(name => /\.(js|css|woff2)$/.test(name));
const files = ['index.html', 'robots.txt', 'sitemap.xml', ...[...publicAssets, ...generatedAssets].map(name => `assets/${name}`)];
for (const name of files) {
  if (!existsSync(path.join(build, name))) throw new Error(`Missing release file: ${name}`);
}
// Explicit allowlist: never publish original photos, design drafts or local QA captures.
for (const name of files) {
  mkdirSync(path.dirname(path.join(repo, name)), { recursive: true });
  copyFileSync(path.join(build, name), path.join(repo, name));
}
writeFileSync(path.join(repo, '.nojekyll'), '');
console.log(`Prepared ${files.length} files for the existing GitHub Pages main/root deployment.`);
