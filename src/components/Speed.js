import React from "react";


const Speed = ({seconds, symbols, correctSymbols, setWPM}) => {
  const wpm = (symbols / 5) / (seconds / 60)
  setWPM(Math.round(wpm))

  if (seconds !== 0 && symbols !== 0) {
    return (
    <div>
      {Math.round(wpm)} word/min
    </div>
    )
  }

  return null
}

export default Speed