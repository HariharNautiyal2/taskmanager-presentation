import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase";
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });

      navigate("/login");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <LogoutIcon onClick={handleLogout}
    style={{ cursor: 'pointer' }} />
  );
}

export default Logout;