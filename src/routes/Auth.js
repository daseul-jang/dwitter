import { authService } from "firebaseService/fbauth";
import { useState } from "react";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // 계정 생성
        data = await authService.createUser(email, password);
      } else {
        // 로그인
        data = await authService.signIn(email, password);
      }
      console.log(data);
    } catch (error) {
      console.dir(error);
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = (event) => {
    const { name } = event.target;
    authService.socialLogin(name);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={onChange}
          required
        />
        <input type="submit" value={newAccount ? "가입하기" : "로그인"} />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "로그인" : "가입하기"}</span>
      <div>
        <button name="google" onClick={onSocialClick}>
          구글로 계속하기
        </button>
        <button name="github" onClick={onSocialClick}>
          깃허브로 계속하기
        </button>
      </div>
    </div>
  );
}

export default Auth;
