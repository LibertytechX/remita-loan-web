import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import axios from "axios";

import Swal from "sweetalert2";

import LoadingIcon from "../../images/loading_icon.svg";
import questionGif from "../../images/questions.gif";

function Questions() {
  // Retrieve the response JSON string from local storage
  const storedResponseString = localStorage.getItem("responseQuestions");

  // Parse the JSON string back to an object
  const storedResponse = JSON.parse(storedResponseString);
  const allQuestion = storedResponse.data.data.questions;
  const [answers, setAnswers] = useState({});

  let history = useHistory();

  const [phone, setPhone] = useState(null);

  useEffect(() => {
    setPhone(localStorage.getItem("phone"));
  }, []);

  // Function to handle option selection
  const handleOptionSelect = (question, optionIndex) => {
    const selectedOption = String.fromCharCode(97 + optionIndex); // Convert index to corresponding letter (a, b, c, ...)
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: selectedOption,
    }));
  };

  // Function to handle form submission
  const submitAnswers = () => {
    const submissionPayload = {
      phone: phone, // Assuming the phone number is fixed
      data: allQuestion.map((questionObj) => ({
        question: questionObj.question,
        answer: answers[questionObj.question], // Use the selected answer for the question
      })),
    };

    axios.post('https://libertyussd.com/api/web/verify_security_question/', submissionPayload)
    .then(
        response => {
            console.log(response)
            console.log(response.data.data)
            console.log(response.data.data.ussd_code)
            document.getElementById("loading_animation_question").style.display = "none"

            localStorage.setItem('ussd_code_response', response.data.data.ussd_code);
            
            history.push("/otp")
        }).catch(error => {
            console.log(error)
            document.getElementById("loading_animation_question").style.display = "none"
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Okay'

            })
        })
        
    console.log(submissionPayload, "payload"); // You can send this payload to the backend
  };

  return (
    <>
      {/* <Livechat /> */}
      <div id="container_main_question">
        {/* PAYOUT container loader */}
        {/* loading screen */}
        <div id="loading_animation_question">
          <div className="loading_container_question">
            <img src={LoadingIcon} alt="icon" />
            <p>Verifying Otp........</p>
          </div>
        </div>
        {/*end loading screen */}
        {/* PAYOUT container loader */}

        <div className="container_wrapper_question">
          <div className="questions_content">
            <div className="questions_form">
              <h2>Answer Question to Verify </h2>
              <div>
                {/* {allQuestion.map((question) => {
                  return (
                    <>
                      <div key={index}>
                        <p style={{fontSize: '16px', fontWeight: '600'}}><span style={{fontSize: '15px', fontWeight: '600', marginRight: '5px'}}>Ques {index}: </span>{question.question}</p>
                        {question.options.map((option, i) => (
                          <div className="radio-input" key={i}>
                            <label className="radio-label">
                              <input
                                type="radio"
                                name={question.question} // Use the question as the radio button group name
                                value={option}
                                checked={
                                  answers[question.question] === option
                                } // Check if this option is selected
                                onChange={() =>
                                  handleOptionSelect(
                                    question.question,
                                    option
                                  )
                                }
                                className="focus:outline-none"
                              />
                             {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })} */}
                {/* {allQuestion.map((questionObj, index) => (
                  <div key={index}>
                    <p style={{ fontSize: "16px", fontWeight: "600" }}>
                      <span
                        style={{
                          fontSize: "15px",
                          fontWeight: "600",
                          marginRight: "5px",
                        }}
                      >
                        Ques {index + 1}:
                      </span>
                      {questionObj.question}
                    </p>
                    {questionObj.options.map((option, i) => (
                      <div className="radio-input" key={i}>
                        <label className="radio-label">
                          <input
                            type="radio"
                            name={questionObj.question}
                            value={option}
                            checked={answers[questionObj.question] === option}
                            onChange={() =>
                              handleOptionSelect(questionObj.question, option)
                            }
                            className="focus:outline-none"
                          />
                          {String.fromCharCode(97 + i)}: {option}
                        </label>
                      </div>
                    ))}
                  </div>
                ))} */}

                {allQuestion.map((questionObj, index) => (
                  <div key={index}>
                    <p style={{ fontSize: "16px", fontWeight: "600" }}>
                      <span
                        style={{
                          fontSize: "15px",
                          fontWeight: "600",
                          marginRight: "5px",
                        }}
                      >
                        Ques {index + 1}:
                      </span>
                      {questionObj.question}
                    </p>
                    {questionObj.options.map((option, i) => (
                      <div className="radio-input" key={i}>
                        <label className="radio-label">
                          <input
                            type="radio"
                            name={questionObj.question}
                            value={option}
                            checked={
                              answers[questionObj.question] ===
                              String.fromCharCode(97 + i)
                            }
                            onChange={() =>
                              handleOptionSelect(questionObj.question, i)
                            }
                            className="focus:outline-none"
                          />
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <button onClick={submitAnswers}>Verify</button>

              <div className="return_section">
                <a href="/">
                  <i class="fas fa-undo-alt"></i> Back
                </a>
              </div>
            </div>
            <div className="questions_image">
              <img src={questionGif} alt="loading gif" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Questions;
