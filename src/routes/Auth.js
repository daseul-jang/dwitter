import AturhForm from "components/AuthForm";
import { authService } from "firebaseService/fbauth";

function Auth() {
  const onSocialClick = async (event) => {
    const { name } = event.target;
    await authService.socialLogin(name);
  };

  return (
    <div>
      <AturhForm />
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
