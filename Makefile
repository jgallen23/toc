build: clean
	@git checkout master docs/index.md
	@~/code/markx-project/bin/markx-project.js --title "TOC | jQuery Table of Contents Plugin" --user jgallen23 --repo toc docs/index.md

preview: build
	@python -m SimpleHTTPServer 8001

install:
	@npm install markx-project

clean:
	@rm -rf dist/*

.PHONY: preview install
