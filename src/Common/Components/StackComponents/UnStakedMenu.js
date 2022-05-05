import ArrowLeft from "./../../../Common/static/Buttons/ButtonPrevious.png";
import ArrowRight from "./../../../Common/static/Buttons/ButtonNext.png";
import picBorder from "./../../../Common/static/border/PageBorder.png";
import nftBorder from "./../../../Common/static/border/nftBorder.png";
import MiniAngel from "./../../../Common/static/mint/MiniAngel.png";
import AngelBorder from "./../../../Common/static/border/AngelBorder.png";
import DemonBorder from "./../../../Common/static/border/DemonBorder.png";
import EmptyBorder from "./../../../Common/static/border/EmptyBorder.png";
import NephilimBorder from "./../../../Common/static/border/NephilimBorder.png";
import ButtonBlack from "./../../../Common/static/Buttons/ButtonBlack.png";
import MiniDemon from "../../static/mint/MiniDemon.png";
import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { TransactionContext } from "../../../context/TransactionContext";
import { axURL, CorrectValue } from "./../../../utils/constants";

function UnStackMenu() {
  const { bachedCelestialsOfOwner, currentAccount, Stakenft, CelestialsOfOwner } = useContext(TransactionContext);

  let [tokens, setToken] = useState([]);
  let [count, setCount] = useState(0);
  let [AllUStack, setAllUStack] = useState(null);
  let [AllData, setAllData] = useState({ all: 0, Nephilim: 0, Demon: 0, Angel: 0 });
  const convertEther = (data) => ethers.utils.formatEther(data) * 10 ** 18;
  const converbgType = (data) => {
    if (data === 1) {
      return AngelBorder;
    } else if (data === 2) {
      return DemonBorder;
    } else if (data === 3) {
      return NephilimBorder;
    } else {
      return EmptyBorder;
    }
  };

  const [NumberSlide, SetNumberSlide] = useState(1);

  useEffect(() => {
    if (AllUStack) {
      getUnstack(NumberSlide);
    }
  }, [NumberSlide, AllUStack]);

  useEffect(() => {
    if (currentAccount) {
      console.log(count);
      allCeles(currentAccount);
    }
  }, [currentAccount]);

  async function allCeles(address) {
    let all = await CelestialsOfOwner(address);
    console.log(all);
    setAllUStack(all);

    setAllData({ all: 0, Nephilim: 0, Demon: 0, Angel: 0 });
    if (all && count === 0) {
      all.map((item, index) => {
        let data = convertEther(item.celestialType);

        if (data === 1) {
          setAllData((prevState) => ({
            ...prevState,
            all: prevState.all + 1,
            Angel: prevState.Angel + 1,
          }));
        } else if (data === 2) {
          setAllData((prevState) => ({
            ...prevState,
            all: prevState.all + 1,
            Demon: prevState.Demon + 1,
          }));
        } else if (data === 3) {
          setAllData((prevState) => ({
            ...prevState,
            all: prevState.all + 1,
            Nephilim: prevState.Nephilim + 1,
          }));
        }
      });
    }
  }

  async function getUnstack(pageNumber) {
    let earning = [];
    let guidence = [];
    let Tokens = [
      { token: 0, celestialType: 0 },
      { token: 0, celestialType: 0 },
      { token: 0, celestialType: 0 },
      { token: 0, celestialType: 0 },
      { token: 0, celestialType: 0 },
    ];

    if (AllUStack === undefined) {
      setToken([
        { token: 0, celestialType: 0 },
        { token: 0, celestialType: 0 },
        { token: 0, celestialType: 0 },
        { token: 0, celestialType: 0 },
        { token: 0, celestialType: 0 },
      ]);
    } else {
      for (let i = (pageNumber - 1) * 5; i < pageNumber * 5; i++) {
        console.log(i);
        if (AllUStack[i]) {
          let item = AllUStack[i];
          console.log("***********item******************");
          console.log(item);

          let value = CorrectValue(convertEther(item.tokenId));
          let row = { token: value, celestialType: convertEther(item.celestialType) };
          Tokens[i - (pageNumber - 1) * 5] = row;
        }
      }

      // let data = await bachedCelestialsOfOwner(currentAccount, pageNumber);
      // console.log(data)
      // if(data===undefined){
      //     setToken([ { token: 0, celestialType: 0 },{ token: 0, celestialType: 0 },{ token: 0, celestialType: 0 },{ token: 0, celestialType: 0 }])
      // }else{
      //       let Tokens = [];
      // data.map((item, index) => {
      //     let row = { token: Math.ceil(convertEther(item.tokenId)), celestialType: convertEther(item.celestialType) };
      //     Tokens.push(row)
      // })
      // console.log(Tokens)

      setToken(Tokens);
    }
  }

  function FuncSlider(data) {
    switch (data) {
      case "LeftArrow":
        SetNumberSlide((prev) => (prev > 1 ? prev - 1 : 1));
        break;
      case "RightArrow":
        //AllUStack[(NumberSlide)*5]
        if (true) {
          SetNumberSlide((prev) => prev + 1);
        }

        break;
      default:
      // code block
    }
  }

  const handelStack = async (tokenId) => {
    console.log(tokenId);
    await Stakenft(tokenId);
    await getUnstack(NumberSlide - 1);
  };

  return (
    <div className="text-white" style={{ paddingBottom: "400px" }}>
      <div className="w-100 d-flex flex-column align-items-end TextUnderMenuStake ">
        <span>Total Celestials Un-Staked : {AllData.all}</span>
        <span>Total Nephilims Un-Staked : {AllData.Nephilim}</span>
        <span>Total Demons Un-Staked : {AllData.Demon}</span>
        <span>Total Angels Un-Staked : {AllData.Angel}</span>
      </div>

      <div className="d-flex flex-row align-items-center TopSliderStake text-white">
        <span style={{ marginRight: "20px", fontFamily: "Evil_Bible" }}>Page: </span>
        <div className="ArrowImgSliderStake " onClick={() => FuncSlider("LeftArrow")}>
          <img src={ArrowLeft} alt={ArrowLeft} width="100%" height="100%" />
        </div>

        <div className="position-relative BorderImgSliderStake" style={{ marginRight: "20px", marginLeft: "20px" }}>
          <img src={picBorder} alt={picBorder} width="100%" height="100%" />
          <span className="centered-axis-xy">{NumberSlide}</span>
        </div>
        <div className="ArrowImgSliderStake " onClick={() => FuncSlider("RightArrow")}>
          <img src={ArrowRight} alt={ArrowRight} width="100%" height="100%" />
        </div>
      </div>

      <div
        className="w-100 d-flex flex-row justify-content-between flex-wrap align-items-Mobile-center"
        style={{ marginTop: "20px" }}
      >
        {tokens.map((item, index) => (
          <div className="d-flex flex-column itemsSlider textUnderSliderStake">
            <div className="w-100 h-100 position-relative">
              {item.token !== 0 ? (
                <img
                  src={axURL + item.token + ".png"}
                  alt={index}
                  className="bottom-axis-y object-fit-contain"
                  width="90%"
                  height="90%"
                />
              ) : (
                <div
                  className="centered-axis-xy object-fit-contain"
                  style={{ width: "96%", height: "98%", backgroundColor: "black", opacity: "0.4" }}
                />
              )}
              <img src={converbgType(item.celestialType)} alt={item.bg} width="100%" height="100%" />
              {/* src={axURL+item.token+'.png'} */}
            </div>
            <div className="BtnUnderSliderStake">
              <div className="BtnUnderSliderStake">
                {item.token !== 0 && (
                  <div
                    className="position-relative d-flex flex-center"
                    style={{ width: "70%", marginTop: "20px" }}
                    onClick={() => handelStack(item.token)}
                  >
                    <img src={ButtonBlack} alt="Blue" width="100%" height="100%" />
                    <span className="centered-axis-xy">Stake</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default UnStackMenu;
