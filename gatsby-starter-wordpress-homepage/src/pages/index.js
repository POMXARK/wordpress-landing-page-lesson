import * as React from "react"
// import styles from  "../../static/parallax.css"

import Header from "../components/modules/Header";
import AboutMy from "../components/modules/AboutMy";
import Resume from "../components/modules/Resume";

export default function Homepage(props) {

  return (
    <>
      {Header()}

      {AboutMy()}

      {Resume()}

    </>
  )
}
