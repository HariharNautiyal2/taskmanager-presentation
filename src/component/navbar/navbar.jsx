import "./navbar.scss";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import navLogo from "../../img/logo3.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Logout from "../login/logout";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState(null);
  const [isProjectDropdownVisible, setIsProjectDropdownVisible] = useState(false);
  const [isHelpDropdownVisible, setIsHelpDropdownVisible] = useState(false);
  const [isAboutDropdownVisible, setIsAboutDropdownVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username);
        }
      } else {
        setUsername(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleProjectDropdown = () => {
    setIsProjectDropdownVisible(!isProjectDropdownVisible);
  };

  const toggleHelpDropdown = () => {
    setIsHelpDropdownVisible(!isHelpDropdownVisible);
  };

  const toggleAboutDropdown = () => {
    setIsAboutDropdownVisible(!isAboutDropdownVisible);
  };

  return (
    <div className="navbar bg-black text-white">
      <div className="wrapper">
        <div className="left">
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={navLogo} alt="" className="navlogo" />
          </Link>
          <div className="navItems">
            <div className="item">
              <Link to="/" style={{ textDecoration: "none" }}>
                Your works<ExpandMoreIcon className="expandIcon" />
              </Link>
            </div>
            <div className="item" onMouseEnter={toggleProjectDropdown} onMouseLeave={toggleProjectDropdown}>
              <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  Projects<ExpandMoreIcon className="expandIcon" />
              </div>
              {isProjectDropdownVisible && (
                <div className="dropdown">
                  <Link to="/projects" style={{ textDecoration: "none" }} className="dropdownItem">
                    View Projects
                  </Link>
                  <Link to="/invitations" style={{ textDecoration: "none" }} className="dropdownItem">
                    Invitations
                  </Link>
                </div>
              )}
            </div>
            <div className="item" onMouseEnter={toggleHelpDropdown} onMouseLeave={toggleHelpDropdown}>
              <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                Help<ExpandMoreIcon className="expandIcon" />
              </div>
              {isHelpDropdownVisible && (
                <div className="dropdown">
                  <Link to="/faq" style={{ textDecoration: "none" }} className="dropdownItem">
                    FAQ
                  </Link>
                  <Link to="/contactus" style={{ textDecoration: "none" }} className="dropdownItem">
                    Contact Us
                  </Link>
                </div>
              )}
            </div>
            <div className="item" onMouseEnter={toggleAboutDropdown} onMouseLeave={toggleAboutDropdown}>
              <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                About<ExpandMoreIcon className="expandIcon" />
              </div>
              {isAboutDropdownVisible && (
                <div className="dropdown">
                  <Link to="/about" style={{ textDecoration: "none" }} className="dropdownItem">
                    About Us
                  </Link>
                  <Link to="/terms-and-services" style={{ textDecoration: "none" }} className="dropdownItem">
                    Terms and Service
                  </Link>
                  <Link to="/privacy" style={{ textDecoration: "none" }} className="dropdownItem">
                    Privacy Policy
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="right">
          <div className="item">
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <img src={user?.photoURL || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'} alt="" className="avatar" />
            </Link>
          </div>
          <div className="item">
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
