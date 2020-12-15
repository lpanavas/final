import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import HouseListPage from "./pages/HouseListPage";
import HouseDetailPage from "./pages/HouseDetailPage";
import AnnotationPage from "./pages/AnnotationPage";
import FollowingPage from "./pages/FollowingPage";
import AuthorPage from "./pages/AuthorPage";

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
            <Route exact path="/" component={HomePage} />
            <Route path="/signin" component={SigninPage} />
            <Route path="/signup" component={SignupPage} />
            <Route
              path="/annotations"
              render={(props) => <AnnotationPage {...props} user={user} />}
            />
            <Route path="/list" component={HouseListPage} />
            <Route path="/content/:houseId" component={HouseDetailPage} />
            <Route path="/summary/:author" component={AuthorPage} />
            <Route
              path="/Following/:username"
              render={(props) => <FollowingPage {...props} user={user} />}
            />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
