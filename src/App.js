import './App.css';
import Navbar from "./components/UI/Navbar/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Activation from "./pages/Activation";
import Activate from "./pages/Activate";
import {Provider} from "react-redux";
import store from "./store";
import DetailVacancy from "./pages/DetailVacancy";
import AddVacancy from "./pages/AddVacancy";
import Profile from "./pages/Profile";

function App() {
  return (
    <div style={{ textAlign: "left" }} className="App">
        <Provider store={store}>
            <BrowserRouter>

                <Navbar/>
                <Routes>
                    <Route path="/home" element={<Home/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/signup" element={<Signup/>}></Route>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/activate-msg" element={<Activation/>}></Route>
                    <Route path='/activate/:uid/:token' element={<Activate/>} />
                    <Route path='/vacancy/:id' element={<DetailVacancy/>} />
                    <Route path='/vacancy/add' element={<AddVacancy/>} />
                    <Route path="*" element={<Home/>}></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </div>
  );
}

export default App;
