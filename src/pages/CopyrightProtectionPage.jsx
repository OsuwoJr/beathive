import React, { useState, useEffect } from 'react'
import useStore from '../store/useStore'
import { copyrightViolations } from '../data/mockData'

const CopyrightProtectionPage = () => {
  const { user, token } = useStore()
  const [violations, setViolations] = useState([])
  const [scanResults, setScanResults] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)

  useEffect(() => {
    // Use mock data for demo
    setViolations(copyrightViolations)
  }, [])

  const scanContent = async (e) => {
    e.preventDefault()
    if (!uploadedFile) return

    // Mock AI scanning
    const similarityScore = Math.random() * 100
    const violationDetected = similarityScore > 80
    const matchedTrackId = violationDetected ? `TRACK_${Math.random().toString(36).substr(2, 9)}` : null

    const mockScanResult = {
      similarityScore: Math.round(similarityScore * 100) / 100,
      violationDetected,
      matchedTrackId,
      scanType: 'upload',
      audioFeatures: {
        tempo: Math.floor(Math.random() * 200) + 60,
        key: Math.floor(Math.random() * 12),
        energy: Math.random(),
        valence: Math.random()
      }
    }

    setScanResults(mockScanResult)
    alert('Content scan completed! 🛡️')
  }

  const reportViolation = async (violationId) => {
    // Mock violation reporting
    setViolations(violations.map(violation => {
      if (violation.id === violationId) {
        return { ...violation, status: 'reported' }
      }
      return violation
    }))
    alert('Copyright violation reported! 📝')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">🛡️ Copyright Guardian</h1>
          <p className="text-gray-600 mb-8">AI-powered content protection for African creators</p>
          
          {/* Content Scanner */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Scan Content for Copyright Issues</h2>
            <form onSubmit={scanContent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Audio File
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setUploadedFile(e.target.files[0])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Supported formats: MP3, WAV, M4A (Max 50MB)
                </p>
              </div>
              
              <button
                type="submit"
                disabled={!uploadedFile}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {scanResults ? 'Scan Again' : 'Scan Content'}
              </button>
            </form>
            
            {/* Scan Results */}
            {scanResults && (
              <div className="mt-6 p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Scan Results</h3>
                <div className="space-y-2">
                  <p><strong>Similarity Score:</strong> {scanResults.similarity_score}%</p>
                  <p><strong>Violation Detected:</strong> {scanResults.violation_detected ? 'Yes' : 'No'}</p>
                  {scanResults.matched_track_id && (
                    <p><strong>Matched Track:</strong> {scanResults.matched_track_id}</p>
                  )}
                </div>
                
                {scanResults.violation_detected && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                    <p className="text-red-800 font-medium">⚠️ Potential Copyright Violation Detected</p>
                    <p className="text-red-600 text-sm mt-1">
                      This content may infringe on existing copyrights. Please review and ensure you have proper rights.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Copyright Violations */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Copyright Violations</h2>
            <div className="space-y-4">
              {violations.map((violation) => (
                <div key={violation.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">Violation #{violation.id.slice(0, 8)}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      violation.violation_detected ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {violation.violation_detected ? 'Violation' : 'Clean'}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Scan Type:</strong> {violation.scan_type}</p>
                    <p><strong>Similarity Score:</strong> {violation.similarity_score}%</p>
                    <p><strong>Date:</strong> {new Date(violation.created_at).toLocaleString()}</p>
                    {violation.matched_track_id && (
                      <p><strong>Matched Track:</strong> {violation.matched_track_id}</p>
                    )}
                  </div>
                  
                  {violation.violation_detected && (
                    <div className="mt-4">
                      <button
                        onClick={() => reportViolation(violation.id)}
                        className="bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600"
                      >
                        Report Violation
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {violations.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No copyright violations found</p>
                <p className="text-sm">Your content is protected! 🛡️</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CopyrightProtectionPage
