# Neon Swarm

[![make.fun](https://make.fun/badge/best-game-01.svg)](https://make.fun/bounty/best-game-01?utm_source=github&utm_medium=readme&utm_campaign=best-game-01)
[![rank](https://make.fun/badge/best-game-01/raffzell/neon-swarm/rank.svg)](https://make.fun/bounty/best-game-01?utm_source=github&utm_medium=readme&utm_campaign=best-game-01)
[![reward](https://make.fun/badge/best-game-01/raffzell/neon-swarm/reward.svg)](https://make.fun/bounty/best-game-01?utm_source=github&utm_medium=readme&utm_campaign=best-game-01)

Neon Swarm is a twin-stick neon arena shooter: steer with WASD or the arrow
keys, aim with the mouse, hold click to fire, and dash through danger with
Shift or Space. Four enemy types with distinct behaviour — chasers, weavers,
splitters that burst into minis, and snipers with telegraphed bolts — swarm in
across 10 escalating waves. Chain kills to raise the score multiplier up to
x5, survive all 10 waves to win. One self-contained HTML file, zero
dependencies, fully offline: all art is drawn in code and all sound is
synthesized with WebAudio.

## Run it

Build the entry output, then serve the game folder:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
python3 -m http.server 8080 --directory out/game
```

Then open http://localhost:8080 in a desktop browser. No build step, no
network requests — `game/index.html` also runs straight from disk.

Built for the [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=best-game-01) best-game-01 bounty.
