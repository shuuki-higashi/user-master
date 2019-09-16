# [Gijiroku_express](https://github.com/kkiyama117/gijiroku_express)
## 設計/画面遷移図
https://drive.google.com/file/d/1fQqJ_w7CRZdtDzj2B6--UwAPleqpxlEi/view
## 開発フロー
[(仮)](http://kyoino.sakura.ne.jp/kids/?project/development_flow)

# Usage 
## Preparation
### repo
- ssh
`git clone git@github.com:kkiyama117/gijiroku_express.git`
- http
`git clone https://github.com/kkiyama117/gijirok_express.git`

### docker
If you use Docker, You should install Docker and Docker-compose

- [Docker](https://docs.docker.com/install/)
  - [Mac](https://docs.docker.com/docker-for-mac/install/)
  - [Win](https://docs.docker.com/docker-for-windows/install/)
- [Docker-compose](https://docs.docker.com/compose/install/)

### yarn
install yarn to your env 
See [Official](https://yarnpkg.com/lang/ja/). 
Also See https://qiita.com/suisui654/items/1b89446e03991c7c2c3d

## for local 
1. Add yarn packages
```shell script
cd $PROJECT_ROOT
# (Please replace $PROJECT_ROOT with Download folder of this repository)
yarn install
# node_modules/.bin にPATHを通すか, 以下を実行する
yarn global add eslint eslint-config-node prettier eslint-config-prettier eslint-plugin-prettier husky lint-staged mocha 
```
2. Run script
```shell script
# create `.env` file in Project_root 
# and write `PORT=3000` when you change server port to 3000
cp .env.example .env
yarn dev
# see HP with browser in `localhost:8080` if you don't copy env file
# (you can close this server by ctrl-C)
``` 

## for prod/stage
1. use docker from command
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

# 今後の参考になりそうなもの
https://qiita.com/leafia78/items/73cc7160d002a4989416
