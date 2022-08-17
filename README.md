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

`.dbmigraterc.json`

```
{
  "creator": "me@email.com",
  "db": {
    "user": "system",
    "host": "localhost",
    "port": 5432,
    "database": "db",
    "password": ""
  },
  "paths": {
    "up": "/Users/<user>/projects/myproject/db/migrations/up",
    "down": "/Users/<user>/projects/myproject/db/migrations/down"
  },
  "migration": {
    "schema": "migration",
    "table": "migrations"
  }
}
```

## Example

- `dbmigrator make hello`
- `dbmigrator make world`
- `dbmigrator up`
- `dbmigrator down <timestamp>_world`
