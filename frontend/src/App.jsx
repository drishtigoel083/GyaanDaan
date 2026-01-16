import {BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import UploadNotesPage from "./pages/upload.jsx"
import Register from "./pages/Register.jsx"
import LoginPage from "./pages/Login.jsx"
import NotesPreview from "./pages/NotesPreview.jsx"

function App() {

  return (
   <Router>
    <Routes>
      <Route path = '/' element = {<Home/>} />
      <Route path = '/upload' element = {<UploadNotesPage/>} />
      <Route path = '/register' element = {<Register/>} />
      <Route path = '/login' element = {<LoginPage/>} />
      <Route path = '/notes/:slug' element = {<NotesPreview/>} />

    </Routes>
   </Router>
  )
}

export default App
