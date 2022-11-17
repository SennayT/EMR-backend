## Table of Contents

- [Install](#install)
  - [Run with docker](#run-with-docker)

## [Install]()

Clone the repo and copy the .env.example to .env
```sh
cp .env.example .env
```
### [Run with docker]()

Run

```shell
docker-compose up
```

This will build the backend code and also provision a postgres database.

After starting the server, you can bash into the server container to run various commands like migrations and seeds.

To exec to the container run,
```shell
docker-compose exec backend bash
```

After accessing the shell, you can run the migrations using the following command

```shell
yarn typeorm migration:run
```
You can also seed data by running,

```shell
yarn seed
```

You can modify the seed by going into src/seeder/seeder.service.ts

### [Run Locally]()

