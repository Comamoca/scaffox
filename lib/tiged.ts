import tiged from "https://esm.sh/tiged@2.12.7";
import { TerminalSpinner } from "https://deno.land/x/spinners@v1.1.2/mod.ts";

export function clone(
  owner: string,
  name: string,
  path: string,
  out: string,
) {
  const emitter = tiged(`${owner}/${name}/${path}`, {
    disableCache: true,
    force: true,
    verbose: true,
  });

  const terminalSpinner = new TerminalSpinner(
    "cloning...",
  );

  terminalSpinner.start();

  emitter.clone(out).then(() => {
    terminalSpinner.succeed("Clone completed");
    console.log("Build scaffold done. Happy hacking✨");
    Deno.exit(0);
  });
}
