const Koa = require('koa');
const path = require('path');
const router = require('koa-router')();
const body = require('koa-body');
const json = require('koa-json');
const requireAll = require('require-all');

const server = new Koa();

const isDev = process.env.NODE_ENV === 'development';

const config = require('./config/config.json');

requireAll({
    dirname: path.join(__dirname, '/route'),
    filter: /\.js$/,
    resolve(route) {
        route(router);
    }
});

server.use(body());
server.use(json());
server.use(router.routes());

server.listen(config.appPort, config.appHost);

if (isDev) {
    console.log('现在处于开发环境~~!');
    console.log(`Koa server listener on ${config.appHost} : ${config.appPort}\n`);
}