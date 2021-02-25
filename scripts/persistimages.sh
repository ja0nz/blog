#!/bin/sh

#cp $OUTPUT/img/remote/* $ROOT/img/remote/
cp -r $OUTPUT/img/* $ROOT/img/
git status
git add $ROOT/img/
git commit -m "Persist images"
