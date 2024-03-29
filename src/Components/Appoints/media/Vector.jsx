import React from "react";
import "./Vector.css";

class Vector extends React.Component {
  state = {};
  render() {
    return (
      <svg
        className="vector-svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.1667 9.16668H10.8333V0.83332C10.8333 0.373086 10.4602 0 10 0C9.53976 0 9.16668 0.373086 9.16668 0.83332V9.16664H0.83332C0.373086 9.16668 0 9.53977 0 10C0 10.4602 0.373086 10.8333 0.83332 10.8333H9.16664V19.1666C9.16664 19.6269 9.53973 20 9.99996 20C10.4602 20 10.8333 19.6269 10.8333 19.1666V10.8333H19.1666C19.6268 10.8333 19.9999 10.4602 19.9999 10C19.9999 9.53977 19.6269 9.16668 19.1667 9.16668Z"
          fill="#868789"
        />
      </svg>
    );
  }
}

export default Vector;
