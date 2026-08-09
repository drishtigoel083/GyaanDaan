import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import UploadNotesPage from "./pages/Upload.jsx";
import Register from "./pages/Register.jsx";
import LoginPage from "./pages/Login.jsx";
import NotesPreview from "./pages/NotesPreview.jsx";
import ExplorePage from "./pages/Explore.jsx";
import DashboardPage from "./pages/Dashboard.jsx";
import ProfilePage from "./pages/Profile.jsx";
import SavedNotesPage from "./pages/SavedNotes.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/upload" element={<UploadNotesPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/saved-notes" element={<SavedNotesPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notes/:slug" element={<NotesPreview />} />
      </Routes>
    </Router>
  );
}

export default App;
