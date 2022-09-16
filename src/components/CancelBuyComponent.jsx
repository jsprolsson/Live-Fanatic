import "../styles/CancelBuyComponent.css";

const CancelBuyComponent = () => {
    return(
        <div className="Cancelbuy">
            <span id="cancelbuySymbol" className="material-symbols-outlined">close</span>
            <h2 id="cancelbuy-H3">You did not complete the purchase!<br/><br/>You will now be redirected to Home or Event</h2>
            <div className="cancelbuy-position">  
            <button id="cancelbuy-Homepagebtn">
                HOME
            </button>
            <button id="cancelbuy-BackToEventpagebtn">
                EVENT
            </button>
            </div>
        </div>
    );
}




export default CancelBuyComponent;