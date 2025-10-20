/* src/App.tsx */

import { Route, Routes, useLocation } from "react-router-dom"
import { HeaderM } from "./semantics/header/one-header"
import { ForgotPasswordM } from "./semantics/header/forgot-password";
import { NewPasswordM } from "./semantics/header/new-password";
import { RegisterM } from "./semantics/header/register";
import { ConfirmPasswordM } from "./semantics/header/confirm-password";
import HomePage from "./semantics/main/main-two";
import PaintingPage from "./semantics/main/painting-page";

function App() {

  const location = useLocation();

  return (
    <>
      <HeaderM/>

      <Routes location={location}>
        
        <Route path="/" element={<HomePage/>}/>

        <Route path="/forgotPassword" element={<ForgotPasswordM/>}/>
        <Route path="/newPassword" element={<NewPasswordM/>}/>
        <Route path="/register" element={<RegisterM/>}/>
        <Route path="/confirmPassword" element={<ConfirmPasswordM/>}/>
        
        <Route path="/painting/:id" element={<PaintingPage />} />
        
      </Routes>

      <footer className="foot"/>
    </>
  )
}

export default App