"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require('config');
const fs = require('fs');
let dbConfiguration;
(() => {
    dbConfiguration = {
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        port: Number(config.get('POSTGRES_PORT')),
        username: config.get('POSTGRES_USER'),
        password: config.get('POSTGRES_PASSWORD'),
        database: config.get('POSTGRES_DB'),
        entities: [__dirname + '/**/*{.entity.ts,.entity.js}'],
        synchronize: false,
    };
})();
const dbconfig = dbConfiguration;
exports.default = dbconfig;
//# sourceMappingURL=dbconfig.js.map