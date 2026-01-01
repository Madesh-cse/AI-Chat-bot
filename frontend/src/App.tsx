import Header from "./components/Header"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Chat from "./pages/Chat"
import NotFound from "./pages/NotFound"
import { useAuth } from "./components/context/AuthContext"

function App() {
  
  console.log(useAuth()?.isLoggedIn)

  return (
   <main>
     <Header/>
     <Routes>
       <Route path = '/' element={<Home/>}/> 
       <Route path = '/signup' element={<SignUp/>}/> 
       <Route path = '/login' element={<Login/>}/> 
       <Route path = '/chat' element={<Chat/>}/> 
       <Route path = '*' element={<NotFound/>}/> 
     </Routes>
    </main>
  )
}

export default App
