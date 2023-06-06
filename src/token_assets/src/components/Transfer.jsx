import React, { useState } from "react";
import { Principal } from "@dfinity/principal";

function Transfer() {

  const [rId, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [isDisabled, setDisbled] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isHidden, setHidden] = useState(true);

  async function handleClick() {
    setHidden(true);
    setDisbled(true);
    const rec = Principal.fromText(rId);
    const transAmt = Number(amount);
    const res = await token.transfer(rec, transAmt);
    setFeedback(res);
    setHidden(false);
    setDisbled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={ rId }
                onChange={(e) => setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={ amount }
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled= {isDisabled}>
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{ feedback }</p>
      </div>
    </div>
  );
}

export default Transfer;
