# myapp

整理開發上的架構範例

## SHELL

查詢目錄下所有檔案的副檔名

```sh
find . -type f | perl -ne 'print $1 if m/\.([^.\/]+)$/' | sort -u
```

## docker

## docker compose

```sh
docker compose -f packages/angular-web/docker-compose.yml up --build
```

```sh
docker compose -f packages/angular-web/docker-compose.yml down -v
```
