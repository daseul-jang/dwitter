import { authService } from "firebaseService/fbauth";
import { useState } from "react";
import "css/authForm.css";

function AturhForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
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

  return (
    <>
      <form className="container" onSubmit={onSubmit}>
        <input
          className="authInput"
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={onChange}
          required
        />
        <input
          className="authInput"
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={onChange}
          required
        />
        <input
          className="authInput authSubmit"
          type="submit"
          value={newAccount ? "가입하기" : "로그인"}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span className="authSwitch" onClick={toggleAccount}>
        {newAccount ? "로그인" : "가입하기"}
      </span>
    </>
  );
}

export default AturhForm;
