import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MapPage from "./maps/MapPage/MapPage";
import Login from "./signin_signup/organisms/Login";
import SignUp from "./signin_signup/organisms/SignUp";
import InfoPage from "./detailPage/organisms/InfoPage";
import HomePage from "./admin/page/HomePage";
import InventoryManagementPage from "./admin/page/InventoryManagementPage";
import MenuRegistrationPage from "./admin/page/MenuRegistrationPage";
import MemberPage from "./admin/page/MemberPage";

const App = () => {
  const storeId = 1;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="/information/:store_id" element={<InfoPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/admin/inventory" element={<InventoryManagementPage />} />
        <Route path="/admin/user" element={<MemberPage />} />
        <Route
          path="/admin/menu-registration"
          element={<MenuRegistrationPage />}
        />
      </Routes>
      <Link to={`/information/${storeId}`}></Link>
    </Router>
  );
};

export default App;
