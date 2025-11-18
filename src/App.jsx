import Header from './components/Header'
import PredictForm from './components/PredictForm'
import Trainer from './components/Trainer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.07),transparent_50%)]"></div>
      <div className="relative max-w-5xl mx-auto px-4 py-10">
        <Header />
        <div className="grid md:grid-cols-2 gap-6">
          <PredictForm />
          <Trainer />
        </div>
        <div className="text-center mt-6 text-blue-200/70 text-sm">
          Tip: You can train first for better accuracy, or just predict and it will auto-train in the background.
        </div>
      </div>
    </div>
  )
}

export default App
