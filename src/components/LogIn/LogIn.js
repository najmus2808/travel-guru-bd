import React, { useState } from "react";
import './Login.css'
import * as firebase from "firebase/app";
import Logo from '../../fakeData/images/Logo.png'
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';



const LogIn = () => {

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
      isSignedIn: false,
      name: "",
      email: "",
      password: ""
    });
  
    // const handleSignIn = () => {
    //   firebase
    //     .auth()
    //     .signInWithPopup(provider)
    //     .then((res) => {
    //       const { displayName, email, photoURL } = res.user;
    //       const signedInUser = {
    //         isSignedIn: true,
    //         name: displayName,
    //         email: email,
    //         photo: photoURL,
    //       };
  
    //       setUser(signedInUser);
    //     })
  
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };
  
    
  
    // const handleSignOut = () => {
    //   firebase
    //     .auth()
    //     .signOut()
    //     .then((res) => {
    //       const signedOutUser = {
    //         isSignedIn: false,
    //         name: "",
    //         email: "",
    //         photo: "",
    //         error: "",
    //         success: false,
    //       };
  
    //       setUser(signedOutUser);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };
  
    const handleBlur = (e) => {
      let isFieldValid = true;
      if (e.target.name === "email") {
        isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      }
  
      if (e.target.name === "password") {
        const isPasswordValid = e.target.value.length > 6;
        const passwordHasNumber = /\d{1}/.test(e.target.value);
        isFieldValid = isPasswordValid && passwordHasNumber;
      }
      if (isFieldValid) {
        const newUserInfo = { ...user };
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
      }
    };
  
    const handleSubmit = (e) => {
      if (newUser && user.email && user.password) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(user.email, user.password)
          .then((res) => {
            const newUserInfo = { ...user };
            newUserInfo.error = "";
            newUserInfo.success = true;
            setUser(newUserInfo);
            updateUserName(user.name);
            console.log("sign in user info", res.user);
          })
          .catch((error) => {
            // Handle Errors here.
            const newUserInfo = { ...user };
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);
  
            // ...
          });
      }
      if (!newUser && user.email && user.password) {
        firebase
          .auth()
          .signInWithEmailAndPassword(user.email, user.password)
          .then((res) => {
            const newUserInfo = { ...user };
            newUserInfo.error = "";
            newUserInfo.success = true;
            setUser(newUserInfo);
          })
          .catch(function (error) {
            // Handle Errors here.
            const newUserInfo = { ...user };
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);
            // ...
          });
      }
      e.preventDefault();
    };
  
    const updateUserName = (name) => {
      const user = firebase.auth().currentUser;
  
      user
        .updateProfile({
          displayName: name,
        })
        .then(function () {
          console.log("user name updated successfully");
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  
  





    // =======================

    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }

    
    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            var user = res.user;
            console.log(user);
            
          })
          .catch(error => { 
           console.log(error);
           
          });

    }

    const handleFacebookSignIn = () => {
        var fbProvider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(fbProvider).then(function(result) {
            
            var user = result.user;
            console.log(user);
            
          }).catch(function(error) {
            
            console.log(error);
          });
    }

    return (
        <div>
            <div>
            <Navbar variant="light" expand="lg">
                <Navbar.Brand href="/home" className="ml-lg-5 mr-auto ">
                    <img className="ml-5" src={Logo} alt="" height="35px"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto mr-5">
                        <Nav.Link href="/home" className="mr-4">
                            Home
                        </Nav.Link>
                        <NavDropdown title="Destination" id="basic-nav-dropdown" className="mr-4">
                            <NavDropdown.Item href="/action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="/action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/action/3.3">Something</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/blog" className="mr-4">
                            Blog
                        </Nav.Link>
                        <Nav.Link href="/contact" className="mr-4">
                            Contact
                        </Nav.Link>
                        <Button href="/login" variant="warning" className="mr-5">
                            Login
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>

        { newUser ?
            <div className="hero">
            <div className="form-box">
            <h5 className="mt-3 ml-4">Create an account</h5>
            <form onSubmit={handleSubmit} className="input-group justify-content-center mt-3">
                <input type="text" name="firstName" id="" onBlur={handleBlur} className="input-field" placeholder="First Name" required/>
                <input type="text" name="lastName" id="" onBlur={handleBlur} className="input-field" placeholder="Last Name" required/>
                <input type="text" name="email" id="" onBlur={handleBlur} className="input-field" placeholder="Username or Email" required/>
                <input type="password" name="password" id="" onBlur={handleBlur} className="input-field" placeholder="Password" required/>
                <input type="password" name="confirmPassword" id="" onBlur={handleBlur} className="input-field" placeholder="Confirm Password" required/>
                <input type="submit" value="Create an account" className="submit-btn mt-3"/>
            </form>
            <div className="d-flex  justify-content-center mt-2">
                <p><small>Already have an account?</small></p>
                <button className="ml-1"  onClick={() => setNewUser(!newUser)}>Login</button>
            </div>
            </div>
            </div>

            :

            <div className="hero">
            <div className="form-box1">
            <h5 className="mt-3 ml-4">Login</h5>
            <form action="" className="input-group justify-content-center mt-3">
                <input type="text" name="" id="" className="input-field" placeholder="Username or Email"/>
                <input type="password" name="" id="" className="input-field" placeholder="Password"/>
                <input type="submit" value="Login" className="submit-btn mt-3"/>
            </form>
            <div className="d-flex  justify-content-center mt-2">
                <p><small>Don't have an account?</small></p>
                <button className="ml-1" onClick={() => setNewUser(!newUser)}>Create an account</button>
            </div>
            </div>

              
            </div>


        }

            <div className="footer">
                <hr/>
                <p className="or">OR</p>
                <button onClick={handleFacebookSignIn} className="login-btn mt-4">Continue with Facebook</button>
                <button onClick={handleGoogleSignIn} className="login-btn mt-2">Continue with Google</button>
                </div>
      
    </div>
    );
};

export default LogIn;