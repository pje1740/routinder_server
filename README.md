<p align="center">
  <img src="https://user-images.githubusercontent.com/38778829/116961712-08304e00-acdf-11eb-9f1d-76ed1b00c91e.jpg" width="320" alt="Nest Logo" />
  <br>
  루틴더 - 스티커로 관리하는 나만의 습관 만들기 캘린더!
</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>

## Description

루틴더는 스티커로 습관을 관리하고 트래킹하는 웹앱 서비스입니다. 본 레포는 루틴더 서비스의 서버 코드를 위한 레포입니다. 

## Installation

기본적인 라이브러리 설치
```bash
$ npm install
```

## 개발 DB 실행

```bash
$ cd ./dev-data
$ bash init.sh
```

로컬에 돌아가고 있는 모든 도커 이미지, 컨테이너 삭제
```bash
$ bash clean.sh
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

