import { Sequelize } from 'sequelize';

/* export const sequelize  = new Sequelize({
    dialect: 'mssql',
    dialectModulePath: 'msnodesqlv8/lib/sequelize',
  
    dialectOptions: {
      options: {
        connectionString: 'postgresql://neondb_owner:npg_lGBRzgh7MwH6@ep-frosty-dust-a4kox2wn-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require',
        encrypt: false,
      },
  
    }
  }) */


  export const sequelize = new Sequelize('neondb', 'neondb_owner', 'npg_lGBRzgh7MwH6', {
    host: 'ep-frosty-dust-a4kox2wn-pooler.us-east-1.aws.neon.tech',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // required by Neon
      }
    },
    logging: false // or true to see SQL logs
  });