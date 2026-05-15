import { Routes, Route } from "react-router"
import PhoneLoginPage from "./pages/PhoneLoginPage"
import { PermissionFormPage } from "./pages/PermissionFormPage"
import { AdminMainPage } from "./pages/AdminMainPage"

export function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Routes>
        <Route path="/" element={<PhoneLoginPage />} />
        <Route path="/acceso/:tokenId" element={<PermissionFormPage />} />
        <Route path="/admin" element={<AdminMainPage />} />
      </Routes>
    </main>
  )
}

export default App
