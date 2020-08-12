import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

class App extends Component {
  componentDidMount() {
    window.localStorage.setItem(
      "userToken",
      "" //token nhom
    );
  }
  render() {
    return (
      <>
        <ToastContainer />
        <Router>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route path="/" name="Home" component={DefaultLayout} />
            </Switch>
          </React.Suspense>
        </Router>
      </>
    );
  }
}

export default App;
