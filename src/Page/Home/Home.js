import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { pageName } from "../../utility/Conts"
import { TransactionContext } from "../../context/TransactionContext";
import { shortenAddress } from './../../utils/shortenAddress';
import ax from './../../Common/static/PureSoul.png'
import { nFormatter } from "../../utility/LocalStorageHelper";

const ImgSocialMedia = ({ to, hoverImg, mainImg }) => {
  let [hover, setHover] = useState(false)
  return (
    <a href={to} target="_blank"> <img src={`./static/${hover ? hoverImg : mainImg}`} alt="Steak" width="60px"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    /></a>
  )
}

function Home() {
  let [disabale, setDisable] = useState(true)
  const { currentAccount, connectWallet, getTotalSupply, SoulBalance, soulBalances, isLoading } = useContext(TransactionContext);
  useEffect(() => {
    console.log(currentAccount)
    if (currentAccount && currentAccount !== "No accounts found") {
      setDisable(false)
      SoulBalance()
    }

  }, [currentAccount])


  return (
    <body id="backgroundHome">
      {/* <!-- Main Page --> */}
      <div class="w3-main w3-padding" style={{ height: "90% " }}>
        <div class="w3-row-padding w3-center" style={{ paddingTop: "64px" }}>
          {/* <!-- Wallet Connection --> */}
          <div class="w3-quarter w3-mobile" style={{ width: "30%", position: "relative" }}>
            {
              currentAccount ?
                <div onClick={getTotalSupply} style={{ position: "relative" }}>
                  <img onClick={() => { }} src="./static/Wallet_border.png" alt="Steak" width="100%" />
                  <div className="position-absolute  " style={{ top: "6%", right: "10%", width: "70%" }}>

                    <div className="w-100 d-flex align-content-center  " style={{ justifyContent: "space-between" }} >
                      <span className="ConnectingText d-flex " style={{ alignItems: "center" }}>{shortenAddress(currentAccount)}</span>
                      <div class="position-absolute tokenImg"  >
                          <img src="./static/Tokens.png" alt="Steak" width="100%" />
                        </div>
                      <div className="d-flex flex-column">
                        <span className="ConnectingText">{nFormatter(soulBalances)}</span>
                        <span className="ConnectingText">0</span>
                      </div>
                    </div>



                    {/* <div className="d-flex w-100" style={{ justifyContent: "space-between" }}>
                      <span className="ConnectingText"></span>
                      <div className="position-relative">
                        <div class="position-absolute" style={{ width: "2.2vw", top: "-1vw", left: "3.7vw" }}>
                          <img src="./static/Tokens.png" alt="Steak" width="100%" />
                        </div>
                      </div>


                      <span className="ConnectingText">{nFormatter(soulBalances)}</span>

                    </div>
                    <div className="d-flex w-100" style={{ justifyContent: "space-between" }}>
                      <span className="ConnectingText">{shortenAddress(currentAccount)}</span>
                      <div className="position-relative">

                      </div>
                      <span className="ConnectingText">0</span>

                    </div> */}


                  </div>



                </div>

                :
                <img onClick={connectWallet} src="./static/Metamask.png" alt="Steak" width="100%" />
              //  <img onClick={()=>{}} src="./static/Metamask.png" alt="Steak" width="100%" />
            }

            <div style={{ position: "absolute", left: "3.5%", top: "70%" }}>
              <img src="./static/Bars.png" alt="Steak" style={{ width: "100%" }} />
              <Link to={disabale ? "" : pageName.mint} className={disabale ? "  menuitem-Deactive" : "  menuitem cursor-pointer"} ><p className={"  cursor-pointer"} style={{ position: "absolute", left: "32%", top: "4%" }} className={disabale ? "  menuitem-Deactive" : "menuitemHover  menuitem menuitem cursor-pointer"} >Minting</p></Link>
              <Link to={disabale ? "" : pageName.stack} className={disabale ? "  menuitem-Deactive" : "  menuitem cursor-pointer"} ><p className={"  cursor-pointer"} style={{ position: "absolute", left: "16%", top: "26%" }} className={disabale ? "  menuitem-Deactive" : "menuitemHover  menuitem menuitem cursor-pointer"} >Soul hunt(stake)</p></Link>
              <Link to={disabale ? "" : pageName.mint} className={" menuitem-Deactive"} ><p className={"  cursor-pointer"} style={{ position: "absolute", left: "18%", top: "48%" }} className={"  menuitem-Deactive"}  >Ascension well</p></Link>
              {/* <Link to={disabale ? "" : pageName.mint} className={disabale ? "  menuitem-Deactive" : "  menuitem cursor-pointer"} ><p className={"  cursor-pointer"} style={{ position: "absolute", left: "18%", top: "48%" }} className={disabale ? "  menuitem-Deactive" : " menuitemHover menuitem menuitem cursor-pointer"}  >Ascension well</p></Link> */}
              <a href={"https://cdn.discordapp.com/attachments/954089187366305922/968988338675658782/CelestialVerse_White_Paper_v1.1.pdf"} target="_blank" className={disabale ? "  menuitem-Deactive" : "  menuitem cursor-pointer"} ><p className={"  cursor-pointer"} style={{ position: "absolute", left: "25%", top: "71%" }} className={" menuitemHover menuitem menuitem cursor-pointer"} >White paper </p></a>
            </div>
          </div>
          {/* <!-- Wallet Connection --> */}
          <div class="w3-half w3-mobile mobile-extend" style={{ width: "40%" }}> &nbsp;</div>
          {/* <!-- LOGO --> */}
          <div class="w3-quarter w3-mobile" style={{ width: "30%" }}>
            <img src="./static/SVG Logo.png" alt="Steak" width="100%" />
          </div>
          {/* <!-- LOGO --> */}
        </div>
        <div class="w3-row-padding w3-center" style={{ paddingTop: "12px" }}>
          {/* <!-- Bars --> */}
          <div class="w3-quarter w3-mobile mobile-shrink" style={{ width: "30%" }}>
            {/* <!-- <img src="./static/Bars.png" alt="Steak" width="100%" /> --> */}
            {/* &nbsp */}
          </div>
          {/* <!-- Bars --> */}
          <div class="w3-half w3-mobile" style={{ width: "68%" }}> &nbsp; </div>
          {/* <!-- Announcement --> */}
          <div class="w3-quarter w3-mobile" style={{ width: "30%", position: "relative" }}>
            <img src="./static/announcement board.png" alt="Steak" width="100%" />
            <div style={{ position: "absolute", left: "0px", top: "5px", width: "100%", height: "96%" }}>
              {/* <!-- <marquee
                  class="w3-center"
                  behavior="scroll"
                  direction="up"
                  scrollamount="2"
                  style={{"padding-left: 10px; padding-right: 10px; color: whitesmoke; height: 100%"
                >
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                  Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                  ultricies nec, pellentesque eu, pretium quis, sem.
                </marquee> --> */}
              <p class="w3-center" style={{ paddingTop: "10px", paddingRight: "10px", fontSize: "2vw" }}>
                Look forward for updates!
              </p>
            </div>
          </div>
          {/* <!-- Announcement --> */}
        </div>
      </div>
      {/* <!-- Main Page -->
        <!-- Footer --> */}
      <div class="w3-container w3-center" style={{ height: " 10% !important" }}>
        <div class="w3-quarter w3-mobile" style={{ height: "10px", width: "20%" }}></div>
        <div class="w3-half w3-mobile" style={{ width: " 60%" }}>

          <ImgSocialMedia to={'https://twitter.com/Celestial_Verse'} hoverImg={'TwitterHover.png'} mainImg={'twitter.png'} />
          <ImgSocialMedia to={'https://nftrade.com/'} hoverImg={'NFTradeHover.png'} mainImg={'NFTrade.png'} />
          <ImgSocialMedia to={'https://discord.gg/n5gJskdgdw'} hoverImg={'DiscordHover.png'} mainImg={'discord.png'} />

        </div>
        <div class="w3-quarter w3-mobile" style={{ width: "20%" }}>
          <p class="w3-right" style={{ margin: "0px 0px 0px 0px", color: "yellow", fontSize: "x-large" }}>V1.0</p>
        </div>
      </div>
      {/* <!-- Footer --> */}
    </body>
  )
}
export default Home

