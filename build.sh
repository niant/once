#!/bin/bash

# Prequisite credentials for builds:
# travis encrypt GH_TOKEN=<secret> --add env.global
# travis encrypt NPM_TOKEN=<secret> --add env.global
set -e

ONCE_VER=$(grep version package.json | cut -d':' -f2 | cut -d'"' -f2 | sort -g -r | head -1)

# Using git ls-remote to check tags, since "git tag -l" is not working on Travis CI
# for unknown reasons.
VERSIONS=$(git ls-remote --tags origin)
VERSION_EXISTS=$(git ls-remote --tags origin "$ONCE_VER")

echo "Versions in the Git repository:"
echo "$VERSIONS\n"

if [ -n "$VERSION_EXISTS" ]
then
  echo "Version $ONCE_VER exists already"
  exit 1
else
  echo "Creating new release for $ONCE_VER"
  git remote rm origin
  git remote add origin https://niant:${GH_TOKEN}@github.com/niant/once.git

  git config --global user.name "Travis-CI"
  git config --global user.email antti.niemenpaa@gmail.com

  git checkout -b release

  rm -rf .sass-cache/
  rm -rf node_modules/
  mv dist/css .
  mv src/sass .
  rm -rf dist/
  rm -rf src/
  rm -rf .gitignore
  rm -rf gulpfile.js
  rm -rf .travis.yml
  rm -rf .editorconfig
  rm -rf build.sh

  # git rm --cached .travis.yml
  # git rm --cached build.sh
  # git commit build.sh -m "Remove unnecessary file"
  # git commit .travis.yml -m "Remove unnecessary"
  git add --all .
  git commit -am "New version build $ONCE_VER"
  git tag $ONCE_VER -m "New version $ONCE_VER"
  git push origin $ONCE_VER

  echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> .npmrc
  npm publish

  rm .npmrc
  git checkout master
  git branch -D release
fi
