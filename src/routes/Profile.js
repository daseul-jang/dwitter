import Dweet from "components/Dweet";
import { authService } from "firebaseService/fbauth";
import { dbService } from "firebaseService/fbstore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Profile({ userObj, refreshUser }) {
  const [newDisName, setNewDisName] = useState(userObj.displayName);
  const [myDweets, setMyDweets] = useState([]);
  const navgate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dbService.myDweets(userObj.uid, setMyDweets);
  }, [userObj]);

  const onChange = (event) => setNewDisName(event.target.value);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisName) {
      await authService.profileUpdate(newDisName);
      refreshUser();
    }
  };

  const onLogoutClick = () => {
    authService.logOut();
    navgate("/");
  };

  console.log(location.pathname);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={newDisName}
          type="text"
          placeholder="Display name"
        />
        <input type="submit" value="프로필 수정" />
      </form>
      <button onClick={onLogoutClick}>로그아웃</button>
      {myDweets.map((dw) => (
        <Dweet
          key={dw.id}
          dweetObj={dw}
          isOwner={dw.creatorId === userObj.uid}
        />
      ))}
    </>
  );
}

export default Profile;
