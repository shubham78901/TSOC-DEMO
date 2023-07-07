import React from 'react';
import './ConnectWalletBox.css';
import logo from './wallet.png';

interface ConnectWalletBoxProps {
  onClick: () => void;
}

const ConnectWalletBox: React.FC<ConnectWalletBoxProps> = ({ onClick }) => {
  return (
    <div className="box-container">
      <img src={logo} alt="Logo" className="box-logo" />
      <button onClick={onClick} className="box-button">
        Connect your wallet
      </button>
    </div>
  );
};









export default ConnectWalletBox;
