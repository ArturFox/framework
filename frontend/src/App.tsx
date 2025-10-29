/* src/App.tsx */

import { HeaderM } from './semantics/header/header';
import HomePage from './semantics/main/home';
import { Footer } from './semantics/footer/footer';

function App() {
  return (
    <div className="layout">
      <HeaderM />

      <HomePage />

      <Footer />
    </div>
  );
}

export default App;
