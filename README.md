## Table of Contents

- [Install](#install)
  - [Run with docker](#run-with-docker)
  - [Run Locally](#run-locally)

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

To run the project locally, first make sure you have Node.js installed. 
The project has been tested on Node.js version 16.x, you can install 
Node.js on POSIX systems using <a href="https://github.com/nvm-sh/nvm" >NVM</a>.

Install Node by running

```shell
nvm install 16
```

You will also need a Postgres server. The project was tested on version 13, but anything above version 12 should work.
After installing a server, copy your credentials to the .env file.

After installing Node.js, install <a href="https://yarnpkg.com/getting-started/install" >Yarn</a> package manager.

Use yarn to install the dependencies by running

```shell
yarn install
```

You can then start the server by running

```shell
yarn start:dev
```

