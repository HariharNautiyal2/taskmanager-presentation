import { useState } from "react";
import "./login.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import appLogo from "../../img/logo3.png";
import appLogo2 from "../../img/logobnw.png";

const CreateAccount = () => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        id: res.user.uid,
      });
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="w-full max-w-md p-8 bg-white shadow-lg text-center rounded">
        <img src={appLogo} alt="App Logo" className="w-52 h-16 mb-4 mx-auto" />
        <b className="text-lg mb-4">Create an account</b>
        {error && (
          <div className="flex items-center justify-center bg-yellow-100 border border-yellow-500 text-red-500 p-2 rounded mb-4">
            <p>{error}</p>
          </div>
        )}
        <form
          onSubmit={handleCreateAccount}
          className="flex flex-col items-center"
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-11/12 p-2 mb-2 border border-gray-300 rounded"
            aria-label="Username"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-11/12 p-2 mb-2 border border-gray-300 rounded"
            aria-label="Email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-11/12 p-2 mb-2 border border-gray-300 rounded"
            aria-label="Password"
          />
          <button
            type="submit"
            className="w-full p-2 bg-purple-600 text-white rounded hover:bg-purple-800"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-600">
          Already have an account? <span className="font-bold">·</span>{" "}
          <a
            href="#"
            onClick={handleLogin}
            className="text-purple-600 hover:underline"
          >
            Log in
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
            By signing up, I accept the Orchestr8 <br />
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

export default CreateAccount;
