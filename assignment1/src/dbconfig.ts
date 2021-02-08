import { ConnectionOptions } from 'typeorm';
const config = require('config');
const fs = require('fs');
let dbConfiguration: ConnectionOptions;
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
export default dbconfig;
