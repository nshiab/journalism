import { defineConfig } from "vite-plus";

export default defineConfig({
  lint: {
    options: { typeAware: true, typeCheck: true },
    rules: {
      "typescript/no-explicit-any": "error",
      "typescript/no-unsafe-assignment": "error",
      "typescript/no-unsafe-argument": "error",
      "typescript/no-unsafe-call": "error",
      "typescript/no-unsafe-member-access": "error",
      "typescript/no-unsafe-return": "error",
    },
  },
  fmt: {
    ignorePatterns: ["docs/**", "llm.md", "llms.txt"],
  },
  pack: {
    entry: ["src/index.ts", "src/web.ts"],
    sourcemap: true,
  },
});
