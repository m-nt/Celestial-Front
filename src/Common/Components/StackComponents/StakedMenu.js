import ArrowLeft from './../../../Common/static/Buttons/ButtonPrevious.png'
import ArrowRight from './../../../Common/static/Buttons/ButtonNext.png'
import picBorder from './../../../Common/static/border/PageBorder.png'
import nftBorder from './../../../Common/static/border/nftBorder.png'
import MiniAngel from './../../../Common/static/mint/MiniAngel.png'
import MiniDemon from './../../../Common/static/mint/MiniDemon.png'
import ButtonBlack from './../../../Common/static/Buttons/ButtonBlack.png'
import ButtonBlackWide from './../../../Common/static/Buttons/ButtonBlackWide.png'
import ButtonBlackWider from './../../../Common/static/Buttons/ButtonBlackWider.png'
import soul from './../../../Common/static/soul.png'

import AngelBorder from './../../../Common/static/border/AngelBorder.png'
import DemonBorder from './../../../Common/static/border/DemonBorder.png'
import EmptyBorder from './../../../Common/static/border/EmptyBorder.png'
import NephilimBorder from './../../../Common/static/border/NephilimBorder.png'
import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { TransactionContext } from "../../../context/TransactionContext";
import { axURL } from './../../../utils/constants'

// tokenOfOwnerBached,
// tokenOfOwner


