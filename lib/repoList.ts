import { extname } from "https://deno.land/std@0.224.0/path/mod.ts";
import { Content } from "./type.ts";

export async function repoList(
  owner: string,
  name: string,
  ignoreFiles = [".gitignore", ".gitmodules", "LICENSE"],
): Promise<Array<string>> {
  const url = `https://api.github.com/repos/${owner}/${name}/contents/`;
  const resp = await fetch(url);

  if (resp.status == 404) {
    console.log(
      "Repository not found.\nHint: Is the repository URL correct?",
    );

    Deno.exit(1);
  }

  const json: [Content] = await resp.json();

  const dirs = json.map((item) => item.name)
    .filter((path) => ignoreFiles.indexOf(path) == -1)
    .filter((path) => extname(path).length == 0);

  return dirs;
}
