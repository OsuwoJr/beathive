const { User, DAOProposal, DAOVote, GovernanceToken } = require('../models');

exports.createProposal = async (req, res, next) => {
  try {
    const { title, description, proposalType, amount } = req.body;
    const creatorId = req.user.id;

    const proposal = await DAOProposal.create({
      creatorId,
      title,
      description,
      proposalType,
      amount: proposalType === 'funding' ? parseFloat(amount) : null,
      votingDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    res.json({
      success: true,
      data: { proposal },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

exports.getProposals = async (req, res, next) => {
  try {
    const { status = 'active' } = req.query;
    
    const proposals = await DAOProposal.findAll({
      where: { status },
      include: [
        { model: User, as: 'creator', attributes: ['id', 'name', 'avatarUrl'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: { proposals },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

exports.voteOnProposal = async (req, res, next) => {
  try {
    const { proposalId, voteType } = req.body;
    const voterId = req.user.id;

    // Check if user already voted
    const existingVote = await DAOVote.findOne({
      where: { proposalId, voterId }
    });

    if (existingVote) {
      return res.status(400).json({
        success: false,
        error: { code: 'ALREADY_VOTED', message: 'You have already voted on this proposal' }
      });
    }

    // Get user's voting power
    const governanceToken = await GovernanceToken.findOne({
      where: { userId: voterId }
    });

    const votingPower = governanceToken ? governanceToken.votingPower : 1;

    // Create vote
    await DAOVote.create({
      proposalId,
      voterId,
      voteType,
      votingPower
    });

    // Update proposal vote counts
    const proposal = await DAOProposal.findByPk(proposalId);
    if (voteType === 'for') {
      proposal.votesFor += votingPower;
    } else {
      proposal.votesAgainst += votingPower;
    }
    await proposal.save();

    res.json({
      success: true,
      data: { message: 'Vote recorded successfully' },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

exports.getGovernanceTokens = async (req, res, next) => {
  try {
    const { userId } = req.params;

    let governanceToken = await GovernanceToken.findOne({
      where: { userId }
    });

    if (!governanceToken) {
      // Create initial governance tokens for new user
      governanceToken = await GovernanceToken.create({
        userId,
        tokenBalance: 100, // Initial tokens
        stakedBalance: 0,
        votingPower: 100
      });
    }

    res.json({
      success: true,
      data: { tokens: governanceToken },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};
