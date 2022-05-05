import AturhForm from "components/AuthForm";
import { authService } from "firebaseService/fbauth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "css/auth.css";

function Auth() {
  const onSocialClick = async (event) => {
    const { name } = event.target;
    await authService.socialLogin(name);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color="#04AAFF"
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AturhForm />
      <div className="authBtns">
        <button className="authBtn" name="google" onClick={onSocialClick}>
          구글로 계속하기 <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button className="authBtn" name="github" onClick={onSocialClick}>
          깃허브로 계속하기 <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
}

export default Auth;
