import abi from "./nftAbi.json";
import stakeAbi from "./stakeAbi.json";

// export const contractAddress = "0xfCCF80344a668b72ac4Be23513F0E9E4a35C84fA";
export const contractAddress = "0xAdb4F0B1E2aE2EF8AeAeC526033A5f6fbcf1eF62";
export const nft = "0x9377dBC1c6DFee66B00c243E70dA2E942FbCf68d";
export const soul = "0xB251457c78f31F3b0fe24F4e253969EA28e4D96c";
export const stake = "0x24f89FE603c7303201069C30cA01ff33473C931A";
export const contractABI = abi.abi;
export const contractABIStake = stakeAbi.abi;
export const ABI = abi;
export const addressTo="0x3506756fB37E0d8Dfccc409Ab6194A41A81568f2";
export const axURL = "https://celestialverse.mypinata.cloud/ipfs/QmeMBSECYoQHjDFezLziG3zWYTJVhoSoAHtuvqbAG58irt/";

export const PayWhiteList=1.3;
export const PayNormal=1.5;
// export const APIURL="https://rinkeby.infura.io/v3/cc8a82c081064ac094b5189ca2e5f6e0";
export const APIURL="https://api.avax.network/ext/bc/C/rpc/A64G6N7HGVZJA2RNWQKSYPZ1JRW5741455";

export const MarkProof= async ({address})=>{
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "Path=/; connect.sid=s%3A7mCcDzodoK2US5ShEtSKA8f3NGLU1jhe.zhOT8a9w0JiRnVAaWrCR6upk8UbCQRhuUCN%2FNyvHfwI");
    
    var formdata = new FormData();
    // formdata.append("_address", "0x6A533D6A3F43d5e29468D17Bc579363BD0015398");
    formdata.append("_address", address);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
 


let response={"status":200,"data":""}
await  fetch("https://api.celestialverse.net/api/getmerkleproof", requestOptions)
  .then(response => response.text())
  .then(result => {
    response={"status":200,"data":JSON.parse(result)}
       
    //  console.log(result)
  })

   
  .catch(error => {
    response={"status":500,"data":error}
       
 
    // return({status:400,data:error})
 console.log(error)
});

return response
}
export const RequestToken= async ({address})=>{
    var myHeaders = new Headers();
myHeaders.append("Cookie", "Path=/; connect.sid=s%3A7mCcDzodoK2US5ShEtSKA8f3NGLU1jhe.zhOT8a9w0JiRnVAaWrCR6upk8UbCQRhuUCN%2FNyvHfwI");

var formdata = new FormData();
formdata.append("owner", address);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};
let response={"status":200,"data":""}
await fetch("https://api.celestialverse.net/api/requesttoken", requestOptions)
  .then(response => response.text())
  .then(result => {
    response={"status":200,"data":JSON.parse(result)}
       
     console.log(result)
  })

   
  .catch(error => {
    response={"status":500,"data":error}
       
 
    // return({status:400,data:error})
 console.log(error)
});

return response
}
