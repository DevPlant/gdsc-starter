# GDSC Doc Project - Starter
* Infra containes a docker compose for postgres and minio
* doc-project-api-java is a starter in java ( incomplete, it just contains a link to the database)
* gdsc-doc-project-api is a starter build with NestJS - it contains a complete API for the sample UI
* gdsc-doc-project-ui is a starter build with Angular - it contains a complete UI for the sample API

## Getting Started
You need your own firebase credentials to run the project.
For this go to the firebase console and create a new project.
Then go to the project settings and create a new web app.

After you have the necessary config, start the docker compose with "docker compose up",
followed by the backed with yarn start:dev and the frontend with yarn start.
