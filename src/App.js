import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import CreateAccount from "./pages/login/create_account";
import ViewAllProjects from "./pages/project/viewAll";
import FAQ from "./pages/faq/faq";
import ContactUs from "./pages/contactus/contactus";
import TermsAndServices from "./pages/terms-and-services/terms-and-services";
import Profile from "./pages/profile/profile";
import PrivacyPolicy from "./pages/privacy-policy/privacy-policy";
import Aboutus from "./pages/aboutus/aboutus";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tasks from "./pages/tasks/task";
import Navbar from "./component/navbar/navbar";
import Invitations from "./pages/invitations/invitations";
import Members from "./pages/members/members";
import BigCalendar from "./pages/calendar/calendar";
import Timeline from "./pages/timeline/timeline";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  purple,lime } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: purple,
    secondary:lime
  },
});
function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? (
      <>
        <Navbar />
        {children}
      </>
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ThemeProvider  theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route path="login" element={<Login />} />
              <Route
                index
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route path="create-account" element={<CreateAccount />} />
              <Route
                index
                element={
                  <RequireAuth>
                    <CreateAccount />
                  </RequireAuth>
                }
              />
              <Route path="/">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <Home />
                    </RequireAuth>
                  }
                />
              </Route>
              <Route path="/projects">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <ViewAllProjects />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/projects/:projectId"
                  element={
                    <RequireAuth>
                      <Tasks />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/projects/:projectId/calendar"
                  element={
                    <RequireAuth>
                      <BigCalendar />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/projects/:projectId/timeline"
                  element={
                    <RequireAuth>
                      <Timeline />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/projects/:projectId/members"
                  element={
                    <RequireAuth>
                      <Members />
                    </RequireAuth>
                  }
                />
              </Route>
              <Route path="/invitations">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <Invitations />
                    </RequireAuth>
                  }
                />
              </Route>
              <Route path="/faq">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <FAQ />
                    </RequireAuth>
                  }
                />
              </Route>

              <Route path="/contactus">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <ContactUs />
                    </RequireAuth>
                  }
                />
              </Route>
              <Route path="/terms-and-services">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <TermsAndServices />
                    </RequireAuth>
                  }
                />
              </Route>
              <Route path="/profile">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <Profile />
                    </RequireAuth>
                  }
                />
              </Route>
              <Route path="/about">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <Aboutus />
                    </RequireAuth>
                  }
                />
              </Route>
              <Route path="/privacy">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <PrivacyPolicy />
                    </RequireAuth>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
