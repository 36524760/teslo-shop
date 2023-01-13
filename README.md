<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## TESLO API


1. clone repo
2. npm i
3. clone __.tenv.template__ file and rename it as __.env__
4. set .env with custom var

5. run database with detach mode
```
docker-compose up -d
```
6. execute seed data
```
http://localhost:3000/api/seed
```
7. exec
npm run start:dev

