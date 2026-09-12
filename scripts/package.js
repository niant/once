"use strict";

const fs = require("node:fs");
const path = require("node:path");

const rootDirectory = path.resolve(__dirname, "..");
const cssDirectory = path.join(rootDirectory, "css");
const sassDirectory = path.join(rootDirectory, "sass");
const distCssDirectory = path.join(rootDirectory, "dist", "css");
const srcSassDirectory = path.join(rootDirectory, "src", "sass");
const stagingMarker = path.join(rootDirectory, ".once-package-staging");

function cleanStaging() {
  if (fs.existsSync(stagingMarker)) {
    fs.rmSync(stagingMarker, { force: true });
    fs.rmSync(cssDirectory, { force: true, recursive: true });
    fs.rmSync(sassDirectory, { force: true, recursive: true });
  }
}

function preparePackage() {
  cleanStaging();

  if (fs.existsSync(cssDirectory) || fs.existsSync(sassDirectory)) {
    throw new Error("Refusing to replace an existing untracked css/ or sass/ directory.");
  }

  if (!fs.existsSync(distCssDirectory)) {
    throw new Error("Compiled CSS not found in dist/css. Run 'npm run build' first.");
  }

  fs.writeFileSync(stagingMarker, "");

  try {
    fs.cpSync(distCssDirectory, cssDirectory, {
      recursive: true,
      filter: (source) => !source.endsWith(".map"),
    });
    fs.cpSync(srcSassDirectory, sassDirectory, { recursive: true });
  } catch (error) {
    cleanStaging();
    throw error;
  }
}

const command = process.argv[2];

if (command === "prepare") {
  preparePackage();
} else if (command === "clean") {
  cleanStaging();
} else {
  throw new Error("Expected one of: prepare, clean.");
}
