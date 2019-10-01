# Running programs
## Summary
1. tset
2. test2

## 1. for local 

1-1. Add node packages
```shell script
cd $PROJECT_ROOT
# (Please replace $PROJECT_ROOT with Download folder of this repository)
yarn install
# node_modules/.bin にPATHを通すか, 以下を実行する
yarn global add eslint eslint-config-node prettier eslint-config-prettier eslint-plugin-prettier husky lint-staged mocha 
```

1-2. Run script
```shell script
# create `.env` file in Project_root 
# and write `PORT=3000` when you change server port to 3000
cp .env.example .env
yarn dev
# see HP with browser in `localhost:8080` if you don't copy env file
# (you can close this server by ctrl-C)
``` 

## 2. for prod/stage

2-1. use docker from command
```shell script
cd $PROJECT_ROOT
yarn
# create `.env` file in Project_root 
# and write `PORT=3000` if you change inside server port to 3000
cp .env.example .env
yarn stage
# sudo docker-compose -f docker/docker-compose.yml up
# see HP with browser in `localhost:8001`
# You can close it by Ctrl-C
```
