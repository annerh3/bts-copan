import { Routes, Route } from "react-router"
import PhoneLoginPage from "./pages/PhoneLoginPage"

export function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Routes>
        <Route path="/" element={<PhoneLoginPage />} />
      </Routes>
    </main>
  )
}

export default App
