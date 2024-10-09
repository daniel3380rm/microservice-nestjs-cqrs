export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  rabbitmq: {
    url: process.env.RABBITMQ_URL,
  },
  walletService: {
    baseUrl: process.env.WALLET_SERVICE_BASE_URL || 'http://localhost:3000',
  },
});