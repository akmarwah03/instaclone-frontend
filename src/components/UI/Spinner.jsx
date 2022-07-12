import { Circles } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Spinner = (props) => {
  return (
    <div
      className="absolute left-2/4 top-2/4"
      style={{ transform: "translate(-50%,-50%)" }}
    >
      <Circles color="#6366f1" height={100} width={100} timeout={10000} />
    </div>
  );
};

export default Spinner;
