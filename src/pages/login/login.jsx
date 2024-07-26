import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import appLogo from "../../img/logo3.png";
import appLogo2 from "../../img/logobnw.png";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    navigate("/create-account");
  };

  return (
    <div className="login-container">
      <div className="w-full max-w-md p-8 bg-white shadow-lg text-center rounded">
        <img src={appLogo} alt="App Logo" className="w-52 h-16 mb-4 mx-auto" />
        <b className="text-lg mb-4">Log in to continue</b>
        {error && (
          <div className="flex items-center justify-center bg-yellow-100 border border-yellow-500 text-red-500 p-2 rounded mb-4">
            <p>Incorrect email or password!</p>
          </div>
        )}
        <form onSubmit={handleLogin} className="flex flex-col items-center">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-11/12 p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-11/12 p-2 mb-4 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full p-2 bg-purple-600 text-white rounded hover:bg-purple-800"
          >
            Continue
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-600">
          Don't have an account? <span className="font-bold">·</span>{" "}
          <a
            href="#"
            onClick={handleCreateAccount}
            className="text-purple-600 hover:underline"
          >
            Create account
          </a>
        </div>
        <hr className="my-4" />
        <div className="text-center text-xs text-gray-600">
          <img
            src={appLogo2}
            alt="App Logo"
            className="w-56 h-12 mb-2 mx-auto"
          />
          <p>
            By clicking continue, you accepted our <br />
            <a href="#" className="underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
