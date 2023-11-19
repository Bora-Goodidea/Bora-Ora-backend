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
