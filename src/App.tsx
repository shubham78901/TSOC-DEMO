import React, { useState, useRef } from "react";
import "./App.css";
import { DefaultProvider, SensiletSigner, toHex, toByteString, sha256 } from "scrypt-ts";
import { HelloWorld } from "./contracts/helloworld";
import MessageForm from "./MessageForm";
import Message from "./Message";
import ConnectWalletBox from "./ConnectWalletBox";

function App() {
  const [isConnected, setConnected] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [contract, setContract] = useState<HelloWorld | undefined>(undefined);
  const [deployedTxId, setDeployedTxId] = useState<string>("");

  const [callTxId,setcallTxId]=useState("");

  const signerRef = useRef<SensiletSigner>();

  const handleFormSubmit = async (message: string) => {
    try {
      if (!isConnected) {
        setConnected(false);
        alert("Please connect wallet first.");
        return;
      }
console.log("your deploying message is :"+message)
      const signer = signerRef.current as SensiletSigner;
      const inputSatoshis = 500;

      const instance = new HelloWorld(sha256(toByteString(message, true)))
      await instance.connect(signer);

      const tx = await instance.deploy(inputSatoshis);
      console.log("HelloWorld contract deployed: ", tx.id);

      setSubmittedMessage(message);
      setDeployedTxId(tx.id);
      setContract(instance);
    } catch (e) {
      console.error("deploy hello world failed", e);
      alert("deploy helloworld failed");
    }
  };
  const handleContractCalling = async (message: string) => {
    try {
      if (!isConnected   ) {
        setConnected(false);
        alert("Please connect wallet first.");
        return;
      }
      else if(deployedTxId===""){

        alert("Please Deploy contarct first");
        return;

      }
      const provider = new DefaultProvider()
      const signer = signerRef.current as SensiletSigner;
      // contract call

      const tx = await provider.getTransaction(deployedTxId.toString())
      console.log(tx)

  
      const instance= HelloWorld.fromTx(tx,0)
      await instance.connect(signer);
    
      const { tx: callTx } = await instance.methods.unlock(
        toByteString(message, true)
       )
    console.log('HelloWorld contract `unlock` called: ', callTx.id)

    console.log(callTx.id)
   
      setcallTxId(callTx.id);
    } catch (e) {
      console.error("calling  hello world failed", e);
      alert("calling  helloworld failed");
    }
  };

  const sensiletLogin = async () => {
    try {
      const provider = new DefaultProvider();
      const signer = new SensiletSigner(provider);

      signerRef.current = signer;
      const { isAuthenticated, error } = await signer.requestAuth();

      if (!isAuthenticated) {
        throw new Error(error);
      }

      setConnected(true);
    } catch (error) {
      console.error("sensiletLogin failed", error);
      alert("sensiletLogin failed");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {isConnected ? (
          <div>
            <MessageForm onSubmit={handleFormSubmit} />
            {deployedTxId!==""? <Message text1="deployed" text2={deployedTxId} /> : null}

            <MessageForm onSubmit={handleContractCalling} />
            {callTxId!==""? <Message text1="call" text2={callTxId} /> : null}
            





          </div>
        ) : (
          <ConnectWalletBox onClick={sensiletLogin} />
        )}
      </header>
     
    </div>
  );
}

export default App;
