import Blue from './../../Common/static/Buttons/ButtonBlue.png'



function  Stack () {
    return(
        <body id="backgroundStack">
            <div className="d-flex 'position-relative">

                <div className='position-relative  '>
                     <img src={Blue} alt="Blue"/>
                     <span className='position-absolute centered-axis-xy' style={{fontSize:"4vw",color:"#fff"}} >Menu</span>
                  
                </div>
             
                {/* <button style={{backgroundImage: `url(${Blue})`}} className='bg-cover'><p>Menu</p></button> */}
 
            </div>

       </body>
    )
    }
    export default  Stack