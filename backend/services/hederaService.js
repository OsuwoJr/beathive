const {
  TokenCreateTransaction,
  TokenType,
  TokenMintTransaction,
  TokenSupplyType,
  TransferTransaction,
  Hbar,
  AccountId
} = require('@hashgraph/sdk');
const { getHederaClient } = require('../config/hedera');

class HederaService {
  constructor() {
    this.client = null;
  }

  getClient() {
    if (!this.client) {
      this.client = getHederaClient();
    }
    return this.client;
  }

  async mintCreatorNFT(accountId, metadata) {
    try {
      const client = this.getClient();
      const treasuryId = AccountId.fromString(process.env.HEDERA_TREASURY_ID);

      // Create NFT token
      const tokenCreateTx = await new TokenCreateTransaction()
        .setTokenName('BeatHive Creator Identity')
        .setTokenSymbol('BHCI')
        .setTokenType(TokenType.NonFungibleUnique)
        .setDecimals(0)
        .setInitialSupply(0)
        .setTreasuryAccountId(treasuryId)
        .setSupplyType(TokenSupplyType.Finite)
        .setMaxSupply(1)
        .setSupplyKey(client.operatorPublicKey)
        .freezeWith(client);

      const tokenCreateSubmit = await tokenCreateTx.execute(client);
      const tokenCreateReceipt = await tokenCreateSubmit.getReceipt(client);
      const tokenId = tokenCreateReceipt.tokenId;

      // Mint NFT with metadata
      const mintTx = await new TokenMintTransaction()
        .setTokenId(tokenId)
        .setMetadata([Buffer.from(JSON.stringify(metadata))])
        .freezeWith(client);

      const mintSubmit = await mintTx.execute(client);
      await mintSubmit.getReceipt(client);

      console.log(`✅ Creator NFT minted: ${tokenId.toString()}`);
      return tokenId.toString();
    } catch (error) {
      console.error('❌ Error minting Creator NFT:', error);
      throw error;
    }
  }

  async mintTrackNFT(accountId, trackMetadata) {
    try {
      const client = this.getClient();
      const treasuryId = AccountId.fromString(process.env.HEDERA_TREASURY_ID);

      // Create NFT token for track
      const tokenCreateTx = await new TokenCreateTransaction()
        .setTokenName(`BeatHive Track: ${trackMetadata.title}`)
        .setTokenSymbol('BHTR')
        .setTokenType(TokenType.NonFungibleUnique)
        .setDecimals(0)
        .setInitialSupply(0)
        .setTreasuryAccountId(treasuryId)
        .setSupplyType(TokenSupplyType.Finite)
        .setMaxSupply(1)
        .setSupplyKey(client.operatorPublicKey)
        .freezeWith(client);

      const tokenCreateSubmit = await tokenCreateTx.execute(client);
      const tokenCreateReceipt = await tokenCreateSubmit.getReceipt(client);
      const tokenId = tokenCreateReceipt.tokenId;

      // Mint track NFT
      const mintTx = await new TokenMintTransaction()
        .setTokenId(tokenId)
        .setMetadata([Buffer.from(JSON.stringify(trackMetadata))])
        .freezeWith(client);

      const mintSubmit = await mintTx.execute(client);
      await mintSubmit.getReceipt(client);

      console.log(`✅ Track NFT minted: ${tokenId.toString()}`);
      return tokenId.toString();
    } catch (error) {
      console.error('❌ Error minting Track NFT:', error);
      throw error;
    }
  }

  async transferHbar(fromAccountId, toAccountId, amount) {
    try {
      const client = this.getClient();

      const transferTx = await new TransferTransaction()
        .addHbarTransfer(fromAccountId, new Hbar(-amount))
        .addHbarTransfer(toAccountId, new Hbar(amount))
        .freezeWith(client);

      const transferSubmit = await transferTx.execute(client);
      const transferReceipt = await transferSubmit.getReceipt(client);

      console.log(`✅ Transfer completed: ${amount} HBAR to ${toAccountId}`);
      return transferReceipt.transactionId.toString();
    } catch (error) {
      console.error('❌ Error transferring HBAR:', error);
      throw error;
    }
  }

  async distributeRevenue(trackId, earnings, collaborators) {
    try {
      const transactions = [];

      for (const collab of collaborators) {
        const amount = (earnings * collab.revenueShare) / 100;
        if (amount > 0) {
          const txId = await this.transferHbar(
            process.env.HEDERA_TREASURY_ID,
            collab.hederaAccountId,
            amount
          );
          transactions.push({
            userId: collab.userId,
            amount,
            txId
          });
        }
      }

      console.log(`✅ Revenue distributed for track ${trackId}`);
      return transactions;
    } catch (error) {
      console.error('❌ Error distributing revenue:', error);
      throw error;
    }
  }

  async verifySignature(accountId, message, signature) {
    // Implement signature verification logic
    // This is a placeholder - actual implementation depends on your signing method
    try {
      // TODO: Implement actual signature verification
      console.log('⚠️ Signature verification not fully implemented');
      return true;
    } catch (error) {
      console.error('❌ Error verifying signature:', error);
      return false;
    }
  }
}

module.exports = new HederaService();

