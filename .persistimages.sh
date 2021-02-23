#!/bin/sh

cp _build_/img/remote/* img/remote/
cp _build_/img/* img/
git status
git add img/
git commit -m "Persist images"
