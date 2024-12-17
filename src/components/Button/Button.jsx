import "./Button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Button = ({ text, type, onClick, useIcon }) => {
  return (
    <button onClick={onClick} className={`Button Button_${type}`}>
      {useIcon ? (
        <FontAwesomeIcon
          icon={faHome}
          style={{ width: "20px", height: "20px" }}
        />
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
