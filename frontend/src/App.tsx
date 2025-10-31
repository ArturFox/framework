/* src/App.tsx */

import { Footer } from './semantics/footer/footer'
import { HeaderM } from './semantics/header/header'
import HomePage from './semantics/main/home'

function App() {
  return (
    <div className="layout">
      <HeaderM />

      <HomePage />

      <Footer />
    </div>
  )
}

export default App
