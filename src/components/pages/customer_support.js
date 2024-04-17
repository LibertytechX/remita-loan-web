import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import AssuredLogo from "../../images/assured_logo.png"
import LoadingIcon from "../../images/loading_icon.svg"

import LibertyStatue from "../../images/liberty_stat.svg"


function Main() {




    return (
        <>
            <div id="container_main_support">

                <div className="container_wrapper_support">
                    <div className="form_container_support">
                        <div className="form_container_header_support">
                            <img src={AssuredLogo} alt="logo" />
                            <h1>Get in touch </h1>
                            <p>Got a compliant or want to know more about our services?</p>
                        </div>

                        <div className="form_wrapper_support">
                            <div className="input_container_support">
                                <p>Phone Number</p>
                                <input type="number" placeholder="Phone Number"
                                    minLength="11"
                                    maxLength="13"
                                    required />
                            </div>
                            <div className="input_container_support move__">
                                <p>Email Address</p>
                                <input type="email" placeholder="E.g Liberty@gmail.com"
                                />
                            </div>
                        </div>
                        <div className="message_container_support">
                            <p>Message</p>
                            <textarea row="5" col="30" />

                            <button>Send message</button>
                        </div>


                        <div class="contactus_section">
                            <h1>Contact us</h1>
                            <div class="contactus_details">
                                <div className="contact_det1">
                                    <img src={LibertyStatue} />

                                </div>
                                <div className="contact_det2">
                                    <p><i class="fa fa-map-marker"></i> No.27 Alara street, Yaba, Lagos, Nigeria</p>
                                    <p><i class="fa fa-envelope"></i> support@libertyng.com</p>
                                    <p><i class="fa fa-phone"></i> 012770331 </p>
                                    <p><i class="fab fa-whatsapp"></i><a href="https://wa.me/2349095000300" target="_blank">Reach us on Whatsapp</a></p>

                                    <div className="social_icon_contact">
                                        <i class="fab fa-facebook-square"></i>
                                        <i class="fab fa-twitter-square"></i>
                                        <i class="fab fa-instagram-square"></i>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="image_container_support">

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