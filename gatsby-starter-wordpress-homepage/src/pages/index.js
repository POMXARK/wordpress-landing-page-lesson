import * as React from "react"

import AboutMy from "../components/modules/AboutMy";
import Edu from "../components/modules/Edu";
import Work from "../components/modules/Work";
import Header from "../components/modules/Header";

export default function Homepage(props) {

  return (
    <>
        {Header()}
        <p>Обо мне</p>
        {AboutMy()}

        <p>Резюме</p>

        <p>Работа</p>
        {Work()}

        <p>Учеба</p>
        {Edu()}
    </>
  )
}
