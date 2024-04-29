import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import AuthMiddleware from "./core/middleware/auth-middleware";
import { AuthProvider } from "./core/context/auth-context";
import AdminPage from "./pages/admin.page";
import { RequestsPage } from "./pages/requests.page";
import { AgentPage } from "./pages/agents.page";
import { UsersPage } from "./pages/users.page";
import { ToastContainer } from "react-toastify";
import PrivacyPolicy from "./pages/privacy-policy";

function App() {
  return (
    <div className="h-screen w-screen">
      <BrowserRouter>
        <AuthMiddleware>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Login />} />
              <Route path="/dashboard/admin" element={<AdminPage />} />
              <Route path="/dashboard/requests" element={<RequestsPage />} />
              <Route path="/dashboard/agents" element={<AgentPage />} />
              <Route path="/dashboard/users" element={<UsersPage />} />
            </Routes>
          </AuthProvider>
        </AuthMiddleware>
        <Routes>
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
