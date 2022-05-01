import ProgressMenu from "../../../src/Common/Components/StackComponents/ProgressMenu"
import StakedMenu from "../../../src/Common/Components/StackComponents/StakedMenu"
import UnStakedMenu from "../../Common/Components/StackComponents/UnStakedMenu"
import Blue from './../../Common/static/Buttons/ButtonBlue.png'
import redNoSelect from './../../Common/static/Buttons/ButtonRedOff.png'
import redSelect from './../../Common/static/Buttons/ButtonRedOn.png'
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
function Stack() {
    const [ActivatedCm, SetActivatedCm] = useState("Un-Staked")
    const navigate = useNavigate();
    let DataArray = [
        {
            bgImg: Blue,
            text: "Menu"
        },
        {
            bgImg: ActivatedCm === "Staked" ? redSelect : redNoSelect,
            text: "Staked"
        },
        {
            bgImg: ActivatedCm === "Un-Staked" ? redSelect : redNoSelect,
            text: "Un-Staked"
        },
        {
            bgImg: ActivatedCm === "Progress" ? redSelect : redNoSelect,
            text: "Progress"
        }

    ]
    return (
        <div id="backgroundStack">  
            <div className="d-flex menuStake">
                {
                    DataArray.map((item) =>
                        <div className='MenuItemBtn'
                             onClick={() => item.text !== "Menu" ? SetActivatedCm(item.text) : navigate('/')}>
                            <img src={item.bgImg} alt="Blue" width="100%"/>
                            <span className='centered-axis-xy'>{item.text}</span>
                        </div>
                    )
                }
            </div>

            <div style={{padding: "0 20px 0 20px"}}>
                {ActivatedCm === "Staked" && (<StakedMenu/>)}
                {ActivatedCm === "Un-Staked" && (<UnStakedMenu/>)}
                {ActivatedCm === "Progress" && (<ProgressMenu/>)}
            </div>

        </div>
    )
}

export default Stack