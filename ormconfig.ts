import TypeOrmNamingStrategy from './src/config/TypeORMStrategy';

const ORMConfig = {
  type: 'sqlite',
  database: 'dev.sqlite',
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
  namingStrategy: new TypeOrmNamingStrategy(),
};

// typeORM の雑魚設定に合わせる
export = ORMConfig;
