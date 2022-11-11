# FediStore

Maintains feeds to follow on Fediverse nodes and makes them accessible through graphql api.

## Config

Configuration is done using environmental variables:

| Variable                       | Description                                                                                      | Default value / Example value |
|--------------------------------|--------------------------------------------------------------------------------------------------|-------------------------------|
 | `ELASTIC_URL`                  | Url address of ElasticSearch server                                                              | `http://elastic:9200`         |
| `ELASTIC_USER`                 | Username for EalsticSearch server                                                                | `elastic`                     |
| `ELASTIC_PASSWORD`             | Username for EalsticSearch server                                                                | empty                         |
| `SEED_NODE_DOMAIN`             | Domain of the first node to search users and other nodes on                                      | `mastodon.social`             |
| `REATTEMPT_MINUTES`            | _Optional_, How many minutes should be waited for next node refresh attempt if the refresh fails | `60 `                         | 
| `REFRESH_HOURS`                | _Optional_, How often (in hours) should be node info refreshed                                   | `120`                         |
| `WAIT_FOR_JOB_MINUTES`         | _Optional_, How many minutes should the thread sleep if there are no nodes to refresh            | `60`                          |
| `DEFAULT_TIMEOUT_MILLISECONDS` | _Optional_, How many milliseconds should http wait for node api response on refresh              | `10000`                       |
| `BANNED_DOMAINS`               | _Optional_, Domains not to index (even with subdomains)                                          | _empty_                       |
| `TZ`                           | _Optional_, Timezone                                                                             | `UTC`                         |
## Deploy
App is designed to be run in docker container and deployed using docker-compose. 
More info can be found in [FediSearch example docker-compose](https://github.com/Stopka/fedisearch-compose) project

As frontend for searching in collected feeds there is a companion server app [FediSearch](https://github.com/Stopka/fedisearch)
For collecting feeds there is a companion server app [FediCrawl](https://github.com/Stopka/fedicrawl)