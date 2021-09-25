# Music Center

A song list application

## Languages and Tools

- [Typescript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Joi](https://joi.dev/)

## Build the Backend Application (first time)

1. Navigate inside the **server** directory
2. Run `npm i`
2. Set the following environment variables using your method of choice (e.g. by exporting them in your `.bashrc` or `.zshrc`, or using a dotenv library)

| Name              | Description                         | Value                                                                                  |
| ----------------- | ----------------------------------- | -------------------------------------------------------------------------------------- |
| POSTGRES_PASSWORD | Password for connecting to database | _any password you want_                                                                |
| DATABASE_URL      | URL for connecting to database      | `postgresql://postgres:${POSTGRES_PASSWORD}@localhost:5432/music_center?schema=public` |

4. Run `docker-compose up` to start the server and database containers.
5. Open another terminal and run `npm run db:init` to initialize the database.

## Run the Backend Application (returning)

If you have already successfully built the backend, you just need to run `docker-compose up` to start up the application again. To stop the application you can run `docker-compose stop` or simply kill the process (<kbd>Ctrl</kbd> + <kbd>C</kbd>)

Note: Running `docker-compose down` will remove the docker containers and images, i.e. all previous data in the database docker container will be lost, so make sure that's actually what you want to do.