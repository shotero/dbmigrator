# DB Migrator

Migrate PostgreSQL database using vanilla SQL files

## Prerequisite:

- PostgreSQL
- Database

## Install

`npm install -g @shotero/dbmigrator`

## Usage

`dbmigrator up -t [target]`

`dbmigrator down -t <target>`

`dbmigrator make <name>`

## Configuration

Sample configuration file:

`.dbmigratorrc.js` OR
`.dbmigratorrc.cjs`

```
const config = {
  "creator": "testuser",
  "db": {
    "user": process.env.DB_USER,
    "host": process.env.DB_HOST,
    "port": 5432,
    "database": "db",
    "password": process.env.DB_PASSWORD
  },
  "paths": {
    "up": "./db/migrations/up",
    "down": "./db/migrations/down"
  },
  "migration": {
    "schema": "migration",
    "table": "migrations"
  }
}

module.exports = config;
```

## Example

- `dbmigrator make hello`
- `dbmigrator make world`
- `dbmigrator up`
- `dbmigrator down <timestamp>_world`
