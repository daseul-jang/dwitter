import { authService } from "fbase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navgate = useNavigate();
  const onLogoutClick = () => {
    signOut(authService);
    navgate("/");
  };
  return (
    <>
      <button onClick={onLogoutClick}>로그아웃</button>
    </>
  );
}
