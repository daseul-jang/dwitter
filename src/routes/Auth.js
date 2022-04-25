import { authService } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("서브밋");
    try {
      let data;
      if (newAccount) {
        // 계정 생성
        //data = await authService.createUser(authService.auth, email, password);
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        // 로그인
        //data = await authService.signIn(authService.auth, email, password);
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      console.dir(error);
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
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
        <button>구글로 계속하기</button>
        <button>깃허브로 계속하기</button>
      </div>
    </div>
  );
}

export default Auth;
