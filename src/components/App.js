import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "firebaseService/fbauth";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.authStateChanged(setUserObj, setInit);
  }, []);
  return (
    <div className="App">
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Dwitter</footer>
    </div>
  );
}

export default App;
