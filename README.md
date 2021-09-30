# Music Center

A song list application

## Languages and Tools

- [Typescript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Joi](https://joi.dev/)
- [Docker](https://www.docker.com/)

## Build the Backend Application (first time)

Prerequisites: You must have Docker and Node installed.

Set the following environment variables using your method of choice (e.g. by exporting them in your `.bashrc` or `.zshrc`, or using a dotenv library)

| Name              | Description                         | Value                                                                                       |
| ----------------- | ----------------------------------- | ------------------------------------------------------------------------------------------- |
| POSTGRES_PASSWORD | Password for connecting to database | _any password you want_                                                                     |
| DATABASE_URL      | URL for connecting to database      | `postgresql://postgres:${POSTGRES_PASSWORD}@localhost:5432/music_center?schema=public`      |
| TEST_DATABASE_URL | URL for connecting to test database | `postgresql://postgres:${POSTGRES_PASSWORD}@localhost:5433/music_center_test?schema=public` |

1. Open a terminal and navigate into the `server` directory
2. Run `npm i`
3. Run `docker-compose up` to start the server and database containers.
4. Open another terminal and run `npm run db:init` to initialize the database.

At this point the application needs to restart in order to connect to the newly created database. You can restart it either by making a code change and saving, or stopping and starting the containers.

## Run the Backend Application (returning)

If you have already successfully built the backend, you just need to run `docker-compose up` to start up the application again.

Note: Running `docker-compose down` will remove the docker containers and images, i.e. all previous data in the database docker container will be lost, so make sure that's actually what you want to do.
