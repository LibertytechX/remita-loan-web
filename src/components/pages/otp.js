import React, { useState, useEffect } from 'react'
import {useHistory } from 'react-router-dom';
// import AssuredLogo from "../../images/assured_logo.png"
// import Livechat from "../../components/layout/Livechat"
import otpGif from "../../images/enter_otp.gif"
import axios from "axios"
import LoadingIcon from "../../images/loading_icon.svg"

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'



function Otp() {

    let history = useHistory();

    const [otp, setOTP] = useState(null)
    const [phone, setPhone] = useState(null)
    const [ussdCode, setUssdCode] = useState(null)


    useEffect(() => {
        setPhone(localStorage.getItem('phone'))
        setUssdCode(localStorage.getItem("ussd_code_response"))
    }, [])


    const handleOTP = e => {
        e.preventDefault();

        document.getElementById("loading_animation_otp").style.display = "block"

        const data = {
            code: parseInt(otp),
            phone: phone
        }


        axios.post('https://libertyussd.com/api/web/payout_verify/', data)
            .then(
                response => {
                    console.log(response)
                    document.getElementById("loading_animation_otp").style.display = "none"
                    history.push("/confirm_loan")


                    localStorage.setItem('account_num', response.data.data.account);
                    localStorage.setItem('amount', response.data.data.amount);
                    localStorage.setItem('bank', response.data.data.bank);
                    localStorage.setItem('company', response.data.data.company);
                    localStorage.setItem('user_name', response.data.data.name);
                    localStorage.setItem('duration', response.data.data.duration);

                }).catch(error => {
                    console.log(error)
                    document.getElementById("loading_animation_otp").style.display = "none"
                    Swal.fire({
                        title: 'Error!',
                        text: error.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'Okay'

                    })
                })
    }

    const handleResendOtp = e => {
        e.preventDefault();

        document.getElementById("loading_animation_otp").style.display = "block"

        const data = {
            phone: phone
        }


        axios.post('https://libertyussd.com/api/web/resend_otp/', data)
            .then(
                response => {
                    console.log(response)
                    document.getElementById("loading_animation_otp").style.display = "none"

                }).catch(error => {
                    console.log(error)
                    document.getElementById("loading_animation_otp").style.display = "none"
                    Swal.fire({
                        title: 'Error!',
                        text: error.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'Okay'

                    })
                })
    }




    return (
        <>
            {/* <Livechat /> */}
            <div id="container_main_otp">

                {/* PAYOUT container loader */}
                {/* loading screen */}
                <div id="loading_animation_otp">
                    <div className="loading_container_otp">
                        <img src={LoadingIcon} alt="icon" />
                        <p>Verifying Otp........</p>
                    </div>
                </div>
                {/*end loading screen */}
                {/* PAYOUT container loader */}

                <div className="container_wrapper_otp">
                    <div className="otp_content">
                        <div className="otp_form">
                            <h2>Enter verification code</h2>
                           
                            <p>Dial the USSD code with your registered phone number <br/> to get verification Code  </p>
                            <h2 style={{fontSize: "30px"}}>{ussdCode}</h2>
                            <input type="number" name="" className="otp_input" onChange={e => parseInt(setOTP(e.target.value))} />
                            <input type="hidden" name="" className="number_input" onChange={e => setPhone(e.target.value)} />

                            {/* <h6 onClick={handleResendOtp}>Resend code</h6> */}

                            <button onClick={handleOTP}>Verify</button>

                            <div className="return_section">
                                <a href="/"><i class="fas fa-undo-alt"></i> Back</a>
                            </div>
                        </div>
                        <div className="otp_image">
                            <img src={otpGif} alt="loading gif" />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Otp;