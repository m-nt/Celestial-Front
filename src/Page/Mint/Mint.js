import './mint.css'
import Anjel from './../../Common/static/mint/MiniAngel.png'
import Demon from './../../Common/static/mint/MiniDemon.png'
import progressBar from './../../Common/static/mint/Gauge.png'
import progressBarPercent from './../../Common/static/mint/GaugeBG.png'
import SummonButton from './../../Common/static/mint/SummonButtonText.png'
import AvaxLogo from './../../Common/static/mint/AvaxLogo.png'
import RedCross from './../../Common/static/mint/RedCross.png'
import MintAmountBorder from './../../Common/static/mint/MintAmountBorder.png'
import ButtonNext from './../../Common/static/mint/ButtonNext.png'
import ButtonPrevious from './../../Common/static/mint/ButtonPrevious.png'
import ButtonBlue from './../../Common/static/mint/ButtonBlue.png'




function Mint() {
    return (
        <div id="backgroundMint">
            <div style={{ width: "70%",marginTop:"11%" }}>

                <div className='d-flex justify-content-between w-100' >
                    <img src={Anjel} alt="anjel" className='imageCharacterAnjel' />
                    <img src={Demon} alt="Demon" className='imageCharacterDemon' />
                </div>

                <div className='position-relative'>
                    <div className='w-100 d-flex justify-content-center position-relative'>
                        <img src={progressBar} alt="progressBar " className='w-100 heightprogress' />
                        <div className='w-100 position-absolute' style={{width: "70%"}}>
                            <img src={progressBarPercent} className='heightprogress' alt="progressBarPercent " style={{width: "70%"}}  />
                        </div >
                        
                        
                    </div>
                    <div className='w-100 flex-center positio-relative'  >
                    {/* <img src={MintBorder} alt="progressBar "  /> */}
                    <span className=' mintBorderText'>10,000/10,000</span>

                
                        </div >
                </div>

                <div className='w-100 flex-center'>
                <div className='w-70 d-flex align-items-center justify-content-between  '>
                    <div className='d-flex align-items-center'>
                    <img src={ButtonPrevious} alt="ButtonPrevious" />
                    
                    <img src={MintAmountBorder} alt="MintAmountBorder" />
                    <img src={ButtonNext} alt="ButtonNext" />
                    </div>


                    <img src={SummonButton} alt="SummonButton" />


                    <div className='flex-column'>
                    <div className='d-flex align-items-center'>
                        <span className='whiteListText'>whitelist:</span>
                        <img src={RedCross} alt="RedCross" />
                        </div>
                        <div className='d-flex align-items-center'>
                      
                    <img src={AvaxLogo} alt="AvaxLogo" className='whiteListText' />
                    1.5
                        </div>
                    
                    </div>


                    </div>
                </div>



            </div>



        </div>
    )
}
export default Mint