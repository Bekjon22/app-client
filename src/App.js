
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import LimitTags from "./pages/Tag";
import SearchAppBar from "./pages/Search";
import Main from "./pages/Main";
import PrimarySearchAppBar from "./component/Navbar";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/LoginPage";
import MyCollections from "./pages/MyCollections";



function App() {
    return (
        <div className="App">
            <ToastContainer/>
            <Routes>
                <Route exact path ='/s' element={<LimitTags/>}/>
                <Route exact path ='/home' element={<SearchAppBar/>}/>
                <Route exact path ='/' element={<Main/>}/>
                <Route exact path ='/signUp' element={<SignUp/>}/>
                <Route exact path ='/signIn' element={<SignIn/>}/>
                <Route exact path ='/myAccount' element={<MyCollections/>}/>


            </Routes>

        </div>
    );
}

export default App;
