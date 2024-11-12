// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./components/Login.js";
// import ProtectedRoute from "./components/ProtectedRoute.js";
// import Dashboard from "./components/Dashboard.js";

// function App() {
//   const [auth, setAuth] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) setAuth(true);
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login setAuth={setAuth} />} />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute auth={auth}>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from "react";

// import react router dom
import { Routes, Route } from "react-router-dom";

// import component Register
import Register from "./pages/Register";

// import component Login
import Login from "./pages/Login";

// import component Dashboard
import Dashboard from "./pages/Dashboard";
import PostIndexPokemon from "./pages/pokemons";
import PostCreatePokemon from "./pages/pokemons/create";
import PostEditPokemon from "./pages/pokemons/edit";
import PostIndex from "./pages/posts";
import PostCreate from "./pages/posts/create";
import PostEdit from "./pages/posts/edit";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pokemons" element={<PostIndexPokemon />} />
        <Route path="/pokemons/create" element={<PostCreatePokemon />} />
        <Route path="/pokemons/edit/:id" element={<PostEditPokemon />} />
        <Route path="/posts" element={<PostIndex/>} />
        <Route path="/posts/create" element={<PostCreate />} />
        <Route path="/posts/edit/:id" element={<PostEdit />} />
      </Routes>
    </div>
  );
}

export default App;
