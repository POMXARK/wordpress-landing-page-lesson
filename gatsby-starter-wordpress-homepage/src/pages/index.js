import * as React from "react"
// import styles from  "../../static/parallax.css"

import Header from "../components/modules/Header";
import AboutMy from "../components/modules/AboutMy";
import Resume from "../components/modules/Resume";
import Portfolio from "../components/modules/Portfolio";
import {Script} from "gatsby";
import Contacts from "../components/modules/Contacts";
import Footer from "../components/modules/Footer";
import { globalHistory } from '@reach/router';
import config from '../../config';

export default function Homepage(props) {
  return (
      <>
          <div className="loader">
              <div className="loader_inner"></div>
          </div>

          {Header()}
          {AboutMy()}
          {Resume()}
          {Portfolio()}
          {Contacts()}
          {Footer()}

          <Script
              src={globalHistory.location.protocol === 'http:' ? "/common_vendor.js" : config.gatsby.pathPrefix + "/common_vendor.js"}
              type="text/javascript"/>
      </>
  )
}
