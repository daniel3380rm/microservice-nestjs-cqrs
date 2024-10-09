export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    rabbitmq: {
      url: process.env.RABBITMQ_URL,
    },
  });