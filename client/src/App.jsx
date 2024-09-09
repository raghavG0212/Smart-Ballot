import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AboutPage from "./pages/AboutPage";
import VotingSuccessPage from "./pages/VotingSuccessPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/Terms&ConditionsPage";
import AdminLogin from "./pages/AdminLogin";
import AlreadyVoted from "./pages/AlreadyVoted";
import VoterDashboard from "./components/voter/VoterDashboard";
import VoterProfile from "./components/voter/VoterProfile";
import AdminCandidateManage from "./components/admin/AdminCandidateManage";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminProfile from "./components/admin/AdminProfile";
import OnlyVoter from "./components/PrivateRoutes/onlyVoter";
import OnlyAdmin from "./components/PrivateRoutes/onlyAdmin";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<AboutPage />} />
        <Route element={<OnlyVoter />}>
          <Route path="/voter-dashboard" element={<VoterDashboard />} />
          <Route path="/voter-profile" element={<VoterProfile />} />
        </Route>
        <Route element={<OnlyAdmin />}>
          <Route
            path="/admin-candidate-management"
            element={<AdminCandidateManage />}
          />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
        </Route>
        <Route path="/voting-success" element={<VotingSuccessPage />} />
        <Route path="/voted" element={<AlreadyVoted />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route
          path="/terms-and-conditions"
          element={<TermsAndConditionsPage />}
        />
      </Routes>
      <Footer />
    </div>
  );
}
