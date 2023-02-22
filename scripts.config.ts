import type { DenonConfig } from "https://deno.land/x/denon/mod.ts";

const config: DenonConfig = {
  scripts: {
    startup: {
      cmd: "denon run --allow-net=0.0.0.0 ./src/index.ts",
      desc: "Run deno",
    },
  },
};

export default config;