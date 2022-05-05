import Dweet from "components/Dweet";
import { authService } from "firebaseService/fbauth";
import { dbService } from "firebaseService/fbstore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "css/profile.css";

function Profile({ userObj, refreshUser }) {
  const [newDisName, setNewDisName] = useState(userObj.displayName);
  const [myDweets, setMyDweets] = useState([]);
  const navgate = useNavigate();

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

  return (
    <div className="container">
      <form className="profileForm" onSubmit={onSubmit}>
        <input
          className="formInput"
          onChange={onChange}
          value={newDisName}
          type="text"
          placeholder="Display name"
          autoFocus
        />
        <input
          className="formBtn"
          type="submit"
          value="프로필 수정"
          style={{ marginTop: 10 }}
        />
      </form>
      <div className="logoutBtn__div">
        <span className="formBtn cancelBtn logOut" onClick={onLogoutClick}>
          로그아웃
        </span>
      </div>
      {myDweets.map((dw) => (
        <Dweet
          key={dw.id}
          dweetObj={dw}
          isOwner={dw.creatorId === userObj.uid}
        />
      ))}
    </div>
  );
}

export default Profile;
