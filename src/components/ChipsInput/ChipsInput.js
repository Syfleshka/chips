import './ChipsInput.scss'
import { useEffect, useState } from 'react'
import { makeChips } from './makeChips'
import CloseIcon from './CloseIcon'

function ChipsInput({ value, onChange }) {
  const [chips, setChips] = useState([''])

  const handleChips = (event, key) => {
    console.log(key)
    chips[key] = event.target.value
    onChange(chips.join(','))
  }
  const removeChip = (chipNumber = 0) => {
    const cloneArray = chips.slice(0, chips.length)
    cloneArray.splice(chipNumber, 1)
    onChange(cloneArray.join(','))
  }

  const updateChips = () => {
    setChips(makeChips(value))
  }

  useEffect(updateChips, [value])

  return (
    <ul className="ChipsInput">
      {chips.map((chip, i) =>
        i < chips.length - 1 ? (
          <li key={i} className="ChipsInput__tag">
            <span className="hidden">{chip}</span>
            <input
              className="ChipsInput-tag__input"
              type="text"
              value={chip}
              style={{
                width: chip.length + 'ch',
              }}
              placeholder="Введите"
              onChange={(e) => handleChips(e, i)}
            />
            <button className="close-button" onClick={() => removeChip(i)}>
              <CloseIcon className="close-icon" />
            </button>
          </li>
        ) : null
      )}
      <input
        className="ChipsInput__input"
        type="text"
        value={chips[chips.length - 1]}
        placeholder="Введите"
        onChange={(e) => handleChips(e, chips.length - 1)}
      />
    </ul>
  )
}

export default ChipsInput
