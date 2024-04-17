import React from 'react'

function Livechat() {
    return (
        // <div>
        //     <a href="https://wa.link/5p1r84" class="whatsapp_float tracking-wider transition duration-300 ease-in-out" target="_blank" > <i class="fa fa-whatsapp whatsapp-icon"></i></a>
        // </div>

        <div class="container">
            <ul id="menu">
                <a class="menu-button icon-plus" href="#menu" title="Show navigation"><span class="far fa-comment-dots"></span></a>
                <a class="menu-button icon-minus" href="#0" title="Hide navigation"><span class="far fa-comment-dots"></span></a>
                <li class="menu-item">
                    <a href="#menu">
                        <span class="fab fa-facebook"></span>
                    </a>
                </li>
                <li class="menu-item">
                    <a href="#menu">
                        <span class="fab fa-twitter"></span>
                    </a>
                </li>
                <li class="menu-item">
                    <a href="#menu">
                        <span class="fab fa-instagram"></span>
                    </a>
                </li>
            </ul>

        </div>
    )
}

export default Livechat;
