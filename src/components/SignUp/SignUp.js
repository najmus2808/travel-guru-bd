
import React, { useState } from "react";
import "./SignUp.css";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";


firebase.initializeApp(firebaseConfig);


const SignUp = () => {
   
  const provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };

        setUser(signedInUser);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const handleFBLogedIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then(function (result) {
        var user = result.user;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const signedOutUser = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
          error: "",
          success: false,
        };

        setUser(signedOutUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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


  return (
    <div>
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
                    <a className="ml-1" href="/login">Login</a>
                </div>
                </div>
                
                   
            </div>

            <div className="footer">
                <hr/>
                <p className="or">OR</p>
                <button className="login-btn mt-4">Continue with Facebook</button>
                <button className="login-btn mt-2">Continue with Google</button>
                </div>
      
    </div>
  );
};

export default SignUp;
