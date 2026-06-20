import { execSync } from 'child_process';
import { createInterface } from 'readline';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));

function git(cmd) {
  return execSync(cmd, { encoding: 'utf8' }).trim();
}

const issues = [];

const branch = git('git rev-parse --abbrev-ref HEAD');
if (branch !== 'master') {
  issues.push(`Current branch is "${branch}", not "master".`);
}

let lastTag;
try {
  lastTag = git('git describe --tags --abbrev=0');
} catch {
  issues.push('No git tags found on the current branch.');
}

if (lastTag !== undefined && lastTag !== pkg.version) {
  issues.push(`Last git tag "${lastTag}" does not match package.json version "${pkg.version}".`);
}

if (issues.length === 0) {
  process.exit(0);
}

console.error('\nPre-publish check failed:\n');
for (const issue of issues) {
  console.error(`  • ${issue}`);
}
console.error('');

const rl = createInterface({ input: process.stdin, output: process.stderr });

rl.question('Proceed anyway? [y/N] ', (answer) => {
  rl.close();
  const yes = /^(y|yes)$/i.test(answer.trim());
  process.exit(yes ? 0 : 1);
});
