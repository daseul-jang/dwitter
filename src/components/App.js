import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "firebaseService/fbauth";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.authStateChanged(setUserObj, setInit);
  }, []);

  const refreshUser = () => {
    const user = authService.auth.currentUser;

    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
    });
  };

  const styleCenter = {
    maxWidth: "890px",
    width: "100%",
    margin: "0 auto",
    marginTop: "80px",
    display: "flex",
    justifyContent: "center",
  };

  return (
    <div>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          refreshUser={refreshUser}
          init={init}
        />
      ) : (
        <div style={styleCenter}>Initializing...</div>
      )}
      <footer style={styleCenter}>
        <span>&copy; {new Date().getFullYear()} Dwitter</span>
      </footer>
    </div>
  );
}

export default App;
