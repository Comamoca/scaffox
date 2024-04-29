import { extname } from "https://deno.land/std@0.224.0/path/mod.ts";

export async function repoList(
  owner: string,
  name: string,
  ignoreFiles = [".gitignore", ".gitmodules", "LICENSE"],
): Array<string> {
  const url = `https://api.github.com/repos/${owner}/${name}/contents/`;

  const resp = await fetch(url);
  const json = await resp.json();

  const dirs = json.map((item) => item.name)
    .filter((path) => ignoreFiles.indexOf(path) == -1)
    .filter((path) => extname(path).length == 0);

  return dirs;
}
