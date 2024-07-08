import * as React from "react"
// import styles from  "../../static/parallax.css"

import Header from "../components/modules/Header";
import AboutMy from "../components/modules/AboutMy";
import Work from "../components/modules/Work";
import Edu from "../components/modules/Edu";


export default function Homepage(props) {

  return (
    <>
      {Header()}

      {AboutMy()}

      <p>Резюме</p>

      <p>Работа</p>
      {Work()}

      <p>Учеба</p>
      {Edu()}
    </>
  )
}
