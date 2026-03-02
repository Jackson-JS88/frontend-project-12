lint-frontend:
	make -C frontend lint

install:
	npm ci
	cd frontend && npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/dist

start:
	make start-backend

develop:
	make start-backend & make start-frontend

build:
	rm -rf frontend/dist
	cd frontend && npm run build