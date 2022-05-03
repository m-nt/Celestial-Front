function ProgressMenu() {


    return (
        <div className="ProgressMenu text-white " style={{paddingBottom:"200px" , paddingTop:"50px"}}>

            <div className="itemProgressMenu">
                <span className="TitleProgressMenu">Mint</span>
                <div className="descProgressMenu d-flex justify-content-center">
                    <span> Geno mint: 0/10,000</span>
                    <span>Angels minted: 0/8,000</span>
                    <span>Demons minted: 0/1950</span>
                    <span>Nephilims minted: 0/50</span>
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
                    <span>$Soul minted: 0/95,000,000</span>
                </div>


                <div className="descProgressMenu d-flex justify-content-center">
                    <span className="TitleProgressMenu flex-center">Part2:</span>
                    <span>$Soul minted: 0/200,000,000</span>
                    <span>$Ses minted: 0/250,000</span>
                </div>
            </div>

            <div className="itemProgressMenu testJustify" >
                <span className="TitleProgressMenu">Staked</span>

                <div className="descProgressMenu d-flex justify-content-center">
                    <span>Total Angels Staked : 0</span>
                    <span>Total Demons Staked : 0</span>
                    <span>Total Nephilims Staked : 0</span>
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
    )
}

export default ProgressMenu