import React, { useState, useEffect } from 'react'
import AssuredLogo from "../../images/assured_logo.png"


function Main() {


    // const [userName, setUserName] = useState();
    // const [acctNumber, setAccountNumber] = useState();
    // const [bank, setBank] = useState();
    // const [employer, setEmployer] = useState();
    const [amount, setAmount] = useState();
    // const [phone, setPhone] = useState();


    useEffect(() => {
        // setUserName(localStorage.getItem('user_name'))
        // setAccountNumber(localStorage.getItem('account_num'))
        // setBank(localStorage.getItem('bank'))
        // setEmployer(localStorage.getItem('company'))
        setAmount(localStorage.getItem('amount'))
        // setPhone(localStorage.getItem('phone'))
    }, []);

    const amountNumberFormat = (value) =>
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'NGN'
        }).format(value);



    return (
        <>
            <div id="container_main_disbursed">
                <div className="container_wrapper_disbursed">
                    <div className="form_container_disbursed">
                        <img src={AssuredLogo} alt="logo" />
                        <div className="loan_disbursed_title">
                            <h2>Loan Disbursed!</h2>
                            <p>
                                Loan application has been sent for processing, you should receive a credit notification from your bank shortly 
                                
                                <br /> A sum of <span>{amountNumberFormat(amount)}</span> will be disbursed to your bank account
                                , You should get a notificaton from your bank soon
                            </p>
                        </div>

                        <div className="sendmsg_whatsapp">
                            <p>
                                Send us a message on Whatsapp to get updates about your loan status
                            </p>
                            <div className="button_cont">
                                <button>Send Message</button>
                            </div>
                        </div>
                    </div>
                    <div className="image_container_disbursed">

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