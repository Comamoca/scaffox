import nfzf from "https://esm.sh/node-fzf@0.11.0";

export async function fuzzySelect(items: [string]): string {
  const opts = {
    list: items,

    mode: "fuzzy" || "normal",
  };

  const result = await nfzf(opts);

  const { selected, query } = result;

  if (!selected) {
    console.log("No matches for:", query);
    Deno.exit(1);
  } else {
    return selected.value;
  }
}
