import "../styles/EnterCardComponent.css";

const cardData = () => {
  const amount = 444;
  return (
    <>
      <div id="crdright-col">
        <div className="crdhead">
          <h2>Payment</h2>
          <div id="crdlogotype">
            <img
              id="mastercard"
              src="http://emilcarlsson.se/assets/MasterCard_Logo.png"
              alt=""
            />
          </div>
        </div>

        <div className="crdhead">
          <h2>Amount:</h2>
          <div id="crdlogotype">
            <h2 className="amount">{amount} Sek</h2>
          </div>
        </div>

        <div className="crdcholder">
          <label for="">Cardholders name:</label>
          <input id="crdcardholder" type="text" placeholder="Mr Mo Dahl" />
        </div>

        <form action="">
          <label for="">Cardnumber:</label>
          <div id="crdcardnumber">
            <input
              type="number"
              max="4"
              max-length="4"
              min="4"
              placeholder="0123"
            />{" "}
            <span class="divider">-</span>
            <input
              type="number"
              max="4"
              max-length="4"
              min="4"
              placeholder="4567"
            />{" "}
            <span class="divider">-</span>
            <input
              type="number"
              max="4"
              max-length="4"
              min="4"
              placeholder="8901"
            />{" "}
            <span class="divider">-</span>
            <input
              type="number"
              max="4"
              max-length="4"
              min="4"
              placeholder="2345"
            />
          </div>

          <div class="crdexdate">
            <label for="">Expiration Date:</label>
            <select name="month" id="crdmonth" onchange="" size="1">
              <option value="00">Month</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <select name="year" id="crdyear" onchange="" size="1">
              <option value="00">Year</option>
              <option value="01">2022</option>
              <option value="02">2023</option>
              <option value="03">2024</option>
              <option value="04">2025</option>
              <option value="05">2026</option>
              <option value="06">2027</option>
              <option value="07">2028</option>
              <option value="08">2029</option>
              <option value="09">2030</option>
              <option value="10">2031</option>
            </select>
          </div>

          <div class="crdcvcgrid">
            <label id="crdcvc-label" for="">
              CVC: <i class="fa fa-question-circle-o" aria-hidden="true"></i>
            </label>
            <input id="crdcvc" type="text" placeholder="123" maxlength="3" />
          </div>

          <div className="crdbtn">
            <button id="crdpurchase">Purchase</button>
            <button id="crdpaypal">
              <i class="fa fa-paypal" aria-hidden="true"></i> Pay with PayPal
            </button>
          </div>
          <p id="support">
            Having problem with checkout?{" "}
            <a href="#">Contact our support</a>.
          </p>
        </form>
      </div>
    </>
  );
};

export default cardData;
