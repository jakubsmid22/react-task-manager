import { useState, useEffect } from "react";
import Login from "./components/Login";
import TaskManager from "./components/TaskManager"

const App = () => {
  const [signed, setSigned] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const isUserEmpty = (obj) => Object.keys(obj).length === 0;

  useEffect(() => {
    setSigned(!isUserEmpty(user));
  }, [user]);

  const handleSignIn = (signedUser) => {
    setUser(signedUser);
    setSigned(true);
  };

  return <>{!signed ? <Login onSignIn={handleSignIn} /> : <TaskManager user={user} />}</>;
};

export default App;