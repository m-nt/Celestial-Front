import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
 
import { contractABI, contractAddress,nft,soul,stake ,addressTo , ABI,APIURL} from "../utils/constants";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
export const TransactionContext = React.createContext();

const { ethereum } = window;









 






















const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};
const createNFTContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(nft, contractABI, signer);

  return transactionsContract;
};
const createSoulContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(soul, contractABI, signer);

  return transactionsContract;
};
const createStakeContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(stake, contractABI, signer);

  return transactionsContract;
};




const initial = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  // const transactionsContract = new ethers.Contract(contractAddress, contractABI);

  return signer;
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({  amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);
  const [soulBalances, setSoulBalances] = useState(0);
  const [totalNft, settotalNft] = useState(0);



// ****************Menu************

const connectWallet = async () => {
  try {
    if (!ethereum) return alert("Please install MetaMask.");

    const accounts = await ethereum.request({ method: "eth_requestAccounts", });

    setCurrentAccount(accounts[0]);
    window.location.reload();
  } catch (error) {
    console.log(error);

    throw new Error("No ethereum object");
  }
};
const SoulBalance = async () => {
  console.log("***SoulBalance***")
  try {
    if (ethereum) {
      const transactionsContract = createSoulContract();
      console.log("***transactionsContract***")
      console.log(transactionsContract)

      const Balance = await transactionsContract.balanceOf(currentAccount);

        console.log(Balance);
        console.log(  ethers.utils.formatEther(Balance))
        setSoulBalances(ethers.utils.formatEther(Balance))
      // setTransactions(structuredTransactions);
    } else {
      console.log("Ethereum is not present");
    }
  } catch (error) {
    console.log(error);
  }
};

// *********************Mint******************
const getTotalSupply  = async () => {
   try {
    if (ethereum) {
        const transactionsContract = createNFTContract();

      const totalSupply = await transactionsContract.totalSupply();

        settotalNft(ethers.utils.formatEther(totalSupply)* (10 ** 18))
    } else {
      console.log("Ethereum is not present");
    }
  } catch (error) {
    console.log(error);
  }
};

const mintCelestialWhiteList  = async () => {
  try {
    if (ethereum) {
      console.log("getTotalSupply")
      const transactionsContract = createNFTContract();

      const totalSupply = await transactionsContract.totalSupply();
       settotalNft(ethers.utils.formatEther(totalSupply)* (10 ** 18))
    } else {
      console.log("Ethereum is not present");
    }
  } catch (error) {
    console.log(error);
  }
};
const mintCelestialWithAVAX  = async (qty,tokenIds,celestialTypes) => {
console.log(qty)
console.log(tokenIds)
console.log(celestialTypes)
  try {
    if (ethereum) {
      console.log("mintCelestialWithAVAX")
      const transactionsContract = createNFTContract();
      let addressTo="0x3506756fB37E0d8Dfccc409Ab6194A41A81568f2"
      let money=0.0001*qty
      const parsedAmount = ethers.utils.parseEther(money.toString());
      // qty=ethers.utils.parseEther(qty).toString();
      // tokenIds=tokenIds.map(item=>ethers.utils.parseEther(item))
      // celestialTypes=celestialTypes.map(item=>ethers.utils.parseEther(item))
           // value: parsedAmount._hex,
          //  Gas price: 3.41825981 gwei   Gas limit: 3343173   Nonce: 116

              //  settotalNft(ethers.utils.formatEther(totalSupply)* (10 ** 18))

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: "0x5208",
          value: parsedAmount._hex,
          
        }],
      });

      // ,{from:currentAccount,value:parsedAmount}
      const submitMint = await transactionsContract.mintCelestialWithAVAX(qty,tokenIds,celestialTypes);
  
      console.log(submitMint)
      setIsLoading(true);
      console.log(`Loading - ${submitMint.hash}`);
      await submitMint.wait();
      console.log(`Success - ${submitMint.hash}`);
      setIsLoading(false);
    } else {
      console.log("Ethereum is not present");
    }
  } catch (error) {
    console.log(error);
  }
};



 
  const mintNFT  = async (qty,tokenIds,celestialTypes) => {

  const API_URL =APIURL ;
  const PUBLIC_KEY = currentAccount;
  const PRIVATE_KEY = "39de6f3a77ef5b7c0672886e078e48ecc58d93d780cc43aae3f4060cefb08209";

let header={"Access-Control-Allow-Origin": "*"}

  const web3 = createAlchemyWeb3(API_URL,header);
  const nftContract = new web3.eth.Contract(contractABI, nft);
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
  console.log(nonce)


  const tx = {
    from: currentAccount,
    to: addressTo,
    'nonce': nonce,
    'gas': 500000,
    // gas: "0x5208",
    'maxPriorityFeePerGas': 2999999987,
    // 'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
    'data': nftContract.methods.mintCelestialWithAVAX(qty,tokenIds,celestialTypes).encodeABI()
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
  console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);









    // const PRIVATE_KEY = "cfb08416e5e9868d772e212916ae37a16e2aeeb1dc54bdc9d1c84a507110ad1b";
  


  
  // const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
  // const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED";
  // const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
  // const nonce

  //the transaction
  // from: currentAccount,
  // to: addressTo,
  // gas: "0x5208",
  // value: parsedAmount._hex,

  // const submitMint = await transactionsContract.mintCelestialWithAVAX(qty,tokenIds,celestialTypes);
  // const tx = {
  //   'from': PUBLIC_KEY,
  //   'to': contractAddress,
  //   'nonce': nonce,
  //   'gas': 500000,
  //   'maxPriorityFeePerGas': 2999999987,
  //   'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
  // };



  

}

















  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }));

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };




  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      // console.log(ethereum)

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        // getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const initialP=initial()
        // console.log("***********transactionsContract**********")
        // console.log(transactionsContract)
        // console.log(initialP)

  
        // const currentTransactionCount = await transactionsContract.getTransactionCount();

        // window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };


  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          }],
        });

        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount = await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        getTotalSupply,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
        SoulBalance,
        soulBalances,
        totalNft,
        mintCelestialWithAVAX,
        mintNFT
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
