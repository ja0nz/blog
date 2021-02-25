#!/bin/sh

#cp $_OUTPUT/img/remote/* $_ROOT/img/remote/
cp -r $_OUTPUT/img/* $_ROOT/img/
git status
git add $_ROOT/img/
git commit -m "Persist images"
