import { useEffect, useContext, useState } from "react";
import { TransactionContext } from "../../../context/TransactionContext";
import { CorrectValue } from "../../../utils/constants";
function ProgressMenu() {
  const { currentAccount, Progress } = useContext(TransactionContext);
  const [progressRow, setProgressRow] = useState({
    MintGen0: 0,
    SoulMint: 0,
    totalAngleStaked: 0,
    totalDemonStaked: 0,
    totalNephilimStaked: 0,
    AngelsMinted: 0,
    DemonsMinted: 0,
    NephilimsMinted: 0,
    totalStaked: 0,
  });
  useEffect(() => {
    if (currentAccount) {
      getProgress();
    }
    async function getProgress() {
      let progress = await Progress();
      console.log(progress);
      setProgressRow(progress);
      return progress;
    }
  }, [currentAccount]);
  return (
    <div className="ProgressMenu text-white " style={{ paddingBottom: "200px", paddingTop: "50px" }}>
      <div className="itemProgressMenu">
        <span className="TitleProgressMenu">Mint</span>
        <div className="descProgressMenu d-flex justify-content-center">
          <span> Gen0 mint: {CorrectValue(progressRow.MintGen0).toLocaleString()}/10,000</span>
          <span>Angels minted: {CorrectValue(progressRow.AngelsMinted).toLocaleString()}/8,000</span>
          <span>Demons minted: {CorrectValue(progressRow.DemonsMinted).toLocaleString()}/1950</span>
          <span>Nephilims minted: {CorrectValue(progressRow.NephilimsMinted).toLocaleString()}/50</span>
        </div>
        <div className="descProgressMenu d-flex justify-content-center">
          <span>Gen1 mint: 0/15,000</span>
          <span>Angels minted: 0/12,500</span>
          <span>Demonst minted: 0/2,500</span>
        </div>
        <div className="descProgressMenu d-flex justify-content-center">
          <span>Artifacts minted: 0/8050</span>
          <span>Relics minted: 0/2000</span>
        </div>
      </div>

      <div className="itemProgressMenu">
        <span className="TitleProgressMenu">Tokens</span>

        <div className="descProgressMenu d-flex justify-content-center">
          <span>Total $Soul: 400,000,000</span>
          <span>Total $Ses: 255,000</span>
        </div>

        <div className="descProgressMenu d-flex justify-content-center">
          <span className="TitleProgressMenu flex-center  ">Part1:</span>
          <span style={{ textAlign: "center" }}>
            $Soul minted:{"\n"}
            {CorrectValue(progressRow.SoulMint).toLocaleString()}/100,000,000
          </span>
        </div>

        <div className="descProgressMenu d-flex justify-content-center">
          <span className="TitleProgressMenu flex-center">Part2:</span>
          <span style={{ textAlign: "center" }}>$Soul minted: 0/200,000,000</span>
          <span>$Ses minted: 0/250,000</span>
        </div>
      </div>

      <div className="itemProgressMenu testJustify">
        <span className="TitleProgressMenu">Staked</span>

        <div className="descProgressMenu d-flex justify-content-center">
          <span>Total Angels Staked : {CorrectValue(progressRow.totalAngleStaked).toLocaleString()}</span>
          <span>Total Demons Staked : {CorrectValue(progressRow.totalDemonStaked).toLocaleString()}</span>
          <span>Total Nephilims Staked : {CorrectValue(progressRow.totalNephilimStaked).toLocaleString()}</span>
        </div>

        <div className="descProgressMenu d-flex justify-content-center">
          <span>artifacts equipped: 0</span>
          <span>Relics equipped: 0</span>
        </div>
        <div className="descProgressMenu d-flex justify-content-center">
          {/* <span>artifacts equipped: 0</span> */}
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default ProgressMenu;
