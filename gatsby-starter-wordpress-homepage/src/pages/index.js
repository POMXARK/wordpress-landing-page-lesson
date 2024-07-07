import * as React from "react"
// import styles from  "../../static/parallax.css"

import ImgBg from '../img/bg.jpg'
import {motion,useScroll, useTransform} from "framer-motion";
import {useRef} from "react";
import { UseScrollPosition } from 'react-hook-collections';
import Header from "../components/modules/Header";
import AboutMy from "../components/modules/AboutMy";
import Work from "../components/modules/Work";
import Edu from "../components/modules/Edu";


export default function Homepage(props) {

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start start", "end start"],
  })
    const backgroundY = useTransform(scrollYProgress, [0, 1],
        ["0%", "100%"])
    const textY = useTransform(scrollYProgress, [0, 1],
        ["0%", "200%"])

    const scrollPosition = UseScrollPosition();
    console.log(scrollPosition); // Prints the scroll position on the console

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