function StackMenu() {

    const { currentAccount, tokenOfOwnerBached, tokenOfOwner, earningInfo, startEarning, claim, unstake, getCooldown } = useContext(TransactionContext);
    let [tokens, setToken] = useState([])
    let [count, setCount] = useState(0)
    let [AllData, setAllData] = useState({ all: 0, Nephilim: 0, Demon: 0, Angel: 0 })
    const convertEther = (data) => ethers.utils.formatEther(data) * (10 ** 18)
    const convertEarn = (data) => ethers.utils.formatEther(data)

    const converbgType = (data) => {
        if (data === 1) {
            return AngelBorder
        } else if (data === 2) {
            return DemonBorder
        } else if (data === 3) {
            return NephilimBorder
        } else {
            return EmptyBorder
        }
    }



    const [NumberSlide, SetNumberSlide] = useState(1)

    useEffect(() => {
        if (currentAccount) {
            getstack(NumberSlide - 1)
        }
    }, [NumberSlide, currentAccount])

    useEffect(() => {
        if (currentAccount) {
            console.log(count)
            allCeles(currentAccount)

        }


    }, [currentAccount])


    async function allCeles(address) {

        let all = await tokenOfOwner(address)
        console.log(all)
        setAllData({ all: 0, Nephilim: 0, Demon: 0, Angel: 0 })
        if (all && count === 0) {

            all.map((item, index) => {
                let data = convertEther(item.celestialType);

                if (data === 1) {
                    setAllData(prevState => ({
                        ...prevState,
                        all: prevState.all + 1,
                        Angel: prevState.Angel + 1,

                    }));
                } else if (data === 2) {
                    setAllData(prevState => ({
                        ...prevState,
                        all: prevState.all + 1,
                        Demon: prevState.Demon + 1,
                    }));
                } else if (data === 3) {
                    setAllData(prevState => ({
                        ...prevState,
                        all: prevState.all + 1,
                        Nephilim: prevState.Nephilim + 1,
                    }));
                }

            })

        }



    }



    async function getstack(pageNumber) {
        console.log(currentAccount)
        console.log(pageNumber)
        let data = await tokenOfOwnerBached(currentAccount, pageNumber);
        console.log(data)
        let Tokens = [];
        let earning = [];
        let guidence = [];
        if (data === undefined) {
            setToken([{ token: 0, celestialType: 0 }, { token: 0, celestialType: 0 }, { token: 0, celestialType: 0 }, { token: 0, celestialType: 0 }])
        } else {




            data.map(async (item, index) => {
                //   let earn= item.tokenId!==0? await earningInfo(item.tokenId):0
                //   console.log(earn)

                // earn: convertEther(item.tokenId)!==0? await convertEther(earningInfo([convertEther(item.tokenId)])):undefined
                let row = { token: convertEther(item.tokenId), celestialType: convertEther(item.celestialType) };
                Tokens.push(row)

            })

            const now = parseInt(Date.now() / 1000);

            earning[0] = Tokens[0].token !== 0 ? parseFloat(convertEarn(await earningInfo([Tokens[0].token]))).toFixed(4) : undefined
            earning[1] = Tokens[1].token !== 0 ? parseFloat(convertEarn(await earningInfo([Tokens[1].token]))).toFixed(4) : undefined
            earning[2] = Tokens[2].token !== 0 ? parseFloat(convertEarn(await earningInfo([Tokens[2].token]))).toFixed(4) : undefined
            earning[3] = Tokens[3].token !== 0 ? parseFloat(convertEarn(await earningInfo([Tokens[3].token]))).toFixed(4) : undefined
            earning[4] = Tokens[4].token !== 0 ? parseFloat(convertEarn(await earningInfo([Tokens[4].token]))).toFixed(4) : undefined

            guidence[0] = Tokens[0].token !== 0 ? convertEther(await getCooldown([Tokens[0].token])) - now : undefined
            // guidence[0]=Tokens[0].token!==0?new Date(parseFloat(convertEther(await getCooldown([Tokens[0].token]))-now)).getHours() :undefined
            guidence[1] = Tokens[1].token !== 0 ? convertEther(await getCooldown([Tokens[1].token])) - now : undefined
            guidence[2] = Tokens[2].token !== 0 ? convertEther(await getCooldown([Tokens[2].token])) - now : undefined
            guidence[3] = Tokens[3].token !== 0 ? convertEther(await getCooldown([Tokens[3].token])) - now : undefined
            guidence[4] = Tokens[4].token !== 0 ? convertEther(await getCooldown([Tokens[4].token])) - now : undefined


            let newToken = Tokens.map((item, index) => ({ ...item, earn: earning[index], cooldown: guidence[index] }))
            // Unix timestamp in milliseconds
            console.log(now);



            console.log(guidence)
            console.log(newToken)
            setToken(newToken)
        }
    }

    function FuncSlider(data) {
        switch (data) {
            case "LeftArrow":

                SetNumberSlide(prev => (prev > 1 ? prev - 1 : 1))
                break;
            case "RightArrow":

                SetNumberSlide(prev => (prev + 1))
                break;
            default:
            // code block
        }
    }



    const handelAction = async (type, tokenId) => {
        console.log(tokenId)
        console.log(type)
        if (type === "start Guiding") {
            console.log("start Guiding")
            await startEarning(tokenId)
            getstack(NumberSlide - 1)
        } else if (type === "Claim Souls") {
            console.log("Claim Souls")
            await claim(tokenId)
            getstack(NumberSlide - 1)
        } else if (type === "Un Stake") {
            console.log("Un Stack")
            await unstake(tokenId)
            getstack(NumberSlide - 1)
        }
    }


    const handelStack = async (tokenId) => {
        console.log(tokenId)
        // await Stakenft(tokenId)
        await getstack(NumberSlide - 1)

    }
    const convertHour = (timeStamp)  => {
        //var d = cooldown.getDay() - now.getDay();
        var h = parseInt(timeStamp / 60 / 60)
        var m = parseInt((timeStamp - (h * 60 * 60))/60);
        return (h + "hour" + m + "min" )
    }


    // const [Data , SetData] = useState(DataSlider1)


    let BtnBottomSlider = [
        {
            img: ButtonBlackWider,
            text: "start Guiding",
            width: "90%",
            key: 0
        },
        {
            img: ButtonBlackWide,
            text: "Claim Souls",
            width: "70%",
            key: 1
        },
        {
            img: ButtonBlack,
            text: "Un Stake",
            width: "60%",
            key: 2
        }
    ]

    console.log("tokens")
    console.log(tokens)
    return (
        <div className="text-white" style={{ paddingBottom: "200px" }}>
            <div className="w-100 d-flex flex-column align-items-end TextUnderMenuStake ">
                <span>Total Celestials Staked : {AllData.all}</span>
                <span>Total Nephilims Staked : {AllData.Nephilim}</span>
                <span>Total Demons Staked : {AllData.Demon}</span>
                <span>Total Angels Staked : {AllData.Angel}</span>
            </div>

            <div className="d-flex flex-row align-items-center TopSliderStake text-white">
                <span style={{ marginRight: "20px", fontFamily: "Evil_Bible" }}>Page: </span>
                <div className="ArrowImgSliderStake" onClick={() => FuncSlider("LeftArrow")}>
                    <img src={ArrowLeft} alt={ArrowLeft} width="100%" height="100%" />
                </div>
                <div className="position-relative BorderImgSliderStake" style={{ marginRight: "20px", marginLeft: "20px" }}>
                    <img src={picBorder} alt={picBorder} width="100%" height="100%" />
                    <span className='centered-axis-xy'>{NumberSlide}</span>
                </div>

                <div className="ArrowImgSliderStake " onClick={() => FuncSlider("RightArrow")}>
                    <img src={ArrowRight} alt={ArrowRight} width="100%" height="100%" />
                </div>
            </div>


            <div className="w-100 d-flex flex-row justify-content-between flex-wrap align-items-Mobile-center" style={{ marginTop: "20px" }}>
                {
                    tokens.map((item, index) =>

                        <div className="d-flex flex-column itemsSlider textUnderSliderStake">
                            <div className="w-100 h-100 position-relative">
                                {
                                    item.token !== 0 ? <img src={axURL + item.token + '.png'} alt={index} className='bottom-axis-y object-fit-contain' width="90%" height="90%" />
                                        : <div className='centered-axis-xy object-fit-contain' style={{ width: "96%", height: "98%", backgroundColor: "black", opacity: "0.4" }} />
                                }
                                <img src={converbgType(item.celestialType)} alt={item.celestialType} width="100%" height="100%" />


                            </div>
                            <div className="BtnUnderSliderStake">

                                {
                                    item.token !== 0 ?
                                        <>
                                            <div className="d-flex justify-content-center align-items-end textSoulsSliderStake">
                                                <span>{item.earn}</span>
                                                <img src={soul} alt="Blue" />
                                            </div>
                                            {
                                                BtnBottomSlider.map((btn, iterate) =>
                                                    <div className='position-relative d-flex flex-center' onClick={() => handelAction(btn.text, item.token)}
                                                        style={{ width: btn.width }}
                                                        key={btn.key}>
                                                        <img src={btn.img} alt="Blue" width="100%" height="100%" />
                                                        <span className='centered-axis-xy'>{iterate === 0 ? item.cooldown > 0 ? convertHour(item.cooldown) : btn.text : btn.text}</span>
                                                    </div>
                                                )
                                            }
                                        </>
                                        : ""
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default StackMenu