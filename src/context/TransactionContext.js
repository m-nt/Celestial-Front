import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractABIStake, contractAddress, nft, soul, stake, addressTo, ABI, APIURL, PayWhiteList, PayNormal } from "../utils/constants";
import { UpdateToken } from './../utils/constants';
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
export const TransactionContext = React.createContext();

const { ethereum } = window;
const coverether=(value)=>ethers.utils.formatEther(value) * (10 ** 18)


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
  const transactionsContract = new ethers.Contract(stake, contractABIStake, signer);

  return transactionsContract;
};




const initial = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  // const transactionsContract = new ethers.Contract(contractAddress, contractABI);

  return signer;
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({ amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);
  const [soulBalances, setSoulBalances] = useState(0);
  const [totalNft, settotalNft] = useState(0);
  const [whiteList, setWhiteList] = useState(false);



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
        console.log(ethers.utils.formatEther(Balance))
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
  const getTotalSupply = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createNFTContract();

        const totalSupply = await transactionsContract.totalSupply();


        settotalNft(ethers.utils.formatEther(totalSupply) * (10 ** 18))
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const mintCelestialWhiteList = async () => {
  //   try {
  //     if (ethereum) {
  //       console.log("getTotalSupply")
  //       const transactionsContract = createNFTContract();

  //       const totalSupply = await transactionsContract.totalSupply();
  //       settotalNft(ethers.utils.formatEther(totalSupply) * (10 ** 18))
  //     } else {
  //       console.log("Ethereum is not present");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const mintCelestialWithAVAX = async (qty, tokenIds, celestialTypes) => {

    try {
      if (ethereum) {
        const transactionsContract = createNFTContract();
        let money = PayNormal * qty
        const submitMint = await transactionsContract.mintCelestialWithAVAX(qty, tokenIds, celestialTypes, { value: ethers.utils.parseEther(money.toString()) });


        console.log(submitMint)
        setIsLoading(true);
        console.log(`Loading - ${submitMint.hash}`);
        await submitMint.wait();
        console.log(`Success - ${submitMint.hash}`);
   
        for (let j = 0; j < tokenIds.length; j++) {
          let a = await UpdateToken(tokenIds[j]);
          console.log(a)
        }
       setIsLoading(false);
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 4000)
        await getTotalSupply()
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
      console.log(error);
      alert(error.message)
    }
  };

  const mintCelestialWhitelist = async (merkleProof,qty, tokenIds, celestialTypes) => {
     try {
      if (ethereum) {
        const transactionsContract = createNFTContract();
        let money = PayWhiteList * qty
        // console.log("money")
         
        const submitMint = await transactionsContract.mintCelestialWhitelist(merkleProof, qty, tokenIds, celestialTypes, { value: ethers.utils.parseEther(money.toString()) });

        console.log(submitMint)
        setIsLoading(true);
        console.log(`Loading - ${submitMint.hash}`);
        await submitMint.wait();
        console.log(`Success - ${submitMint.hash}`);
      
        for (let j = 0; j < tokenIds.length; j++) {
          console.log(tokenIds[j])
          let a = await UpdateToken(tokenIds[j]);
          console.log(a)
        }
        setIsLoading(false);
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 4000)
        await getTotalSupply()
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {

      console.log(error);
      alert(error.message)
      // console.log(error.message);
      
    }
  };

  // ***************************SoulHount**************

  // ***************************unStack**************

  const bachedCelestialsOfOwner = async (address, page) => {
    try {
      if (ethereum) {
        const transactionsContract = createNFTContract();
        const submitMint = await transactionsContract.bachedCelestialsOfOwner(address, page);

        return submitMint

      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Stakenft = async (tokenId) => {
    try {
      if (ethereum) {
        const transactionsContract = createStakeContract();
        console.log(createStakeContract)
        const submitMint = await transactionsContract.stake(tokenId);
        console.log(submitMint)

        console.log(`Loading - ${submitMint.hash}`);
        await submitMint.wait();
        console.log(`Success - ${submitMint.hash}`);

        return submitMint

      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const CelestialsOfOwner = async (address) => {
    try {
      if (ethereum) {
        const transactionsContract = createNFTContract();
        // console.log(createStakeContract)
        const AllCelestial = await transactionsContract.CelestialsOfOwner(address);

        return AllCelestial

      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ***************************Stack**************


  const tokenOfOwnerBached = async (address, page) => {
    try {
      if (ethereum) {
        const transactionsContract = createStakeContract();
        const submitMint = await transactionsContract.tokenOfOwnerBached(address, page);

        return submitMint

      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tokenOfOwner = async (address) => {
    try {
      if (ethereum) {
        const transactionsContract = createStakeContract();
        // console.log(createStakeContract)
        const AllCelestial = await transactionsContract.tokenOfOwner(address);

        return AllCelestial

      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const earningInfo = async (tokenId) => {
    try {
      if (ethereum) {
        const transactionsContract = createStakeContract();
        // console.log(createStakeContract)
        const AllCelestial = await transactionsContract.earningInfo(tokenId);

        return AllCelestial

      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCooldown = async (tokenId) => {
    try {
      if (ethereum) {
        const transactionsContract = createStakeContract();
        // console.log(createStakeContract)
        const AllCelestial = await transactionsContract.getCooldown(tokenId);
        // console.log(`Loading - ${AllCelestial.hash}`);

        //  console.log(`Success - ${AllCelestial.hash}`);
        return AllCelestial

      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const startEarning = async (tokenId) => {
    try {
      if (ethereum) {
        const transactionsContract = createStakeContract();
        // console.log(createStakeContract)
        const AllCelestial = await transactionsContract.startEarning(tokenId);
        console.log(`Loading - ${AllCelestial.hash}`);
        await AllCelestial.wait();
        console.log(`Success - ${AllCelestial.hash}`);
        return AllCelestial

      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const claim = async (tokenId) => {
    try {
      if (ethereum) {
        const transactionsContract = createStakeContract();
        // console.log(createStakeContract)
        const AllCelestial = await transactionsContract.claim(tokenId);
        console.log(`Loading - ${AllCelestial.hash}`);
        await AllCelestial.wait();
        console.log(`Success - ${AllCelestial.hash}`);
        return AllCelestial

      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const unstake = async (tokenId) => {
    try {
      if (ethereum) {
        const transactionsContract = createStakeContract();
        // console.log(createStakeContract)
        const AllCelestial = await transactionsContract.unstake(tokenId);
        console.log(`Loading - ${AllCelestial.hash}`);
        await AllCelestial.wait();
        console.log(`Success - ${AllCelestial.hash}`);
        return AllCelestial

      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {

      console.log(error?.data?.message)
      console.log(error);
      alert(error?.data?.messag)
    }
  };



  const Progress = async ( ) => {
    console.log("Progress")
    try {
      if (ethereum) {
        const stackContract = createStakeContract();
        const NftContract = createNFTContract();
        const SoulContract = createSoulContract();

        
        const totalStaked = await stackContract.totalStaked();
        const totalAngleStaked = await stackContract.totalAngleStaked();
        const totalDemonStaked = await stackContract.totalDemonStaked();
        const totalNephilimStaked = await stackContract.totalNephilimStaked();

        const SoulMint = await SoulContract.totalSupply();


        const AngelsMinted = await NftContract.AngelsMinted();
        const DemonsMinted = await NftContract.DemonsMinted();
        const NephilimsMinted = await NftContract.NephilimsMinted();
        const MintGen0 = await NftContract.totalSupply();
     


        return({
          totalStaked:coverether(totalStaked),
          totalAngleStaked:coverether(totalAngleStaked),
          totalDemonStaked:coverether(totalDemonStaked),
          totalNephilimStaked:coverether(totalNephilimStaked),
          AngelsMinted:coverether(AngelsMinted),
          DemonsMinted:coverether(DemonsMinted),
          NephilimsMinted:coverether(NephilimsMinted),
          MintGen0:coverether(MintGen0),
          SoulMint:(coverether(SoulMint)/(10 ** 18)).toFixed(2),
        })
     
    
   

        // uint256 public AngelsMinted;
        // uint256 public DemonsMinted;
        // uint256 public NephilimsMinted;
      
        // console.log(  coverether(totalStaked));
        
        // console.log(`Loading - ${AllCelestial.hash}`);
        // await AllCelestial.wait();
        // console.log(`Success - ${AllCelestial.hash}`);
        // return AllCelestial

      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {

      console.log(error?.data?.message)
      console.log(error);
      alert(error?.data?.messag)
    }
  };





















  const mintNFT = async (qty, tokenIds, celestialTypes) => {

    const API_URL = APIURL;
    const PUBLIC_KEY = currentAccount;
    const PRIVATE_KEY = "39de6f3a77ef5b7c0672886e078e48ecc58d93d780cc43aae3f4060cefb08209";

    let header = { "Access-Control-Allow-Origin": "*" }

    let headers = [{
      name: 'Access-Control-Allow-Origin',
      value: '*'
    }];


    let web3 = createAlchemyWeb3(API_URL);
    // web3= new web3.providers.HttpProvider(
    //     API_URL,
    //     {
    //       headers: [{
    //         name: 'Access-Control-Allow-Origin',
    //         // value: API_URL
    //         value: '*'
    //       }]
    //     }
    //   )

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
      'data': nftContract.methods.mintCelestialWithAVAX(qty, tokenIds, celestialTypes).encodeABI()
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
        const initialP = initial()
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
        success,
        sendTransaction,
        handleChange,
        formData,
        SoulBalance,
        soulBalances,
        totalNft,
        mintCelestialWithAVAX,
        mintNFT,
        whiteList,
        mintCelestialWhitelist,
        bachedCelestialsOfOwner,
        Stakenft,
        CelestialsOfOwner,
        tokenOfOwnerBached,
        tokenOfOwner,
        earningInfo,
        startEarning,
        claim,
        unstake,
        getCooldown,
        Progress,
        error, setError

      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
