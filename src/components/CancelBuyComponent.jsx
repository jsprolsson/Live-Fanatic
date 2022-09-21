import { useNavigate } from "react-router-dom";
import "../styles/CancelBuyComponent.css";

const CancelBuyComponent = () => {
  const navigate = useNavigate()
  return (
    <div className="Cancelbuy">
      <span id="cancelbuySymbol" className="material-symbols-outlined">close</span>
      <h2 id="cancelbuy-H3">Purchase failed.</h2>
      <div className="cancelbuy-position">
        <button onClick={() => navigate('/')} className="cancelbuy-btn">
          Home
        </button>
        <button onClick={() => navigate('/events')} className="cancelbuy-btn">
          Events
        </button>
      </div>
    </div>
  );
}




export default CancelBuyComponent;