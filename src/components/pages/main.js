import React, { useState } from "react";

import { useHistory } from 'react-router-dom';

import CurrencyFormat from 'react-currency-format';
import axios from 'axios'
import AssuredLogo from "../../images/assured_logo.png"
import LoadingIcon from "../../images/loading_icon.svg"

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'


function Main() {

    var CurrencyFormat = require('react-currency-format');

    let history = useHistory();


    const [phoneNumber, setPhoneNumber] = useState(null)
    const [emailAddress, setEmailAddress] = useState(null)


    // // GET USER DETAILS
    let [dur, setDur] = useState(0)
    const [loanFee, setLoanFee] = useState(0)
    const [amount, setAmount] = useState(0.0)
    const [duration, setDuration] = useState(null);
    const minimumAmount = 3000

    const handleSelectDuration = (event) => {
        setDur(event.target.value);
    }

    const submitConsentHandler = e => {
        e.preventDefault();

        const data = {
            phone: phoneNumber,
            // email: emailAddress
        }

        document.getElementById("loading_animation").style.display = "block";

        // console.log(data);

        axios.post('https://libertyussd.com/api/web/index/web/', data)
            .then(
                response => {
                    // const dur = response.data.data
                    document.getElementById("loading_animation").style.display = "none";
                    console.log(response.data.data)

                    setDuration(response.data.data)
                    setLoanFee(response.data.loan_fee)




                    // dur.map(
                    //     (info) => {
                    //         console.log(`This is the needed data:  ${info.duration}`)
                    //         console.log(info.duration)
                    //     }
                    // )

                    console.log(duration)

                    // document.getElementById("container_main_loan").style.display = "block";

                    document.getElementById("consent_modal_container").style.display = "block";



                    localStorage.setItem('oneMonth', response.data.data[0]);
                    localStorage.setItem('twoMonth', response.data.two_month);
                    localStorage.setItem('phone', response.data.phone);
                    localStorage.setItem('loan_fee', response.data.loan_fee);

                }).catch(error => {
                    console.log(error)
                    document.getElementById("loading_animation").style.display = "none";

                    Swal.fire({
                        title: 'Error!',
                        text: error.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'Okay'

                    })

                    // Swal.fire({
                    //     title: 'Error!',
                    //     text: 'Sorry, service is down currently please try again later',
                    //     icon: 'error',
                    //     confirmButtonText: 'Okay'

                    // })
                })
    }

    const showProcessLoanScreen = e => {
        document.getElementById("container_main_loan").style.display = "block";
        document.getElementById("consent_modal_container").style.display = "none";
    }

    const exitModal = e => {
        document.getElementById("consent_modal_container").style.display = "none";
        document.getElementById("session_decline").style.display = "none";
    }

    const openNoticeSessionModal = e => {
        document.getElementById("session_decline").style.display = "block";
    }




    const handleSessionClose = e => {

        window.location.reload();

        document.getElementById("session_decline").style.display = "none";

        const data = {
            phone: phoneNumber
        }

        axios.post('https://libertyussd.com/api/web/session_decline/', data)
            .then(
                response => {
                    console.log(response)
                    document.getElementById("loading_animation_payout").style.display = "none"

                }).catch(error => {
                    console.log(error)

                    document.getElementById("loading_animation_payout").style.display = "none"


                })

    }



    const monthlyDurationValueExtr = (dur, duration) => {
        if (dur == 0) {
            dur = duration[0].duration

            console.log(dur)
            return dur
        }
        else {
            console.log(dur)
            return dur
        }
    }
    let limitExtractor = (monthlyDurationValueExtr, duration) => {
        let value = 0

        if (duration != null && monthlyDurationValueExtr >= 0) {

            let obj = duration.find(obj => obj.duration == monthlyDurationValueExtr)
            console.log(`the amount limit is ${obj.amount}`)
            return value = obj.amount
        }

        return value
    }

    let setter = (event, limit) => {
        console.log(`This is the input value ${limit}`)
        const amount = parseFloat(event)
        limit = parseFloat(limit)
        if (amount >= 3000 && amount <= limit) {
            document.getElementById("testing").innerHTML = ""
            document.getElementById("hidePayoutFirstClick").style.display = "block";

            return setAmount(amount)
        }


        else {
            if (amount < minimumAmount) {
                console.log("Error minimum")
                document.getElementById("testing").innerHTML =
                    `Sorry minimum amount is ${minimumAmount} for ${dur} months`
                document.getElementById("hidePayoutFirstClick").style.display = "none";
            }
            if (amount > limit) {
                console.log("Error maximum")
                document.getElementById("testing").innerHTML =
                    `Sorry you have exceeded the maximum amount ${limit} for ${dur} months`
                document.getElementById("hidePayoutFirstClick").style.display = "none";
            }
            return setAmount(0)

        }

    }

    let totalPayment = (monthlyDurationValueExtr, duration, amount) => {
        let rate = 0
        amount = parseFloat(amount)
        if (duration != null) {

            let obj = duration.find(obj => obj.duration == monthlyDurationValueExtr(dur, duration))
            rate = obj.interest * parseInt(dur)
            console.log(`Code entered here ${dur}`)
            console.log(`Code entered here ${amount * (rate / 100)}`)
        }

        const totalRepay = amount == null || amount == 0 ? 0 : amount + (amount * (rate / 100))

        return totalRepay
    }

    const monthly_repayment = duration == null ? 0 : parseFloat(totalPayment(monthlyDurationValueExtr, duration, amount)) / parseInt(monthlyDurationValueExtr(dur, duration))

    const amountNumberFormat = (value) =>
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'NGN'
        }).format(value);

    // const amountGrabber = (event, limit) => {
    //     limit = parseFloat(limit)
    //     const value = 0
    //     if (value >= 3000 && value <= limit) {
    //         value = parseFloat(event)

    //     }
    //     return value
    // }

    const handleSubmitPayout = (e) => {
        e.preventDefault();

        document.getElementById("hidePayoutFirstClick").style.display = "none"

        document.getElementById("loading_animation_payout").style.display = "block"

        console.log(`This are the api values duration:${dur},
         selected amount: ${amount}, phone: ${phoneNumber}`);


        const data = {
            phone: phoneNumber,
            amount: amount,
            duration: dur
        }

        axios.post('https://libertyussd.com/api/web/payout/', data)
            .then(
                response => {
                    // ASHAMED OF THIS SO IM GONNA COME BACK TO M<AKE THIS BETTER
                    const responseQuestionsString = JSON.stringify(response);
                    // Save the response JSON string to local storage
                    console.log(responseQuestionsString,"kdmsfkl")
                    localStorage.setItem('responseQuestions', responseQuestionsString);

                    console.log(response)
                    document.getElementById("loading_animation_payout").style.display = "none"
                    document.getElementById("hidePayoutFirstClick").style.display = "none"

                    history.push("/verify-question")

                }).catch(error => {
                    console.log(error)

                    document.getElementById("loading_animation_payout").style.display = "none"
                    document.getElementById("hidePayoutFirstClick").style.display = "block "

                })
    }

    console.log(`This is the log ${duration}`)

    return (
        <>

            {/* LOAN SECTION */}
            <div id="container_main_loan">

                {/* PAYOUT container loader */}
                {/* loading screen */}
                <div id="loading_animation_payout">
                    <div className="loading_container_payout">
                        <img src={LoadingIcon} alt="Logo" />
                        <p>Processing Loan........</p>
                    </div>
                </div>
                {/*end loading screen */}
                {/* PAYOUT container loader */}

                <div className="container_wrapper_loan">
                    <div className="form_container_loan">
                        <div className="form_container_header">
                            <h2>Loan eligibility</h2>
                            <img src={AssuredLogo} alt="logo" />
                        </div>

                        <div class="responsive_container">
                            <div className="intro_text">
                                {duration == null ? <p><i class="fas fa-check-circle"></i> <span></span></p> : duration.map((info) => <p><i class="fas fa-check-circle"></i> <span>Up to {info.duration} month - <CurrencyFormat value={info.amount} displayType={'text'} thousandSeparator={true} prefix={'NGN '} /></span></p>)}
                            </div>

                            <form id="form" onSubmit={handleSubmitPayout}>
                                <div className="form_wrapper">
                                    <div className="input_container">
                                        <p>Enter loan amount</p>
                                        <input type="number"
                                            placeholder="Loan amount"
                                            // onKeyUp={}
                                            onChange={e =>
                                                setter(e.target.value, limitExtractor(monthlyDurationValueExtr(dur, duration), duration))
                                            }
                                        />
                                        <h6 id="testing">

                                        </h6>
                                    </div>


                                    <div className="input_container move">
                                        <p>Choose loan tenure</p>
                                        <select onChange={handleSelectDuration}>
                                            <option>Please select month</option>
                                            {duration == null ? <option>Loading</option> : duration.map((info) => <option value={info.duration}>{info.duration} month</option>)}
                                        </select>
                                    </div>
                                </div>


                                <div className="origination_fees">
                                    <h4>Origination fees - {loanFee}</h4>
                                    <h4 className="move">Loan amount receivable - <CurrencyFormat value={(amount == null || amount == 0) || (amount == 3000 && amount == 200000) ? 0 : amount - parseInt(loanFee)} displayType={'text'} thousandSeparator={true} prefix={'NGN '} /></h4>

                                </div>

                                <div className="payments_info">
                                    <h2>Your Payment Details</h2>
                                    <div className="payment_container">
                                        <div className="total_amount">
                                            <p>Total Repayment</p>
                                            <h1 id="update"> <CurrencyFormat value={totalPayment(monthlyDurationValueExtr, duration, amount)} displayType={'text'} thousandSeparator={true} prefix={'NGN '} /> </h1>
                                        </div>

                                        <div className="principal_amt_intrest">
                                            <div className="total_amount">
                                                <p>Monthly Repayment</p>
                                                <h6><CurrencyFormat value={parseFloat(monthly_repayment)} displayType={'text'} thousandSeparator={true} prefix={'NGN '} decimalScale={0} /></h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="button_cont_loan">
                                    {/* <h2><i class="fas fa-undo-alt"></i> Back</h2> */}

                                    <div className="button_cont_accept_decline">
                                        <a href="#" onClick={openNoticeSessionModal} className="decline_btn">Decline</a>
                                        <input id="hidePayoutFirstClick" className="accept_btn" type="submit" value="Accept" />
                                    </div>
                                </div>
                            </form>

                        </div>

                    </div>
                    <div className="image_container_loan">

                    </div>
                </div>
            </div>
            {/*END LOAN SECTION */}


            {/* session Decline modal */}
            <div id="session_decline">
                <div class="session_modal_wrapper">
                    <div class="session_modal_card">
                        <div class="logo_consent">
                            <img src={AssuredLogo} alt="logo" />
                        </div>
                        <div class="content_session">
                            <div class="content_session_card">
                                <h1>Note</h1>
                                <p>Are you sure you want to cancel</p>

                                <div className="consent_button_container">
                                    <button class="yes" onClick={handleSessionClose}>Yes</button>
                                    <button class="no" onClick={exitModal}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*END session Decline modal */}


            <div id="container_main">

                {/* main container loader */}
                {/* loading screen */}
                <div id="loading_animation">
                    <div className="loading_container">
                        <img src={LoadingIcon} />
                        <p>Loading........</p>
                    </div>
                </div>
                {/*end loading screen */}
                {/* main container loader */}

                {/* CONSENT MODAL */}
                <div id="consent_modal_container">
                    <div class="consent_modal_wrapper">
                        <div class="consent_modal_card">
                            <div class="logo_consent">
                                <img src={AssuredLogo} alt="logo" />
                            </div>
                            <div class="content_consent">
                                <div class="content_consent_card">
                                    <h1>Note</h1>
                                    <p><span>Libertyassuredlimited</span> can obtain my data from 3rd parties, deduct my salary at source and autodebit accounts linked to me at default</p>

                                    <div className="consent_button_container">
                                        <button class="approve_" onClick={showProcessLoanScreen}>I Consent</button>
                                        <button class="disapprove_" onClick={exitModal}>Decline</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* CONSENT MODAL */}

                <div className="container_wrapper_main">
                    <div className="form_container_main">
                        <div className="form_container_header_main">
                            <h2>Supply your information <br /> <span>(For civil servants only)</span></h2>
                            <img src={AssuredLogo} alt="logo" />
                        </div>
                        <p></p>

                        <div className="intro_text">
                            {/* <p>please supply your phone number and email to
                                get your loan offers in seconds
                            </p> */}

                            <p>This offer is for civil servants only
                                please supply your BVN verified number
                            </p>
                        </div>

                        <form id="form" onSubmit={submitConsentHandler}>
                            <div className="form_wrapper">
                                <div className="input_container">
                                    <p>Phone Number</p>
                                    <input type="number" placeholder="Phone Number"
                                        onChange={e => setPhoneNumber(e.target.value)}
                                        minLength="11"
                                        maxLength="13"
                                        required />
                                </div>
                                <div className="input_container move hideMail">
                                    <p>Email Address</p>
                                    <input type="email" placeholder="E.g Liberty@gmail.com"
                                        onChange={e => setEmailAddress(e.target.value)}
                                    />
                                </div>
                            </div>


                            <div className="consent">
                                <h2>Consent to Liberty Assured</h2>
                                <p>
                                    By clicking proceed, I consent to Liberty Assured obtaining information from relevant third parties
                                    as may be necessary, on my employment details, salary payments, loans and other related data, to make a decision on my loan application. I also consent to the loan
                                    amounts being deducted from my salary at source before credit to my account and any outstanding loans being recovered automatically from any other accounts linked to me incase of default
                                </p>
                            </div>

                            <div className="consent2">
                                <h2>I also consent to receive information on my loan details via</h2>
                                <div className="check_boxes">
                                    <input type="checkbox" name="sms" id="sms" value="" checked />
                                    <label for="sms">SMS</label>
                                    <input type="checkbox" name="email" id="email" class="m_l" value="" checked />
                                    <label for="email">Email</label>
                                    <input type="checkbox" name="whatsapp" id="whatsapp" class="m_l" value="" checked />
                                    <label for="whatsapp">WhatsApp</label>
                                </div>
                            </div>

                            <div className="button_cont">
                                <button className="" type="submit">Consent</button>
                            </div>
                        </form>
                    </div>
                    <div className="image_container_main">

                    </div>

                </div>
                <footer className="footer_main">
                    <p> copyright &copy;2022, Liberty Assured, All rights reserved.</p>
                </footer>
            </div>

        </>
    );
}

export default Main;