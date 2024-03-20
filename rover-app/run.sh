#!/usr/bin/env bash

set -e

unset JAVA_HOME

JAVA_HOME=$(/usr/libexec/java_home -v21)

export JAVA_HOME

"$JAVA_HOME"/bin/java -jar build/libs/rover-app-0.1.0.jar
