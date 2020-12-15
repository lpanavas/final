import React from "react";
import { Link } from "react-router-dom";
import "./signupPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

function SignupPage() {
  //const urlParams = new URLSearchParams(window.location.search);
  //const error = urlParams.get("error");

  return (
    <div>
      <div className="SignIn">
        <div className="container-fluid d-flex justify-content-center">
          <div className="signcard">
            <div className="card-header">
              <div className="card-h3">Sign Up</div>
            </div>
            <div className="card-body">
              <form action="/auth/register" method="POST">
                <div className="form-group">
                  <label for="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder=" "
                    name="username"
                  />
                </div>
                <div className="form-group">
                  <label for="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    className="form-control"
                    placeholder=" "
                    name="email"
                  />
                </div>
                <div className="form group">
                  <label for="password">Password</label>
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
                  Sign up
                </button>
                <div className="form-group">
                  Already an user?{" "}
                  <Link className="card-footerText" to="/signin">
                    Sign In
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

export default SignupPage;
