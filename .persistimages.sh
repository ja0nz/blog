#!/bin/sh

cp $_OUTPUT/img/remote/* img/remote/
cp $_OUTPUT/img/* img/
git status
git add img/
git commit -m "Persist images"
