import ArrowLeft from './../../../Common/static/Buttons/ButtonPrevious.png'
import ArrowRight from './../../../Common/static/Buttons/ButtonNext.png'
import picBorder from './../../../Common/static/border/PageBorder.png'
import nftBorder from './../../../Common/static/border/nftBorder.png'
import MiniAngel from './../../../Common/static/mint/MiniAngel.png'
import ButtonBlack from './../../../Common/static/Buttons/ButtonBlack.png'
import MiniDemon from "../../static/mint/MiniDemon.png";
import {useState} from "react";

function UnStackMenu() {




    let DataSlider1 = [
        {
            bg: nftBorder,
            img: MiniDemon,
            soul:110,
            key: 0
        },
        {
            bg: nftBorder,
            img: MiniAngel,
            soul:1340,
            key: 1
        },
        {
            bg: nftBorder,
            img: MiniAngel,
            soul:10740,
            key: 2
        },
        {
            bg: nftBorder,
            img: MiniAngel,
            soul:14230,
            key: 3
        },
        {
            bg: nftBorder,
            img: MiniAngel,
            soul:124330,
            key: 4
        }
    ]


    let DataSlider2 = [
        {
            bg: nftBorder,
            img: MiniAngel,
            soul: 110,
            key: 0
        },
        {
            bg: nftBorder,
            key: 1
        },
        {
            bg: nftBorder,
            key: 2
        },
        {
            bg: nftBorder,
            key: 3
        },
        {
            bg: nftBorder,
            key: 4
        }
    ]


    const [Data , SetData] = useState(DataSlider1)
    const [NumberSlide , SetNumberSlide] = useState(1)



    function FuncSlider(data) {
        switch(data) {
            case "LeftArrow":
                SetData(DataSlider1)
                SetNumberSlide(1)
                break;
            case "RightArrow":
                SetData(DataSlider2)
                SetNumberSlide(2)
                break;
            default:
            // code block
        }
    }

    return (

    <div  className="text-white" style={{paddingBottom:"400px"}}>
        <div className="w-100 d-flex flex-column align-items-end TextUnderMenuStake ">
            <span>Total Celestials Un-Staked : 5</span>
            <span>Total Nephilims Staked : 1</span>
            <span>Total Demons Staked : 3</span>
            <span>Total Angels Staked : 8</span>
        </div>

        <div className="d-flex flex-row align-items-center TopSliderStake text-white">
            <span style={{marginRight: "20px", fontFamily: "Evil_Bible"}}>Page: </span>
            <div className="ArrowImgSliderStake " onClick={()=>FuncSlider("LeftArrow")}>
                <img src={ArrowLeft} alt={ArrowLeft} width="100%" height="100%"/>
            </div>

            <div className="position-relative BorderImgSliderStake"  style={{marginRight: "20px", marginLeft: "20px"}}>
                <img src={picBorder} alt={picBorder} width="100%" height="100%"/>
                <span className='centered-axis-xy'>{NumberSlide}</span>
            </div>
            <div className="ArrowImgSliderStake " onClick={()=>FuncSlider("RightArrow")}>
                <img src={ArrowRight} alt={ArrowRight} width="100%" height="100%"/>
            </div>
        </div>


        <div className="w-100 d-flex flex-row justify-content-between flex-wrap align-items-Mobile-center" style={{ marginTop:"20px"}}>
            {
                Data.map((item)=>

                    <div className="d-flex flex-column itemsSlider textUnderSliderStake">
                        <div className="w-100 h-100 position-relative">
                            <img src={item.bg} alt={item.bg} width="100%" height="100%"/>

                            {
                                item.img? <img src={item.img} alt={item.img} className='centered-axis-xy object-fit-contain' width="90%" height="90%" />
                                    : <div className='centered-axis-xy object-fit-contain'   style={{ width:"90%" , height:"90%" , backgroundColor:"black" , opacity:"0.4"}}/>
                            }

                        </div>
                        <div className="BtnUnderSliderStake">
                            <div className="BtnUnderSliderStake">
                                {
                                    item.img &&
                                    <div className='position-relative d-flex flex-center' style={{width: "70%" , marginTop:"20px"}}>
                                        <img src={ButtonBlack} alt="Blue" width="100%" height="100%"/>
                                        <span className='centered-axis-xy'>Stack</span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    </div>
    )
}
export default UnStackMenu