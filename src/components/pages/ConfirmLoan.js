import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import AssuredLogo from "../../images/assured_logo.png"
import LoadingIcon from "../../images/loading_icon.svg"
import axios from "axios"

import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

import CurrencyFormat from 'react-currency-format';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'



function Main() {


    let history = useHistory();

    const [userName, setUserName] = useState();
    const [acctNumber, setAccountNumber] = useState();
    const [bank, setBank] = useState();
    const [employer, setEmployer] = useState();
    const [amount, setAmount] = useState();
    const [phone, setPhone] = useState();
    const [duration, setDuration] = useState();


    useEffect(() => {
        setUserName(localStorage.getItem('user_name'))
        setAccountNumber(localStorage.getItem('account_num'))
        setBank(localStorage.getItem('bank'))
        setEmployer(localStorage.getItem('company'))
        setAmount(localStorage.getItem('amount'))
        setPhone(localStorage.getItem('phone'))
        setDuration(localStorage.getItem('duration'))
    }, []);


    const handlePaymentDisbursement = e => {
        e.preventDefault();

        document.getElementById("loading_animation_confirm").style.display = "block"
        document.getElementById("hideConfirmDets__").style.display = "none"

        const data = {
            name: userName,
            account_number: acctNumber,
            employer: employer,
            bank: bank,
            phone: phone,
            amount: amount,
            duration: duration
        }


        axios.post('https://libertyussd.com/api/web/payment_disburse/', data)
            .then(
                response => {
                    console.log(response)
                    document.getElementById("loading_animation_confirm").style.display = "none"

                    Swal.fire({
                        title: 'Success',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'Okay'

                    })

                    history.push("/loan_disbursed")
                }).catch(error => {
                    console.log(error)
                    document.getElementById("loading_animation_confirm").style.display = "none"
                    history.push("/customersupport")
                })
    }


    const amountNumberFormat = (value) =>
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'NGN'
        }).format(value);



    return (
        <>
            <div id="container_main_confirm">
                {/* PAYOUT container loader */}
                {/* loading screen */}
                <div id="loading_animation_confirm">
                    <div className="loading_container_confirm">
                        <img src={LoadingIcon} alt="icon" />
                        <p>Please wait confirming details........</p>
                    </div>
                </div>
                {/*end loading screen */}
                {/* PAYOUT container loader */}
                <div className="container_wrapper_confirm">

                    <AnimationOnScroll duration={1} animateIn="animate__bounceIn">
                        <div className="form_container_confirm">
                            <div className="form_container_header_confirm">
                                <h2>Confirm you loan data</h2>
                                <img src={AssuredLogo} alt="logo" />
                            </div>

                            <form id="form">
                                <div className="form_wrapper">
                                    <div className="input_container_confirm">
                                        <p>Name</p>
                                        <input
                                            type="text"
                                            placeholder="Enter Name"
                                            value={userName}
                                            readOnly />
                                    </div>
                                    <div className="input_container_confirm move">
                                        <p>Account Number</p>
                                        <input
                                            type="text"
                                            placeholder="Account Number"
                                            value={acctNumber}
                                            readOnly />
                                    </div>

                                </div>
                                <div className="form_wrapper">
                                    <div className="input_container_confirm">
                                        <p>Bank</p>
                                        <input
                                            type="text"
                                            className="form_"
                                            placeholder="Bank"
                                            value={bank}
                                            readOnly />
                                    </div>
                                    <div className="input_container_confirm move">
                                        <p>Employer</p>
                                        <input
                                            type="text"
                                            placeholder="Employer"
                                            value={employer}
                                            readOnly />
                                    </div>
                                    <input
                                        type="hidden"
                                        placeholder="Phone"
                                        value={phone}
                                        readOnly />
                                </div>
                                <div className="form_wrapper">


                                </div>
                            </form>


                            <div className="loan_amount_summary">
                                <p>Loan Amount</p>
                                <span><CurrencyFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'NGN '} /></span>
                                <p>Loan tenure: {duration} Months</p>
                            </div>

                            <div className="button_cont_loan">
                                <h2><i class="fas fa-undo-alt"></i> Back</h2>
                                <button id="hideConfirmDets__" onClick={handlePaymentDisbursement}>CONFIRM DETAILS</button>
                            </div>
                        </div>
                    </AnimationOnScroll>

                    <div className="image_container_loan">

                    </div>

                </div>
                <footer className="footer">
                    <p> copyright &copy;2022, Liberty Assured, All rights reserved.</p>
                </footer>
            </div>

        </>
    );
}

export default Main;