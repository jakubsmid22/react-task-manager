import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import Alert from "./Alert";
const Login = ({ onSignIn }) => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOpacity, setAlertOpacity] = useState(0);
  const [remember, setRemember] = useState(false);
  const [forgottenPassword, setForgottenPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  function handleAuthError(error) {
    switch (error) {
      case "auth/invalid-email":
        setAlertMessage("Invalid email format.");
        break;
      case "auth/email-already-in-use":
        setAlertMessage("Email already in use.");
        break;
      case "auth/user-not-found":
        setAlertMessage("User not found.");
        break;
      case "auth/wrong-password":
        setAlertMessage("Wrong password.");
        break;
      case "auth/user-disabled":
        setAlertMessage("User disabled.");
        break;
      case "auth/operation-not-allowed":
        setAlertMessage("Operation not allowed.");
        break;
      case "auth/weak-password":
        setAlertMessage("Weak password.");
        break;
      case "auth/too-many-requests":
        setAlertMessage("Too many requests. Try again later.");
        break;
      case "auth/invalid-verification-code":
        setAlertMessage("Invalid verification code.");
        break;
      case "auth/invalid-verification-id":
        setAlertMessage("Invalid verification ID.");
        break;
      case "auth/invalid-credential":
        setAlertMessage("Invalid credential.");
        break;
      default:
        setAlertMessage("Unknown error occurred.");
        break;
    }
  }

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertOpacity(1);
    setTimeout(() => setAlertOpacity(0), 2000);
  };

  const rememberUser = (user) => {
    remember && localStorage.setItem("user", JSON.stringify(user));
  };

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        onSignIn(user);
        rememberUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        showAlert(errorCode);
      });
  };

  const resetPassword = () => {  
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        setAlertMessage("A password reset email has been sent.");
        setAlertOpacity(1);
        setTimeout(() => setAlertOpacity(0), 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        showAlert(errorCode);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (forgottenPassword) {
      resetPassword();
    }
    else if (loginState) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          onSignIn(user);
          rememberUser(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          showAlert(errorCode);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          onSignIn(user);
          rememberUser(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          showAlert(errorCode);
        });
    }

    
  };


  return (
    <>
      <Alert opacity={alertOpacity} alertMessage={alertMessage} />

      <main className="bg-[#F7F8FC] flex min-h-screen justify-center items-center">
        <div>
          <form
            className="bg-white flex flex-col items-center relative w-96 gap-5 p-5 rounded-sm"
            onSubmit={(e) => handleFormSubmit(e)}
          >
            {forgottenPassword ? (
              <>
                <div>
                <IoMdArrowRoundBack role="button" onClick={() => setForgottenPassword(false)} className="absolute left-4 top-4 text-2xl" />
                <h1 className="text-center mb-5 font-bold text-2xl">Reset Password</h1>

                  <div className="flex flex-col w-64">
                    <label className="font-bold" htmlFor="resetEmail">
                      Email
                    </label>
                    <input
                      className="border pl-2 py-2 rounded-md focus:outline-none"
                      type="email"
                      id="resetEmail"
                      required
                      placeholder="Enter your email"
                      onChange={(e) => setResetEmail(e.target.value)}
                    />
                  </div>
                </div>
                <input className="bg-[#10182F] w-64 text-white py-2 rounded-md cursor-pointer" type="submit" value="SUBMIT" />
              </>
            ) : (
              <>
                <button
                  onClick={googleLogin}
                  className="flex items-center w-64 justify-center gap-2 py-2 rounded-md border"
                >
                  <FaGoogle />
                  {loginState ? "Log in with Google" : "Sign up with Google"}
                </button>

                <p>or</p>

                <div className="flex flex-col w-64">
                  <label className="font-bold" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="border pl-2 py-2 rounded-md focus:outline-none"
                    type="email"
                    id="email"
                    required
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex flex-col w-64">
                  <label className="font-bold" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="border pl-2 py-2 rounded-md focus:outline-none"
                    type="password"
                    id="password"
                    required
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="w-64 justify-between flex items-center">
                  <div className="space-x-1">
                    <input
                      type="checkbox"
                      name="remember-me"
                      id="rememberMe"
                      onChange={() => setRemember(!remember)}
                    />
                    <label className="text-sm" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>

                  {loginState && (
                    <button
                      onClick={() => setForgottenPassword(true)}
                      className="text-sm text-[#447AF4]"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>

                <input
                  className="bg-[#10182F] w-64 text-white py-2 rounded-md cursor-pointer"
                  type="submit"
                  value="SUBMIT"
                />

                <div className="text-sm">
                  {loginState
                    ? "Don't have account? "
                    : "Already have an account? "}
                  <span
                    onClick={() => setLoginState(!loginState)}
                    className="text-[#447AF4]"
                    role="button"
                  >
                    {loginState ? "Sign up" : "Log in"}
                  </span>
                </div>
              </>
            )}
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
