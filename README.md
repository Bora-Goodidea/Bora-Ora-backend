## bora-ora-backend

<div align="center">
<div style="text-align: center;"><h4>📚 STACKS</h4></div>

<div style="text-align: center;">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="...">
<img src="https://img.shields.io/badge/nodedotjs-61DAFB?style=for-the-badge&logo=nodedotjs&logoColor=black" alt="...">
<img src="https://img.shields.io/badge/typescript-1572B6?style=for-the-badge&logo=typescript&logoColor=black" alt="...">
<img src="https://img.shields.io/badge/express-1572B6?style=for-the-badge&logo=express&logoColor=black" alt="...">
<br />
<img src="https://img.shields.io/badge/typeorm-1572B6?style=for-the-badge&logo=quora&logoColor=white" alt="...">
<img src="https://img.shields.io/badge/mysql-1572B6?style=for-the-badge&logo=mysql&logoColor=black" alt="...">
<img src="https://img.shields.io/badge/babel-1572B6?style=for-the-badge&logo=babel&logoColor=black" alt="...">

<br />
</div>
<br />

<div style="text-align: center;">
    <h1 style="text-align: center;">BoraOra Back-End</h1>
</div>
</div>

### 초기 설정 참고

> [Setting up Node JS, Express, Prettier, ESLint and Husky Application with Babel and Typescript: Part 1](https://dev.to/mkabumattar/setting-up-node-js-express-prettier-eslint-and-husky-application-with-babel-and-typescript-part-1-2ple).

## 로컬 개발 환경

```bash
touch .env

> .env example
APP_NAME=${APP_NAME}
NODE_ENV=${NODE_ENV}
APP_ENV=${APP_ENV}
PORT=${PORT}
HOSTNAME=${HOSTNAME}

MYSQL_HOST=${MYSQL_HOST}
MYSQL_PORT=${MYSQL_PORT}
MYSQL_DATABASE=${MYSQL_DATABASE}
MYSQL_USERNAME=${MYSQL_USERNAME}
MYSQL_PASSWORD=${MYSQL_PASSWORD}
MYSQL_LOGGING=${MYSQL_LOGGING}
MYSQL_SYNCHRONIZE=${MYSQL_SYNCHRONIZE}

SECRET_KEY=${SECRET_KEY}
BCRYPT_SALT=${BCRYPT_SALT}

GMAIL_USER=${GMAIL_USER}
GMAIL_PASSWORD=${GMAIL_PASSWORD}

ACCESS_TOKEN_EXPIRESIN=${ACCESS_TOKEN_EXPIRESIN}
REFRESH_TOKEN_EXPIRESIN=${REFRESH_TOKEN_EXPIRESIN}

SFTP_HOST=${SFTP_HOST}
SFTP_PORT=${SFTP_PORT}
SFTP_USERNAME=${SFTP_USERNAME}
SFTP_PASSWORD=${SFTP_PASSWORD}
SFTP_FILE_DEST_PATH_ROOT=${SFTP_FILE_DEST_PATH_ROOT}
SFTP_FILE_DEST_PATH=${SFTP_FILE_DEST_PATH}

MEDIA_HOSTNAME=${MEDIA_HOSTNAME}


> ./.config env 파일 생성
env.local
env.dev
env.proud

# yarn install

# yarn start:dev
```

> Docker 환경

* 개발 환경시(Ex. node module 설치) docker:shell 로 접근후에 docker 안에서 하길 추천함 docker 환경 버전과 로컬 환경 버전이 다를수 있기 떄문에 그외에는 기존과 동일.
* run 명령어로 띄웠을경우에 최초 접근은 직접 접근해야 합니다. ( http://localhost:3000 )
* port 를 변경 핤경우 docker-compose.yml 에서 직접 변경 하세요.
* node 버전 변경해야 하는경우는 Dockerfile 에서 직접 수정해서 다시 빌드 해야 합니다.


* build
```sh
# yarn docker:build
```

* 로컬 개발환경 시작 ( yarn start )
```sh
# yarn docker:run
```

* damon up
```sh
# yarn docker:up
```

* damon down
```sh
# yarn docker:down
```

* docker container 로그인
- 도커로 개발 할경우 되로록 container 안에서 yarn install 등 사용하는걸 추천.
```sh
# yarn docker:shell
```

* node_module 삭제하고 다시 설치
```sh
# yarn docker:module
```

## 마이그레이션 && Seeder 실행

```bash

# yarn migration:run && yarn migration:seed

```

## jsonwebtoken secret key

> [jsonwebtoken secret key](https://www.grc.com/passwords.htm).

## Contact

-   박성민 - [@psmever](https://github.com/psmever) - psmever@gmail.com
-   진하영 - [@Jin-composition](https://github.com/Jin-composition) - jinhy921207@naver.com
-   우의명 - [@wem519](https://github.com/wem519) - wem519@gmail.com
