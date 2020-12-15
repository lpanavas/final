import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SigninPage from "./pages/SigninPage/SigninPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import HouseListPage from "./pages/HouseListPage/HouseListPage";
import SinglePage from "./pages/SinglePage/SinglePage";
//import HouseDetailPage from "./pages/HouseDetailPage";
//import AnnotationPage from "./pages/AnnotationPage";
import FollowingPage from "./pages/FollowingPage/FollowingPage";
import AuthorPage from "./pages/AuthorPage/AuthorPage";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={SigninPage} />
            <Route path="/signin" component={SigninPage} />
            <Route path="/signup" component={SignupPage} />
            <Route
              path="/home"
              render={(props) => <HomePage {...props} user={user} />}
            />

            <Route path="/posts" component={HouseListPage} />
            <Route
              path="/Following"
              render={(props) => <FollowingPage {...props} user={user} />}
            />
            <Route
              path="/getContent/:houseId"
              render={(props) => <SinglePage {...props} user={user} />}
            />
            <Route path="/author/:author" component={AuthorPage} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
