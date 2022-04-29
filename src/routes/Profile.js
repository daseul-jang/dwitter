import { authService } from "firebaseService/fbauth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navgate = useNavigate();
  const onLogoutClick = () => {
    authService.logOut();
    navgate("/");
  };
  return (
    <>
      <button onClick={onLogoutClick}>로그아웃</button>
    </>
  );
}
