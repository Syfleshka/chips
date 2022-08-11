import './ChipsInput.scss'
import { useEffect, useState } from 'react'

const makeChips = (input) => {
  const chipsArr = input.split(',')
  let quotePosition = []

  for (let i = 0; i < chipsArr.length; i++) {
    if (chipsArr[i].search('"') > -1) {
      quotePosition.push(i)
    }
    console.log(quotePosition)
    if (
      quotePosition.length > 1 ||
      (quotePosition.length === 1 && i === chipsArr.length - 1)
    ) {
      const firstQuote = quotePosition[0]
      const secondQuote = quotePosition[1]
        ? quotePosition[1]
        : chipsArr.length - 1
      const slicedElems = chipsArr.slice(firstQuote, secondQuote + 1).join(',')
      chipsArr.splice(firstQuote, secondQuote - firstQuote + 1, slicedElems)
      console.log(slicedElems)
      i = firstQuote + 1
      quotePosition = []
    }
  }
  return chipsArr
}

function ChipsInput({ value, onChange }) {
  const [chips, setChips] = useState(makeChips(value))

  const updateChipsString = (inputValue) => {
    const updatedChip = chips.slice(0, chips.length - 1)
    updatedChip.push(inputValue)
    console.log(updatedChip)
    onChange(updatedChip.join(','))
  }

  const updateChips = () => {
    setChips(makeChips(value))
  }

  useEffect(updateChips, [value])

  return (
    <div className="ChipsInput">
      <ul className="ChipsInput__tags">
        {chips.map((chip, i) =>
          i === chips.length - 1 || chips.length === 0 ? (
            <input
              key={i}
              className="ChipsInput__input"
              type="text"
              value={chip}
              onChange={(e) => updateChipsString(e.target.value)}
            />
          ) : (
            <li key={i} className="ChipsInput__tag">
              <span>{chip}</span>
              <span className="close-icon">x</span>
            </li>
          )
        )}
      </ul>
    </div>
  )
}

export default ChipsInput
