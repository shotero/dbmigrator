# DB Migrator

Migrate PostgreSQL database using vanilla SQL files

## Prerequisite:

- PostgreSQL
- Database

## Install

`npm install -g @shotero/dbmigrator`

## Usage

`migrate up -t [target]`

`migrate down -t <target>`

`migrate make <name>`

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

- `migrate make hello`
- `migrate make world`
