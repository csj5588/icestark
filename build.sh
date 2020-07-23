#!/bin/bash

basedir=`dirname $0`

cd "build" || exit 1

mkdir -p apps/ || exit 1

cd "apps" || exit 1

mkdir -p react/ || exit 1

mkdir -p vue/ || exit 1

cd "./../../apps/vue-apps/dist" || exit 1

for file in `ls -a $basedir`

do
  if [ $file == "." ] || [ $file == ".." ] || [ $file == "release" ] || [ $file == ".git" ]; then
    continue;
  fi
  cp -r $file ../../../build/apps/vue/ || exit 1
done;

cd "./../../react-apps/build" || exit 1

for file in `ls -a $basedir`

do
  if [ $file == "." ] || [ $file == ".." ] || [ $file == "release" ] || [ $file == ".git" ]; then
    continue;
  fi
  cp -r $file ../../../build/apps/react/ || exit 1
done;
