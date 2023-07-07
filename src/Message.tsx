import React from "react";
import "./Message.css";

interface Props {
  text1: any; 
  text2:any;
}

const Message: React.FC<Props> = ({ text1 ,text2}) => {
  console.log("from message componenet"+text1)
  if (text1 === 'deployed') {
    return (
      <div>
        <p>helloworld  contract deployed..<br/> Txid: {text2} </p>
      </div>
    );
  }
  else{

    return (
      <div>
        <p>helloworld  contract unlocked..<br/> Txid: {text2} </p>
      </div>
    );

  }
  
  return null; // Provide a default return statement
  
};

export default Message;
