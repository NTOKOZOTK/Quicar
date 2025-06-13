import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AppProvider } from "./context/AppContext"
import SplashScreen from "./pages/SplashScreen"
import LoginPage from "./pages/LoginPage"
import VerificationPage from "./pages/VerificationPage"
import HomePage from "./pages/HomePage"
import CarDetailPage from "./pages/CarDetailPage"
import CheckoutPage from "./pages/CheckoutPage"
import SuccessPage from "./pages/SuccessPage"
import AdminPanel from "./pages/AdminPanel"
import ComparePage from "./pages/ComparePage"
import ProfilePage from "./pages/ProfilePage"
import ChatPage from "./pages/ChatPage"
import "./App.css"

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verification" element={<VerificationPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/car/:id" element={<CarDetailPage />} />
            <Route path="/checkout/:id" element={<CheckoutPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
