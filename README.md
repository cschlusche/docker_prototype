# Dockerized deno server

Dockerized project of a minimal webserver using deno, oak and oakCors.
Initializes a postgres volume and creates a new database products.


## Initializing and start up
Initialize containers and volumes: `docker compose up -d`

Initialization process:
1. `docker compose up -d` executes command from `docker-compose.yml`
  1. Deno executes `start_watcher` from `deno.json`
    - Installs `denon`
  2. Denon executes `startup` from `scripts.config.ts`
    - Runs `./src/index.ts`

## Structure

```
docker_prototype/
├── src
│   ├── deps.ts
│   ├── index.ts
│   ├── log.ts
│   └── routes.ts
├── tests
│   └── routes_test.ts
├── README.md
├── docker-compose.yml
├── .env
```

## Routes
GET-requests: 127.0.0.1:8080

- `/` : answered with static JSON-response
- `/read` : returns data from `/home/christian/demodata/clients.csv` (docker: bind mount)

## Notes to the learning developer
Note regarding hostnames in Docker environment:

- For IP-addresses instead of trying `127.0.0.1` use the `service_name` from docker-compose.yml
- For me it is still unclear how these IPs can be used in deno-command for allowing specific network addresses