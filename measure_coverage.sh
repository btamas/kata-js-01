#!/bin/bash

node_modules/.bin/istanbul cover node_modules/.bin/_mocha -- -u tdd -R dot -r load_all_files.js tests/*
