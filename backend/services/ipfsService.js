const { getIPFSClient } = require('../config/ipfs');

class IPFSService {
  constructor() {
    this.ipfs = null;
  }

  getClient() {
    if (!this.ipfs) {
      this.ipfs = getIPFSClient();
    }
    return this.ipfs;
  }

  async uploadFile(buffer, filename) {
    try {
      const ipfs = this.getClient();
      
      const result = await ipfs.add({
        path: filename,
        content: buffer
      }, {
        pin: true
      });

      console.log(`✅ File uploaded to IPFS: ${result.path}`);
      return result.path;
    } catch (error) {
      console.error('❌ Error uploading to IPFS:', error);
      throw new Error('Failed to upload file to IPFS');
    }
  }

  async uploadJSON(data) {
    try {
      const ipfs = this.getClient();
      const buffer = Buffer.from(JSON.stringify(data));
      
      const result = await ipfs.add(buffer, { pin: true });
      
      console.log(`✅ JSON uploaded to IPFS: ${result.path}`);
      return result.path;
    } catch (error) {
      console.error('❌ Error uploading JSON to IPFS:', error);
      throw new Error('Failed to upload JSON to IPFS');
    }
  }

  async getFile(hash) {
    try {
      const ipfs = this.getClient();
      const chunks = [];
      
      for await (const chunk of ipfs.cat(hash)) {
        chunks.push(chunk);
      }
      
      return Buffer.concat(chunks);
    } catch (error) {
      console.error('❌ Error retrieving from IPFS:', error);
      throw new Error('Failed to retrieve file from IPFS');
    }
  }

  getGatewayUrl(hash) {
    const gateway = process.env.IPFS_GATEWAY || 'https://ipfs.io/ipfs/';
    return `${gateway}${hash}`;
  }

  async pinFile(hash) {
    try {
      const ipfs = this.getClient();
      await ipfs.pin.add(hash);
      console.log(`✅ File pinned: ${hash}`);
      return true;
    } catch (error) {
      console.error('❌ Error pinning file:', error);
      return false;
    }
  }

  async unpinFile(hash) {
    try {
      const ipfs = this.getClient();
      await ipfs.pin.rm(hash);
      console.log(`✅ File unpinned: ${hash}`);
      return true;
    } catch (error) {
      console.error('❌ Error unpinning file:', error);
      return false;
    }
  }
}

module.exports = new IPFSService();

