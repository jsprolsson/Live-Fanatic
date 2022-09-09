import "../styles/ModalComponent.css";
import ReactDOM from "react-dom";

const ModalComponent = (props) => {
  console.log(props.show);
  if (!props.show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{props.title}</h4>
        </div>
        <div className="modal-body">{props.children}</div>
        <div className="modal-footer">
          <button onClick={props.onClose} className="modal-button">
            Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("root")
  );
};
export default ModalComponent;
