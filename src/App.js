import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import DepartmentPage from "./pages/Department";
import DocumentDetail from "./pages/DocumentDetail";
import DocumentTypePage from "./pages/DocumentType";
import GeneralSubjectPage from "./pages/GeneralSubject";
import HomePage from "./pages/HomePage";
import InformationPage from "./pages/InformationPage";
import SearchPage from "./pages/Search";
import NotFoundPage from "./pages/NotFoundPage";
import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import SubjectDepartmentPage from "./pages/SubjectDepartmentPage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
function App() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  window.addEventListener("scroll", toggleVisibility);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Navigation />

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/department/:khoa_id/:loaitailieu_ten"
          element={<DepartmentPage />}
        />
        {/* <Route
          path="/documenttype/:monhoc_id/:loaitailieu_ten"
          element={<DocumentTypePage />}
        />
        <Route
          path="/generalsubject/:monhoc_id"
          element={<GeneralSubjectPage />}
        /> */}
        <Route
          path="/subjectdepartment/:khoa_id/:monhoc_id/:loaitailieu_ten"
          element={<SubjectDepartmentPage />}
        />
        <Route path="/search/:keyword" element={<SearchPage />} />
        <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
        <Route
          path="/reset-password/:token/:username"
          element={<ResetPasswordPage />}
        />
        <Route
          path="/documentdetail/:tailieu_id"
          element={<DocumentDetail />}
        />

        <Route path="/information/:username" element={<InformationPage />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
      {isVisible && (
        <div className="w-full flex justify-end">
          <button
            className="scroll-to-top-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full focus:outline-none focus:shadow-outline mr-3 mb-2 animate-bounce"
            onClick={scrollToTop}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      )}
      <Footer />
    </Router>
  );
}

export default App;
