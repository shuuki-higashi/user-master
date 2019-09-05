# このコンテナのベースイメージ
#FROM node:latest

# このコンテナのユーザーを定義しています。
#USER node

# 最初はnpm install を行うためのpackage.jsonだけをコンテナ内の/appにコピーします。
# こうすると、package.jsonに変更がなければ、npm installは次回からはキャッシュが使われます。
#COPY --chown=node ./package.json /app/
# このコンテナの活動ディレクトリを指定しています。
#WORKDIR /app

# package.jsonから依存関係を読み取って、アプリに必要なモジュールをインストールします
#RUN npm install

# npm installが終わってからアプリのコードを/appにコピーしています。
#COPY --chown=node . /app

# そして、前節でpackage.jsonに登録したbuildコマンドでトランスパイルを行っています
#RUN npm run build

# build完了後に/dist内にアプリのjavascriptファイルがあるので、それをnodeコマンドで実行しています。
# javascriptファイルを、サーバーで起動するにはnodeコマンドを使います。
#CMD ["node", "dist/app.js"]