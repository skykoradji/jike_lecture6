import React from 'react';
import connectRedux from "../redux/connect";

function Test(props) {
  console.log(props);
  return null;

}

export default connectRedux(Test);