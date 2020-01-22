import React from "react";

class ProtectedRoute extends React.Component {
  render() {
    let user = localStorage.getItem("user") || sessionStorage.getItem("user");
    // user = JSON.parse(user);
    if (!user) {
      window.location.href = "/login";
    }
    if (user) {
      return this.props.children;
    }
  }
}

export default ProtectedRoute;
