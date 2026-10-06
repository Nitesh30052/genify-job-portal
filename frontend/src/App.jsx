import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PostJob from "./pages/PostJob";
import MyJobs from "./pages/MyJobs";
import Jobs from "./pages/Jobs";
import MyApplications from "./pages/MyApplications";
import Applicants from "./pages/Applicants";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/Forgotpassword";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* ================= LOGGED-IN USERS ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ================= JOB SEEKER ================= */}

        <Route
          path="/jobs"
          element={
            <ProtectedRoute allowedRoles={["JOB_SEEKER"]}>
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute allowedRoles={["JOB_SEEKER"]}>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        {/* ================= RECRUITER ================= */}

        <Route
          path="/post-job"
          element={
            <ProtectedRoute allowedRoles={["RECRUITER"]}>
              <PostJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-jobs"
          element={
            <ProtectedRoute allowedRoles={["RECRUITER"]}>
              <MyJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applicants/:jobId"
          element={
            <ProtectedRoute allowedRoles={["RECRUITER"]}>
              <Applicants />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;