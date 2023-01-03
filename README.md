# FediStore

Maintains feeds to follow on Fediverse nodes and makes them accessible through graphql api.

## Config

Configuration is done using environmental variables or command line arguments:

| Env variable       | Command argument     | Description                         | Default value         |
|--------------------|----------------------|-------------------------------------|-----------------------|
 | `ELASTIC_URL`      | `--elastic-url`      | Url address of ElasticSearch server | `http://elastic:9200` |
| `ELASTIC_USER`     | `--elastic-user`     | Username for EalsticSearch server   | `elastic`             |
| `ELASTIC_PASSWORD` | `--elastic-password` | Username for EalsticSearch server   | empty                 |
| `HTTP_PORT`        | `--http-port`        | Port listen for http requests       | `3000`                |
| `HTTP_PATH`        | `--http-path`        | Graphql api endpoint path           | `/api/graphql`        |

## Deploy
App is designed to be run in docker container and deployed using docker-compose. 
More info can be found in [FediSearch example docker-compose](https://github.com/Stopka/fedisearch-compose) project
