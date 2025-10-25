import React, { useState, useEffect } from 'react'
import useStore from '../store/useStore'
import { daoProposals, governanceTokens as mockGovernanceTokens } from '../data/mockData'

const GovernancePage = () => {
  const { user, token } = useStore()
  const [proposals, setProposals] = useState([])
  const [governanceTokens, setGovernanceTokens] = useState(null)
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    type: 'funding',
    amount: 0
  })

  useEffect(() => {
    // Use mock data for demo
    setProposals(daoProposals)
    setGovernanceTokens(mockGovernanceTokens)
  }, [])

  const createProposal = async (e) => {
    e.preventDefault()
    // Mock proposal creation
    const newProposalData = {
      id: Date.now(),
      title: newProposal.title,
      description: newProposal.description,
      type: newProposal.type,
      amount: newProposal.amount,
      status: 'active',
      votesFor: 0,
      votesAgainst: 0,
      creator: { name: user?.name || 'Demo User', avatar: user?.avatar },
      votingDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    }
    
    setProposals([newProposalData, ...proposals])
    setNewProposal({ title: '', description: '', type: 'funding', amount: 0 })
    alert('Proposal created successfully! 🎉')
  }

  const voteOnProposal = async (proposalId, voteType) => {
    // Mock voting
    setProposals(proposals.map(proposal => {
      if (proposal.id === proposalId) {
        return {
          ...proposal,
          votesFor: voteType === 'for' ? proposal.votesFor + 1 : proposal.votesFor,
          votesAgainst: voteType === 'against' ? proposal.votesAgainst + 1 : proposal.votesAgainst
        }
      }
      return proposal
    }))
    alert(`Vote ${voteType} recorded! 🗳️`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">🎯 Creator DAO Governance</h1>
          
          {/* Governance Token Balance */}
          {governanceTokens && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 mb-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Your Governance Power</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm opacity-90">Token Balance</p>
                  <p className="text-2xl font-bold">{governanceTokens.tokenBalance}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Staked Tokens</p>
                  <p className="text-2xl font-bold">{governanceTokens.stakedBalance}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Voting Power</p>
                  <p className="text-2xl font-bold">{governanceTokens.votingPower}</p>
                </div>
              </div>
            </div>
          )}

          {/* Create New Proposal */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Create New Proposal</h2>
            <form onSubmit={createProposal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proposal Title
                </label>
                <input
                  type="text"
                  value={newProposal.title}
                  onChange={(e) => setNewProposal({...newProposal, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Fund Nairobi Street Music Festival"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newProposal.description}
                  onChange={(e) => setNewProposal({...newProposal, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows="3"
                  placeholder="Describe your proposal in detail..."
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proposal Type
                  </label>
                  <select
                    value={newProposal.type}
                    onChange={(e) => setNewProposal({...newProposal, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="funding">Funding Request</option>
                    <option value="feature">Feature Request</option>
                    <option value="governance">Governance Change</option>
                  </select>
                </div>
                
                {newProposal.type === 'funding' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (HBAR)
                    </label>
                    <input
                      type="number"
                      value={newProposal.amount}
                      onChange={(e) => setNewProposal({...newProposal, amount: parseFloat(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="1000"
                    />
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
              >
                Submit Proposal
              </button>
            </form>
          </div>

          {/* Active Proposals */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Active Proposals</h2>
            <div className="space-y-4">
              {proposals.map((proposal) => (
                <div key={proposal.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{proposal.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      proposal.status === 'active' ? 'bg-green-100 text-green-800' :
                      proposal.status === 'passed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {proposal.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{proposal.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <span>Votes For: {proposal.votes_for}</span>
                      <span>Votes Against: {proposal.votes_against}</span>
                      {proposal.amount && <span>Amount: {proposal.amount} HBAR</span>}
                    </div>
                    
                    {proposal.status === 'active' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => voteOnProposal(proposal.id, 'for')}
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                        >
                          Vote For
                        </button>
                        <button
                          onClick={() => voteOnProposal(proposal.id, 'against')}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                        >
                          Vote Against
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GovernancePage
