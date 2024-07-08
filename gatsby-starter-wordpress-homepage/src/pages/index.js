import * as React from "react"
// import styles from  "../../static/parallax.css"

import Header from "../components/modules/Header";
import AboutMy from "../components/modules/AboutMy";
import Resume from "../components/modules/Resume";
import Portfolio from "../components/modules/Portfolio";
import {Script} from "gatsby";
import Contacts from "../components/modules/Contacts";

export default function Homepage(props) {

  return (
    <>
      {Header()}
      {AboutMy()}
      {Resume()}
      {Portfolio()}
      {Contacts()}

      <Script src="/common_vendor.js" type="text/javascript"/>
    </>
  )
}
