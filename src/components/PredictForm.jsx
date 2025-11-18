import React, { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const options = {
  brand: ["Maruti","Hyundai","Honda","Mahindra","Tata","Toyota","Renault"],
  model: ["Swift","i20","City","Bolero","Nexon","Innova","Kwid"],
  fuel: ["Petrol","Diesel","CNG"],
  seller_type: ["Individual","Dealer","Trustmark Dealer"],
  transmission: ["Manual","Automatic"],
  owner: ["First Owner","Second Owner","Third Owner"],
  seats: [4,5,7]
}

export default function PredictForm() {
  const [form, setForm] = useState({
    brand: 'Maruti',
    model: 'Swift',
    year: 2018,
    km_driven: 40000,
    fuel: 'Petrol',
    seller_type: 'Individual',
    transmission: 'Manual',
    owner: 'First Owner',
    mileage: 18,
    engine: 1197,
    max_power: 82,
    seats: 5
  })
  const [price, setPrice] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'year' || name === 'km_driven' || name === 'engine' || name === 'seats' ? Number(value) : name === 'mileage' || name === 'max_power' ? Number(value) : value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setPrice(null)
    try {
      const res = await fetch(`${API}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Prediction failed')
      const data = await res.json()
      setPrice(data.predicted_price)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-6">
      <h3 className="text-white font-semibold mb-4">Enter Car Details</h3>
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['brand','model','fuel','seller_type','transmission','owner'].map((k) => (
          <div key={k}>
            <label className="block text-xs text-blue-200 mb-1 capitalize">{k.replace('_',' ')}</label>
            <select name={k} value={form[k]} onChange={handleChange} className="w-full rounded bg-slate-900/60 text-white p-2 border border-slate-700">
              {options[k].map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        ))}

        {[
          { name:'year', min:2005, max:2024 },
          { name:'km_driven', min:0, max:300000 },
          { name:'mileage', min:8, max:35, step:0.1 },
          { name:'engine', min:600, max:3500 },
          { name:'max_power', min:30, max:300, step:0.1 },
          { name:'seats', min:2, max:9 }
        ].map(f => (
          <div key={f.name}>
            <label className="block text-xs text-blue-200 mb-1 capitalize">{f.name.replace('_',' ')}</label>
            <input type="number" name={f.name} value={form[f.name]} onChange={handleChange}
              min={f.min} max={f.max} step={f.step || 1}
              className="w-full rounded bg-slate-900/60 text-white p-2 border border-slate-700" />
          </div>
        ))}

        <div className="md:col-span-2 flex gap-3 mt-2">
          <button type="submit" disabled={loading}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 disabled:opacity-60 text-white">
            {loading ? 'Predicting…' : 'Predict Price'}
          </button>
          {price !== null && (
            <div className="text-green-300 self-center">
              Estimated Price: <span className="font-bold">₹ {price.toFixed(2)} Lakh</span>
            </div>
          )}
          {error && <p className="text-red-300">{error}</p>}
        </div>
      </form>
    </div>
  )
}
