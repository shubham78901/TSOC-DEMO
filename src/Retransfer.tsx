import React, { useState } from "react";
import "./Form.css";

interface FormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
    TransactionIdCustomer: string;

OutputIndex: number;


}
const Retransfer: React.FC<FormProps> = ({ onSubmit }) => {
  const [TransactionIdCustomer, setTransactionIdCustomer] = useState("");
  
  const [OutputIndex, setOutputIndex] = useState(0);
 
  const [symbol, setSymbol] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: FormData = {
        TransactionIdCustomer,

        OutputIndex
    
    };

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
      <h2>Recall KYC Token</h2>
        <label htmlFor="tokenName">Transaction id :</label>
        <input
          type="text"
          id="TransactionIdCustomer"
          value={TransactionIdCustomer}
          onChange={(e) => setTransactionIdCustomer(e.target.value)}
        />
      </div>
  
      <div className="form-group">
        <label htmlFor="totalSupply">Output Index:</label>
        <input
          type="number"
          id="OutputIndex"
          value={OutputIndex}
          onChange={(e) => setOutputIndex(parseInt(e.target.value))}
        />
      </div>
      
   
      <button type="submit" className="form-button">
        Recall
      </button>
    </form>
  );
};

export default Retransfer;
