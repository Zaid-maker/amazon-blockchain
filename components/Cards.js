import React, { useState, useContext, useEffect } from 'react'
import Card from './Card'
import { AmazonContext } from '../context/AmazonContext'

const styles = {
  container: `h-full w-full flex flex-col ml-[20px] -mt-[50px]`,
  title: `text-xl font-bolder mb-[20px] mt-[30px]  ml-[30px]`,
  cards: `flex items-center  flex-wrap gap-[80px]`,
}

const Cards = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>New Release's</div>
      <div className={styles.cards}>
        <Card />
      </div>
    </div>
  )
}

export default Cards
