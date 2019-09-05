# express_docker

# Usage 
## Preparation
- ssh
`git clone git@github.com:kkiyama117/express_docker.git`
- http
`git clone https://github.com/kkiyama117/express_docker.git`
- download
-> you can download from [here](https://github.com/kkiyama117/express_docker/archive/master.zip)

### docker
If you use Docker, You should install Docker and Docker-compose

- [Docker](https://docs.docker.com/install/)
  - [Mac](https://docs.docker.com/docker-for-mac/install/)
  - [Win](https://docs.docker.com/docker-for-windows/install/)
- [Docker-compose](https://docs.docker.com/compose/install/)

## for local 
1. install yarn to your env 
See [Official](https://yarnpkg.com/lang/ja/). 
Also See https://qiita.com/suisui654/items/1b89446e03991c7c2c3d

2. download package
```
cd $PROJECT_ROOT
# (Please replace $PROJECT_ROOT with Download folder of this repository)
yarn
# create `.env` file in Project_root 
# and write `PORT=3000` if you change local server port to 3000
cp .env.example .env
yarn start
# see HP with browser in `localhost:8080`
# (you can close this server by ctrl-C)
``` 

## for prod
1. install yarn(or npm) (same with Above)
2. use docker from command
```$bash
cd $PROJECT_ROOT
yarn
# create `.env` file in Project_root 
# and write `PORT=3000` if you change inside server port to 3000
cp .env.example .env
yarn stage
# sudo docker-compose -f docker/docker-compose.yml up
# see HP with browser in `localhost`
# You can close it by Ctrl-C
```

# 今後の参考になりそうなもの
https://qiita.com/leafia78/items/73cc7160d002a4989416
