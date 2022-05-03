import './mint.css'
import Anjel from './../../Common/static/mint/MiniAngel.png'
import Demon from './../../Common/static/mint/MiniDemon.png'
import progressBar from './../../Common/static/mint/GaugeBG.png'
import progressBarPercent from './../../Common/static/mint/Gauge.png'
import SummonButtonHover from './../../Common/static/mint/SummonYesHover.png'
import SummonButton from './../../Common/static/mint/SummonNoHover.png'
import MenuBase from './../../Common/static/mint/Menu.png'
import MenuHover from './../../Common/static/mint/MenuHover.png'
import AvaxLogo from './../../Common/static/mint/AvaxLogo.png'
import RedCross from './../../Common/static/mint/RedCross.png'
import GreenCheck from './../../Common/static/mint/GreenCheck.png'
import MintAmountBorder from './../../Common/static/mint/MintAmountBorder.png'
import ButtonNext from './../../Common/static/mint/ButtonNext.png'
import ButtonPrevious from './../../Common/static/mint/ButtonPrevious.png'
import ButtonBlue from './../../Common/static/mint/ButtonBlue.png'
import ArrowLeft from "../../Common/static/Buttons/ButtonPrevious.png";
import picBorder from "../../Common/static/border/PageBorder.png";
import ArrowRight from "../../Common/static/Buttons/ButtonNext.png";
import mintLod from "../../Common/static/mint/Minting.gif";
import MintingSuccess from "../../Common/static/mint/MintingSuccess.png";
import mintSuccess from "../../Common/static/mint/MintingSuccess.png";
import { useNavigate } from 'react-router-dom';


 import { useState, useContext, useEffect } from "react"
 import { TransactionContext } from "../../context/TransactionContext";
 import {RequestToken,MarkProof} from './../../utils/constants'
