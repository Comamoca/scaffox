export interface Content {
  "name": string;
  "path": string;
  "sha": string;
  "size": number;
  "url": string;
  "html_url": string; // URL
  "git_url": string; // URL
  "download_url": string | null; // URL
  "type": "dir" | "file";
  "_links": {
    "self": string; // URL
    "git": string; // URL
    "html": string; // URL
  };
}
