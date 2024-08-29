.PHONY: init run-caddy run-front watch-css

init:
	go mod tidy
	cd frontend && pnpm i
	go install github.com/wailsapp/wails/v2/cmd/wails@latest

run-caddy:
	cd testdata && \
	xcaddy build --with github.com/darkweak/souin/plugins/caddy --with github.com/darkweak/souin && \
	./caddy run

run-front:
	cd frontend && pnpm dev

watch-css:
	cd frontend && npx tailwindcss -i src/style.css -o src/output.css --watch
