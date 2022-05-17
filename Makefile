develop:
	npx webpack serve

install:
	npm ci

build:
	webpack

test:
	npm test

lint:
	npx eslint .

.PHONY: test
