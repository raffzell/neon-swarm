// Neon Swarm entry program (Node 22+, standard library only).
//
// The game itself lives in game/ beside this file: plain static files that a
// desktop browser opens offline. This program's only job is to hand the entry
// in: it stages game/ plus screenshots/ into the output directory and writes
// dossier.json, the summary the judge reads, using the vendored make.fun
// library. It contains no game logic of its own.
//
// Local run (outside the grader, where /output does not exist):
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

// Directory holding this file, resolved from the module URL so the program
// works no matter which working directory it is launched from.
const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The entry is worthless without its game file: refuse to stage an empty
// game/ instead of letting the dossier builder fail somewhere downstream
// with a less obvious error.
const gameEntry = join(repoRoot, 'game', 'index.html');
if (!existsSync(gameEntry)) {
  throw new Error(`Neon Swarm entry is incomplete: ${gameEntry} is missing`);
}

function stageFolder(name) {
  const source = join(repoRoot, name);
  const target = join(outDir, name);
  mkdirSync(target, { recursive: true });
  if (existsSync(source) && statSync(source).isDirectory()) {
    cpSync(source, target, { recursive: true });
  }
  return target;
}

mkdirSync(outDir, { recursive: true });
stageFolder('game');
stageFolder('screenshots');

// Caps the scorer enforces: the text budget shapes the dossier bytes, the rest
// reject an entry the scorer would reject outright (screenshot count/size,
// game file count/total size, over-long game paths).
const dossierBytes = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000,
});
writeFileSync(join(outDir, 'dossier.json'), dossierBytes);
