import React, { useState } from 'react';
import Button from  "@mui/material/Button"
import Input from "@mui/material/Input"

export type CounterProps = {
  /**
   * min Value of counter
   */
  min?: number,
  /**
   * max Value
   */
  max?: number,
  /**
   * increment value
   */
  increment?: number,
  /**
   * decrement value
   */
  decrement?: number,
  /**
   * a function that registers the count when changed
   */
  onCountChange: (count: number) => void
} & React.HTMLAttributes<HTMLDivElement>


export default function Counter() {
    return (
        <div className='counter-component'>
          <p>Quantity</p>
        </div>
    )
}
