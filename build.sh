#!/bin/bash
set -ev

ONCE_VER=$(grep version package.json | cut -d':' -f2 | cut -d'"' -f2 | sort -g -r | head -1)
ONCE_VERSIONS=$(git ls-remote --tags)

if [[ $ONCE_VERSIONS != *$ONCE_VER* ]]
then
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
  npm publish --tag $ONCE_VER

  rm .npmrc
  git checkout master
  git branch -D release
fi
