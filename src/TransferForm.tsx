import React, { useState } from 'react';
import "./Form.css";

interface TransferFormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  address: string;
}

const TransferForm: React.FC<TransferFormProps> = ({ onSubmit }) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: FormData = {
      address,
    };

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
      <h2>Transfer KYC Token</h2>
        <label htmlFor="address">Transfer kyc to customer, enter public key :</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
    
      <button type="submit" className="form-button">
        Transfer
      </button>
    </form>
  );
};

export default TransferForm;
