import React from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Textfield from "../../components/Textfield";
import OtpField from "../../components/OtpField";
import logo from "../../asset/logo.png";
import ChoiceButton from "../../components/ChoiceButton";
import Text from "../../components/Text";
import CustomLink from "../../components/CustomLink";
import Loading from "../../components/Loading";
import css from "./Login.module.css";
import googleBadge from "../../asset/google-play-badge.png";
import appleBadge from "../../asset/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  phoneProvider: new firebase.auth.PhoneAuthProvider()
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderLoading: false,
      renderForm: true,
      otpCode: "",
      activeChoice: "USER",
      phoneNumber: ""
    };
  }

  componentDidMount = () => {
    console.log(this.props);
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: res => console.log("allow signinwithphone")
      }
    );
  };

  onSignIn = () => {
    this.setState({ renderLoading: true });
    const verifier = window.recaptchaVerifier;
    this.props
      .signInWithPhoneNumber(`${this.state.phoneNumber}`, verifier)
      .then(confirmationResult => {
        this.setState({
          renderLoading: false
        });
        if (confirmationResult.code === "auth/too-many-requests") {
          alert("You've attempted too many requests, please try again later");
        }
        if (confirmationResult.code === "auth/invalid-phone-number") {
          alert("Your phone number is invalid");
        }
        if (confirmationResult.verificationId) {
          this.setState({
            renderForm: false
          });
          window.confirmationResult = confirmationResult;
        }
      });
  };

  onOTPSubmit = () => {
    this.setState({
      renderLoading: true
    });
    window.confirmationResult.confirm(this.state.otpCode.join("")).then(res => {
      this.setState({
        renderLoading: false
      });
      if (res.code === "auth/invalid-verification-code") {
        alert("The OTP code is wrong or invalid, please try again");
      }
      if (res.user) {
        const dataToSet = JSON.stringify(res);
        sessionStorage.setItem("user", dataToSet);
        window.location.href = "/home";
      }
    });
  };

  onInputChange = e => {
    const phoneRegex = /^[+][0-9]*$/;
    if (phoneRegex.test(e.target.value) || !e.target.value) {
      this.setState({
        phoneNumber: e.target.value
      });
    }
  };

  onOTPChange = (value, i) => {
    // console.log(value, i);
    const { otpCode } = this.state;
    const newCode = [...otpCode];
    newCode[i - 1] = value;
    this.setState({
      otpCode: newCode
    });
  };

  render() {
    console.log(this.state.otpCode);
    return (
      <>
        {this.state.renderLoading && <Loading />}
        {this.state.renderForm && (
          <div className={css.pageContainer}>
            <Card>
              <div className={css.mainSection}>
                <img alt="logo" className={css.logo} src={logo} />
                <div style={{ width: "100%" }}>
                  <Text size="small" align="left" color="black">
                    Sign in as :
                  </Text>
                  <ChoiceButton
                    size="small"
                    active={this.state.activeChoice}
                    onClick={value => this.setState({ activeChoice: value })}
                    choices={["USER", "TRADER"]}
                  />
                  <CustomLink size="xsmall" align="right" color="yellow">
                    What is user and trader ?
                  </CustomLink>
                </div>
                <Textfield
                  placeholder="Please use + in the beginning"
                  value={this.state.phoneNumber}
                  required
                  onChange={this.onInputChange}
                  label="Input Phone Number"
                />
                <div className={css.buttonContainer}>
                  <Button text="Sign In" size="small" onClick={this.onSignIn} />
                </div>
              </div>
            </Card>
            <div style={{ marginTop: "30px" }}>
              <Card>
                <div className={css.bottomSection}>
                  <Text color="black">
                    Don't have any account ?{" "}
                    <CustomLink color="yellow" inline>
                      Register
                    </CustomLink>
                  </Text>
                </div>
              </Card>
            </div>
            <div className={css.badgeSection}>
              <Text align="center" color="black">
                Get the app.
              </Text>
              <div className={css.badgeContainer}>
                <img
                  src={googleBadge}
                  alt="google play"
                  className={css.googleBadge}
                />
                <img
                  src={appleBadge}
                  alt="appstore"
                  className={css.appleBadge}
                />
              </div>
            </div>
          </div>
        )}
        {!this.state.renderForm && (
          <div className={css.OTPPageContainer}>
            <Card>
              <div className={css.OTPMainSection}>
                <img alt="logo" className={css.OTPLogo} src={logo} />
                <Text color="black" size="small">
                  Enter the Code Sent to +6287865145405
                </Text>
                <div className={css.otpContainer}>
                  <OtpField digits={6} onOTPChange={this.onOTPChange} />
                  <Text
                    onClick={() => {
                      this.onSignIn();
                    }}
                    size="small"
                    align="right"
                    color="yellow"
                  >
                    Resend Code
                  </Text>
                </div>
                <div className={css.OTPBottomSection}>
                  <Text color="black" size="xsmall">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin rutrum, augue ac scelerisque sodales, nunc lorem
                    tincidunt nisi, eget hendrerit diam arcu pellentesque leo.
                  </Text>
                </div>
                <div className={css.OTPBottomSection}>
                  <Button
                    text="Continue"
                    size="small"
                    onClick={this.onOTPSubmit}
                  />
                </div>
              </div>
            </Card>
          </div>
        )}
        <div id="recaptcha-container"></div>
      </>
    );
  }
}

export default withFirebaseAuth({ providers, firebaseAppAuth })(Login);
