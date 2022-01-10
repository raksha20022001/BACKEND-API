import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Users/Register/Register";
import Login from "./components/Users/Login/Login";
import Navbar from "./components/Navigation/Navbar";
import AddNewCategory from "./components/Categories/AddNewCategory"
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import PrivateProtectRoute from "./components/Navigation/ProtectedRoutes/PrivateProtectRoute";
import AdminRoute from "./components/Navigation/ProtectedRoutes/AdminRoute";
import CreatePost from "./components/Posts/CreatePost";


function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
      
        <Route path="/create-post" element={<CreatePost/>} />
        <Route path="/add-category" element={<AddNewCategory/>} />
        <Route path="/category-list" element={<CategoryList/>} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/Login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;