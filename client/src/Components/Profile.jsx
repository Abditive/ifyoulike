/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";

function Profile(props) {
  return (
    <>
      {props.user ? (
        <>
          <h1>Logged</h1>
          <h1>History</h1>
        </>
      ) : (
        <h2>Not Logged</h2>
      )}
    </>
  );
}

export default Profile;
