const { Client, PrivateKey } = require('@hashgraph/sdk');

let client = null;

function getHederaClient() {
  if (client) return client;

  try {
    const operatorId = process.env.HEDERA_OPERATOR_ID;
    const operatorKey = PrivateKey.fromString(process.env.HEDERA_OPERATOR_KEY);

    if (process.env.HEDERA_NETWORK === 'mainnet') {
      client = Client.forMainnet();
    } else {
      client = Client.forTestnet();
    }

    client.setOperator(operatorId, operatorKey);
    
    console.log('✅ Hedera client initialized');
    return client;
  } catch (error) {
    console.error('❌ Failed to initialize Hedera client:', error);
    throw error;
  }
}

function closeHederaClient() {
  if (client) {
    client.close();
    client = null;
  }
}

module.exports = {
  getHederaClient,
  closeHederaClient
};

