import { clone } from "./lib/tiged.ts";
import { fuzzySelect } from "./lib/nfzf.ts";
import { repoList } from "./lib/repoList.ts";
import prompts from "npm:prompts";
import { parse } from "https://deno.land/std@0.223.0/path/posix/parse.ts";

const args = Deno.args;

if (!args[0]) {
  console.log("Please specify URL.");
  Deno.exit(1);
}

const url = new URL(args[0]);
const [owner, name] = url.pathname.split("/").slice(1);

// DEBUG
// const owner = "Comamoca";
// const name = "sandbox";

const input_project_name = await prompts({
  type: "text",
  name: "value",
  message: "Project name",
  validate: (value) => value.length <= 0 ? "Please input project name." : true,
});

console.log("Please select use template directory.");

const repos = await repoList(owner, name);
const dir = await fuzzySelect(repos);

clone(owner, name, dir, input_project_name.value);
