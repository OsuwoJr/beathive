import React, { useState, useEffect } from 'react'
import useStore from '../store/useStore'
import { streetNodes, africanCities } from '../data/mockData'

const StreetNodesPage = () => {
  const { user, token } = useStore()
  const [nodes, setNodes] = useState([])
  const [selectedCity, setSelectedCity] = useState('Nairobi')
  const [newNode, setNewNode] = useState({
    city: '',
    country: '',
    latitude: '',
    longitude: ''
  })

  useEffect(() => {
    // Filter nodes by selected city
    const cityNodes = streetNodes.filter(node => node.city === selectedCity)
    setNodes(cityNodes)
  }, [selectedCity])

  const registerNode = async (e) => {
    e.preventDefault()
    // Mock node registration
    const newNodeData = {
      id: Date.now(),
      nodeId: `NODE_${newNode.city.toUpperCase()}_${Date.now()}`,
      city: newNode.city,
      country: newNode.country,
      latitude: newNode.latitude ? parseFloat(newNode.latitude) : null,
      longitude: newNode.longitude ? parseFloat(newNode.longitude) : null,
      status: 'active',
      totalUploads: 0,
      lastPing: new Date().toISOString(),
      owner: { name: user?.name || 'Demo User', avatar: user?.avatar },
      performance: 'New'
    }
    
    setNodes([newNodeData, ...nodes])
    setNewNode({ city: '', country: '', latitude: '', longitude: '' })
    alert('Street node registered successfully! 🌍')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">🌍 Street Nodes Network</h1>
          <p className="text-gray-600 mb-8">Decentralized recording hubs across African cities</p>
          
          {/* City Filter */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {africanCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Register New Node */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Register New Street Node</h2>
            <form onSubmit={registerNode} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <select
                    value={newNode.city}
                    onChange={(e) => setNewNode({...newNode, city: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select City</option>
                    {africanCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={newNode.country}
                    onChange={(e) => setNewNode({...newNode, country: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Kenya"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={newNode.latitude}
                    onChange={(e) => setNewNode({...newNode, latitude: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="-1.286389"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={newNode.longitude}
                    onChange={(e) => setNewNode({...newNode, longitude: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="36.817223"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
              >
                Register Street Node
              </button>
            </form>
          </div>

          {/* Street Nodes Map */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Street Nodes in {selectedCity}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nodes.map((node) => (
                <div key={node.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">Node {node.node_id}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      node.status === 'active' ? 'bg-green-100 text-green-800' :
                      node.status === 'inactive' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {node.status}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Location:</strong> {node.city}, {node.country}</p>
                    <p><strong>Uploads:</strong> {node.total_uploads}</p>
                    <p><strong>Last Ping:</strong> {new Date(node.last_ping).toLocaleString()}</p>
                    {node.latitude && node.longitude && (
                      <p><strong>Coordinates:</strong> {node.latitude}, {node.longitude}</p>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <button className="w-full bg-blue-500 text-white py-1 px-3 rounded text-sm hover:bg-blue-600">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {nodes.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No street nodes found in {selectedCity}</p>
                <p className="text-sm">Be the first to register a node in this city!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StreetNodesPage
