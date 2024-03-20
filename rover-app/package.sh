#!/usr/bin/env bash

set -e

unset JAVA_HOME

JAVA_HOME=$(/usr/libexec/java_home -v21)

export JAVA_HOME

cd src/web
pnpm i
pnpm build
cd ../..
../gradlew clean
../gradlew bootJar
