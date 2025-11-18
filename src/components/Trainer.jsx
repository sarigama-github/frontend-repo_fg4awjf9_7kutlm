import React, { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Trainer() {
  const [training, setTraining] = useState(false)
  const [metrics, setMetrics] = useState(null)
  const [error, setError] = useState('')

  const startTraining = async () => {
    setTraining(true)
    setError('')
    try {
      const res = await fetch(`${API}/api/train`, { method: 'POST' })
      if (!res.ok) throw new Error('Failed to train model')
      const data = await res.json()
      setMetrics(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setTraining(false)
    }
  }

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Model Training</h3>
        <button onClick={startTraining} disabled={training}
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white">
          {training ? 'Training…' : 'Train with sample data'}
        </button>
      </div>
      {error && <p className="text-red-300 text-sm">{error}</p>}
      {metrics && (
        <div className="text-blue-100 text-sm space-y-1">
          <p>R²: <span className="font-mono">{metrics.r2.toFixed(3)}</span></p>
          <p>RMSE (lakhs): <span className="font-mono">{metrics.rmse.toFixed(3)}</span></p>
          <p>Samples: <span className="font-mono">{metrics.n_samples}</span></p>
        </div>
      )}
    </div>
  )
}
