import type { DenonConfig } from "https://deno.land/x/denon@v2.5.0/mod.ts";

const config: DenonConfig = {
  scripts: {
    startup: {
      cmd: "denon run --allow-net --allow-read --allow-write ./src/index.ts",
      desc: "Run deno",
    },
  },
};

export default config;