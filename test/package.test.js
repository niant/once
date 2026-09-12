"use strict";

const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");

const packageRoot = path.resolve(__dirname, "..");
const cssFile = path.join(packageRoot, "dist", "css", "main.css");
const cssSnapshotFile = path.join(__dirname, "main.css.snapshot");

test("main.css contains the expected content", (t) => {
  t.assert.fileSnapshot(readFileSync(cssFile, "utf8"), cssSnapshotFile);
});

test("publishable package contains the public CSS and Sass files", () => {
  const output = execFileSync("npm", ["pack", "--dry-run", "--json"], {
    cwd: packageRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  });
  const packageInfo = JSON.parse(output)[0];
  const actualFiles = packageInfo.files.map(({ path: filePath }) => filePath).sort();
  const expectedFiles = [
    "css/main.css",
    "css/main.min.css",
    "package.json",
    "readme.md",
    "sass/_core.scss",
    "sass/_functions.scss",
    "sass/_variables.scss",
    "sass/atoms/_animations.scss",
    "sass/atoms/_backgrounds.scss",
    "sass/atoms/_borders.scss",
    "sass/atoms/_composite-borders.scss",
    "sass/atoms/_deprecated.scss",
    "sass/atoms/_flex.scss",
    "sass/atoms/_grid-fixed.scss",
    "sass/atoms/_grid-fluid.scss",
    "sass/atoms/_layout.scss",
    "sass/atoms/_lists.scss",
    "sass/atoms/_opacity.scss",
    "sass/atoms/_spacers.scss",
    "sass/atoms/_theme-base.scss",
    "sass/atoms/_typography.scss",
    "sass/components/_components.scss",
    "sass/main.scss",
  ];

  assert.deepEqual(actualFiles, expectedFiles);
});
