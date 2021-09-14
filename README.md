# Article API
RESTful API Services for Article Application build with Node.js, PostgreSQL, and Redis.

## Installation
### Local
You can run the Article API application on your local computer by following these steps
1. `git clone` this repository.
2. `cd` to `article-api` folder
3. Download, install and run [Redis](https://redis.io/download) for caching
4. Install all dependencies by run `npm install` command
5. Install [PostgreSQL](https://www.postgresql.org/download/), create new database and store database name in `.env` file
6. Setting configuration for application by create new `.env` file.

```
# .env file

# server
HOST=app_host
PORT=app_port

# postgresql
PGUSER=postgre_username
PGPASSWORD=postgre_password
PGDATABASE=postgre_database
PGHOST=postgre_host
PGPORT=postgre_port

# redis
REDIS_SERVER=redis_server
```
7. Run `npm run migrate up` for create `articles` table
8. Running Article API application with `npm start` 
9. If success, system will be running on [http://HOST:PORT/](http://localhost:3000/)
### Docker
You can also install Article API using Docker.
1. `git clone` this repository.
2. `cd` to `article-api` folder
3. Make sure you have Docker and `docker-compose` on your computer.
4. Simply run `docker compose up` for install and run the Article API application.
5. If success, system will be running on [http://localhost:3000/](http://localhost:3000/)

## API Documentation
The documentation of Article API can be access [here](https://documenter.getpostman.com/view/13625436/U16nLjNe)
