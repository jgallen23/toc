run:
	./node_modules/.bin/smoosh make build.json

site : docs/index.md dist/jquery.toc.min.js
	@rm -r site/dist
	@mkdir -p site/dist
	@cp -r site/template/ui/vendor/hubinfo/dist/images site/dist/
	@cd site && ../node_modules/.bin/markx markx.json

site-clean:
	rm -rf site/dist/*

site-preview:
	@cd site && ../node_modules/.bin/markx --preview 8001 markx.json

install:
	npm install markx
	npm install smoosh

.PHONY: site-preview site-clean 
