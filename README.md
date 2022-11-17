<p align="center" >
<img src="./logo.png" alt="app logo">
</p>

## Table of Contents

- [Introduction](#introduction)
- [Install](#install)
  - [Run with docker](#run-with-docker)
  - [Run Locally](#run-locally)

## [Introduction]()

This repository contains the backend api implementation for an electronic medical record-keeping system that has a
centralized database where all the patients' records are stored. These medical records include
vital information like medical history, allergies, and medication. This system will address the
issues in the current system by allowing doctors access to their patients' records from other
institutions and allowing other institutions to update their patients' records to the database and
also letting patients view their records from several institutions at any time.

The repository for the frontend, built using NextJS can be found <a href="https://github.com/SennayT/EMR-FRONTEND" > here </a>

## [Install]()

Clone the repo and copy the .env.example to .env
```sh
cp .env.example .env
```
### [Run with docker]()

Make sure you have docker installed, then run:

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

