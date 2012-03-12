run: install
	./node_modules/.bin/smoosh make build.json

site : docs/index.md dist/jquery.toc.min.js
	@cp dist/jquery.toc.min.js site/ui/
	@cd site && ../node_modules/.bin/smoosh make build.json
	@cd site && ../node_modules/.bin/markx --lang javascript --head layout/head.html --foot layout/foot.html ../docs/index.md > index.html

preview-site: install
	@cp dist/jquery.toc.min.js site/ui/
	@cd site && ../node_modules/.bin/smoosh make build.json
	@cd site && ../node_modules/.bin/markx --lang javascript --head layout/head.html --foot layout/foot.html --preview 8001 ../docs/index.md

install:
	npm install

.PHONY: preview-site