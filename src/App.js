import {
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Signin from "./pages/SignIn";
import Invoices from "./components/Invoices/Invoices";
import ProtectedRoute from "./components/Shared/ProtectedRoute";
import Return from "./pages/Return";
import Pos from "./pages/Pos";
import AdminSettings from "./pages/AdminDiscount";
import { Toaster } from "sonner";

function App() {
  const isLoggedIn = localStorage.getItem("loggedIn");
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="h-full m-0 p-0">
      {isLoggedIn && location.pathname !== "/login" && (
        <nav className="bg-[#fdc071] h-[30px]">
          <ul className="links flex list-none">
            <li className="ml-5">
              <Link
                to="/pos"
                className={`no-underline text-black ${
                  location.pathname === "/pos"
                    ? "font-bold underline"
                    : "hover:underline"
                }`}
              >
                Home
              </Link>
            </li>
            <li className="ml-5">
              <Link
                className={`no-underline text-black ${
                  location.pathname === "/invoices"
                    ? "font-bold underline"
                    : "hover:underline"
                }`}
                to="/invoices"
              >
                Invoices
              </Link>
            </li>
            {isAdmin && (
              <>
                <li className="ml-5">
                  <Link
                    className={`no-underline text-black ${
                      location.pathname === "/return"
                        ? "font-bold underline"
                        : "hover:underline"
                    }`}
                    to="/return"
                  >
                    Return
                  </Link>
                </li>
                <li className="ml-5">
                  <Link
                    className={`no-underline text-black ${
                      location.pathname === "/admin-set"
                        ? "font-bold underline"
                        : "hover:underline"
                    }`}
                    to="/admin-set"
                  >
                    Settings
                  </Link>
                </li>
              </>
            )}
            <li>
              <button
                className="text-[#403b32] font-semibold absolute right-10 z-10"
                onClick={() => {
                  localStorage.removeItem("loggedIn");
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      )}
      <div className="h-[calc(100vh-35px)]">
        <Routes>
          <Route
            path="/login"
            element={
              localStorage.getItem("loggedIn") ? (
                <Navigate to="/pos" />
              ) : (
                <Signin />
              )
            }
          />
          <Route
            path="/pos"
            element={
              <ProtectedRoute>
                <Pos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoices"
            element={
              <ProtectedRoute>
                <Invoices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/return"
            element={
              <ProtectedRoute>
                <Return />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-set"
            element={
              <ProtectedRoute>
                <AdminSettings />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/pos" />} />
        </Routes>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            backgroundColor: "#fff8dc",
            color: "#7c2d12",
            border: "1px solid #facc15",
            padding: "12px 16px",
            fontWeight: "600",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          },
        }}
      />
    </div>
  );
}

export default App;
