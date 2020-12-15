import React from "react";
import { Link } from "react-router-dom";
import "./signinPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

function SigninPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");
  localStorage.setItem("username", username);
  console.log("username");
  console.log(localStorage.getItem("username"));

  return (
    <div>
      <div className="SignIn">
        <div className="container-fluid d-flex justify-content-center">
          <div className="signcard">
            <div className="card-header">
              <div className="card-h3">Sign In</div>
            </div>
            <div className="card-body">
              <form action="/auth/login" method="POST">
                <div className="form-group">
                  <label for="inputEmail">Email</label>
                  <input
                    type="text"
                    id="email"
                    className="form-control"
                    placeholder=" "
                    name="email"
                  />
                </div>
                <div className="form group">
                  <label for="inputPassword">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder=" "
                    name="password"
                  />
                </div>
                <br />

                <button type="submit" className="btn btn-dark">
                  Sign In
                </button>
                <div className="form-group">
                  Not an user yet?{" "}
                  <Link className="card-footerText" to="/signup">
                    Sign Up
                  </Link>
                  <br />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
