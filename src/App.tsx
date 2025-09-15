import { Route, Routes } from "react-router-dom";
import "./App.css";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Authentication/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import PublicRoute from "./components/PublicRoute";
import Overview from "./pages/Dashboard/Overview/Overview";
import Institute from "./pages/Dashboard/Institute/Institute";
import PaymentLayout from "./pages/Dashboard/Payments/PaymentLayout";
import Transaction from "./pages/Dashboard/Transaction/Transaction";
import { ToastContainer } from "react-toastify";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="institute" element={<Institute />} />
          <Route path="payments" element={<PaymentLayout menu={true} />}>
            <Route index element={<Transaction />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="settlements" element={<div>Settlements</div>} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
