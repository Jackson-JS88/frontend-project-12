install:
	npm ci

build:
	npm run build --prefix frontend

start:
	npx start-server -s ./frontend/dist