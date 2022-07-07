import React, {useState} from 'react';
import './Login.css'
import {ArrowForwardIos} from "@material-ui/icons";
import {auth, provider} from "./firebase";
function Login() {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const signIn=()=>{
        auth.signInWithPopup(provider).catch((e)=>alert(e.message)
        )  //google에서 제공하는 provider(google id로그인)하면 popup창이 뜸
        console.log(auth)
    }
    const handleLogin=(e)=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password ).then(
            (auth)=>{
                console.log(auth);
            }).catch((e)=>alert(e.message))
        setEmail("")    //클릭 이후 email, password 초기화
        setPassword("")
    }
    const handleRegister=(e)=>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password).then(
            (auth)=>{
                if(auth){
                    console.log(auth)
                }
            }
        ).catch((e)=>alert(e.message))
        setEmail("")
        setPassword("")
    }
    return (
        <div className="login">
            <div className="login_container">
                <div className="login_logo">
                    <img src="https://qph.fs.quoracdn.net/main-qimg-d049946241e53481209a8938b70321e0" alt=""/>
                </div>
                <div className="login_desc">
                    <p>A place to share knowledge and better understand the world</p>
                    <h3>I Love REACT</h3>
                </div>

            <div className="login_auth">
                <div className="login_authOptions">
                    <div className="login_authOption">
                        <img src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg" alt="" className="login_googleAuth"/>
                        <p onClick={signIn}>Continue with Google</p>
                    </div>
                    <div className="login_authOption">
                        <img src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png" alt="" className="login_googleAuth"/>
                        <p>Continue with Facebook</p>
                    </div>
                    <div className="login_authDesc">

                        <p>By continuing you indicate that you agree to Quora’s{" "}<span style={{color:"blue", cursor:"pointer"}}>Service{" "}</span>and{" "}
                        <span style={{color:"blue", cursor:"pointer"}}>Privacy Policy</span>.</p>

                    </div>
                </div>
                <div className="login_emailPass">
                    <div className="login_label">
                        <h4>Login</h4>
                    </div>
                    <div className="login_inputFields">
                        <div className="login_inputField">
                            <input type="text" placeholder="Your email" value={email} onChange={(e)=>setEmail(e.target.value)}
                            //이벤트가 변할때마다 값을 넣어줌
                            />
                        </div>
                        <div className="login_inputField">
                            <input type="password" placeholder="your password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="login_forgetButt">
                        <small>Forgot password?</small>
                        <button type="submit" onClick={handleLogin}>Login</button>
                    </div>
                    <button onClick={handleRegister}>Sign Up</button>
                </div>

            </div>
                <div className="login_lang">
                    <p>Language setting</p>
                    <ArrowForwardIos fontSize="small"/>
                </div>
                <div className="login_footer">
                    <p>About</p>
                    <p>Careers</p>
                    <p>Privacy</p>
                    <p>Terms</p>
                    <p>Contact</p>
                    <p>Languages</p>
                    <p>Your Ad Choices</p>
                    <p>Press</p>
                    <p>© Quora, Inc. 2022</p>


                </div>
        </div>
        </div>
    );
}

export default Login;