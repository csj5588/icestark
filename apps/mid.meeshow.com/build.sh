
#!/bin/bash

basedir=`dirname $0`
cd $basedir || exit 1
mkdir -p release/ || exit 1

for file in `ls -a $basedir`
do
  if [ $file == "." ] || [ $file == ".." ] || [ $file == "release" ] || [ $file == ".git" ]; then
    continue;
  fi
  cp -r $file release/ || exit 1
done;