function Mint() {
    const navigate = useNavigate();
    const { getTotalSupply ,totalNft, isLoading,mintCelestialWithAVAX ,mintCelestialWhitelist,mintNFT,whiteList,currentAccount,success} = useContext(TransactionContext);

    const [CountSlider , SetCountSlider] = useState(0);
    const [IsMarkProof , SetIsMarkProof] = useState(false);
    useEffect(()=>{
        if(currentAccount){
            getproof(currentAccount)
        }

        async function getproof(currentAccount){
            let data=await  MarkProof(currentAccount);
            if(data.status===200 && data.data.code==="ok"){
                SetIsMarkProof(data.data.merkleProof.length>0)
            }
            // console.log(data)
            
        }
 
    },[currentAccount])
    
    let ArrayNumWidth = [
        {
            width:"33%",
            number:"1"
        },
        {
            width:"66%",
            number:"5"
        },
        {
            width:"100%",
            number:"10"
        }
    ]


  
    useEffect(()=>{
        getTotalSupply()
    },[])
    const handelSummon=async()=>{
        console.log("click on submit")
        console.log(CountSlider)
        let qty=ArrayNumWidth[CountSlider].number ;
       let tokenIds=[] ;let celestialTypes=[] ;let merkleProof=[]

       let LoopLenght=  ConverCountSlider();
       console.log(LoopLenght)
        let validate=true
    //    mintCelestialWithAVAX ,mintCelestialWhitelist
    //    let data=await mintCelestialWithAVAX(qty,tokenIds,celestialTypes)
    
    //     let  address="0x0fF69fb0867d784bCa3F2aE769588fBf0FE09e47"
      for(let i=0;i<LoopLenght;i++){

        let data=await RequestToken({address:currentAccount})
        if(data.status===200 && data.data.code==="ok"){
            console.log(data.data)
            tokenIds.push(data.data.tokenId)
            celestialTypes.push(data.data.celestialType)
            merkleProof.push(data.data.merkleProof)
 
        }else{
            validate=false
            console.log("error")
            console.log(data.data)
            alert(data.data);
        }
           
        }

        if(validate){
            if(!IsMarkProof){
                console.log("mintCelestialWithAVAX")
                console.log(qty)
                console.log( tokenIds )
                console.log( celestialTypes)
                let data=await mintCelestialWithAVAX(qty,tokenIds,celestialTypes)
                console.log(data)


            }else{
                console.log(qty,tokenIds,celestialTypes,merkleProof)
                let data=await mintCelestialWhitelist(merkleProof,qty,tokenIds,celestialTypes)
                console.log(data)

            }
        }
      }

       

    //    let data=await mintNFT(qty,tokenIds,celestialTypes)

    const ConverCountSlider=   ()=>{
        if(CountSlider===0){
            return 1
        }else if(CountSlider===1){
            return 5
        }else if(CountSlider===2){
            return 10
        }
    }




    function FuncSlider(data) {
 
        switch(data) {
            case "LeftArrow":

                if (CountSlider > 0){
                    SetCountSlider(CountSlider-1)
                }else {

                }


                break;
            case "RightArrow":
                if (CountSlider < 2 ){
                    SetCountSlider(CountSlider+1)
                }else {

                }
                break;
            default:
            // code block
        }
    }
    return (
        <div id="backgroundMint">
            <div style={{position:"absolute",left:"3vw", top:"3vw" ,maxWidth:"150px"}} onClick={()=>{navigate('/');}}>
                        <HoverImg src1={MenuBase} src2={MenuHover}/> 
           </div>

            <div id='minLoading' style={isLoading?{dispaly:"block"}:{display:"none"}}>
                <img src={mintLod} alt="mintLod" style={{width:"68vw"}} />
            </div>
            <div id='minLoading' style={success?{dispaly:"block"}:{display:"none"}}>
                <img src={MintingSuccess} alt="mintLod" style={{width:"68vw"}} />
            </div>

            <div style={{width: "70%"}} className='mainCenterPAddingTop'>

                <div className='d-flex justify-content-between w-100'>
                    <div className="imgAvatarMint">
                        <img src={Anjel} alt="anjel" width="100%" height="100%" style={{opacity:0}}/>
                        <img src={Anjel} alt="anjel"   height="100%" className='imgAvatarMint' style={{position:"absolute",left:"10%"}}/>
                    </div>
                    <div className="imgAvatarMint">
                        <img src={Demon} alt="Demon" width="100%" height="100%" />
                     </div>
                </div>

                <div className='position-relative'   >
                    <div className='w-100 d-flex justify-content-center position-relative'>
                        <img src={progressBar} alt="progressBar " className='w-100 heightprogress'/>
                        {/* <div className='position-absolute  ' style={{width: "70vw",overflow:"hidden",display: "inline-block",width: "80%",marginRight:"20%"}}> */}
                        <div className='position-absolute  ' style={{width: "70vw",overflow:"hidden",display: "inline-block",marginRight: (100-(totalNft/100)).toString()+"%",width :(totalNft/100).toString()+"%"}}>
                            {/* <img src={progressBarPercent} className='heightprogress' alt="progressBarPercent " style={{width:(3000/100).toString()+"%" }}/> */}
                            <img src={progressBarPercent} className='heightprogress ' alt="progressBarPercent " style={{ width:"70vw",scale:"50%" }}/>
                            {/* <img src={progressBarPercent} className='heightprogress' alt="progressBarPercent " style={{width:(totalNft/100) }}/> */}
                        </div>
                    </div>
                    <div className='w-100 flex-center positio-relative'>
                        <span className=' mintBorderText'>{totalNft}/10,000</span>
                    </div>
                </div>

                <div className='w-100 flex-center text-white textUnderSliderMint' style={{marginTop:"20px "}}>
                    <div className=' d-flex align-items-center justify-content-between   WidthBtnUnder' >
                        <div className='d-flex align-items-center'>
                            <div className="ArrowImgSliderMint"  onClick={()=>FuncSlider("LeftArrow")}>
                                <img src={ButtonPrevious} alt={ButtonPrevious} width="100%" height="100%"/>
                            </div>
                            <div className="position-relative BorderImgSliderMint"  style={{marginRight: "20px", marginLeft: "20px"}}>
                                <img src={MintAmountBorder} alt={MintAmountBorder} width="100%" height="100%"/>
                                <span className='centered-axis-xy textBorderMint'>{ArrayNumWidth[CountSlider].number}</span>
                            </div>
                            <div className="ArrowImgSliderMint "  onClick={()=>FuncSlider("RightArrow")}>
                                <img src={ButtonNext} alt={ButtonNext} width="100%" height="100%"/>
                            </div>
                        </div>

                        {/* centered-axis-x */}
                        <div className="SummonButtonImgMint " onClick={handelSummon}>
                        <HoverImg src1={SummonButton} src2={SummonButtonHover}/> 
                            {/* <img src={SummonButton} alt="SummonButton" width="100%" height="100%"/> */}
                        </div>
                        {/* <div className="SummonButtonImgMint  " style={{display:"none"}}>
                            <img src={SummonButton} alt="SummonButton" width="100%" height="100%"/>
                        </div> */}


                        <div className='flex-column'  >
                            <div className='d-flex align-items-center'>
                                <span className='whiteListText' style={{ fontWeight:'bold'}}>Whitelist:</span>
                                <img src={IsMarkProof?GreenCheck:RedCross}  alt="RedCross" style={{paddingBottom:IsMarkProof?"7px":"0"}}/>
                            </div>
                            <div className='d-flex align-items-center w-100 ' style={{marginRight:"3vw" ,fontWeight:'bold' ,justifyContent:"center"}}>
                                <img src={ AvaxLogo}  width="30" alt="AvaxLogo" className='whiteListText'/>
                                <span style={{paddingLeft:"6px"}}>{IsMarkProof?    ConverCountSlider()*1.3:    ConverCountSlider()*1.5}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Mint


const HoverImg=({src1,src2})=>{
    const[hover,setHover]=useState(false)

    return(
    <img src={hover?src2:src1} style={{courser:"pointer"}} alt="SummonButton" width="100%" height="100%" onMouseEnter={()=>{setHover(!hover)}} onMouseLeave={()=>{setHover(!hover)}}/>

    )
}