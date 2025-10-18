const { create } = require('ipfs-http-client');

let ipfsClient = null;

function getIPFSClient() {
  if (ipfsClient) return ipfsClient;

  try {
    const auth = 'Basic ' + Buffer.from(
      process.env.IPFS_PROJECT_ID + ':' + process.env.IPFS_PROJECT_SECRET
    ).toString('base64');

    ipfsClient = create({
      url: process.env.IPFS_API_URL || 'https://ipfs.infura.io:5001',
      headers: {
        authorization: auth
      }
    });

    console.log('✅ IPFS client initialized');
    return ipfsClient;
  } catch (error) {
    console.error('❌ Failed to initialize IPFS client:', error);
    throw error;
  }
}

module.exports = {
  getIPFSClient
};

