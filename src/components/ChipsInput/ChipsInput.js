import './ChipsInput.scss'
import { useEffect, useRef, useState } from 'react'
import { makeChips } from './makeChips'
import CloseIcon from './CloseIcon'

function ChipsInput({ value, onChange }) {
  const [chips, setChips] = useState(makeChips(value))
  const chipsInput = useRef(null);

  const updateChipsString = (inputValue) => {
    const updatedChip = chips.slice(0, chips.length - 1)
    updatedChip.push(inputValue)
    onChange(updatedChip.join(','))
  }
  const removeChip = (chipNumber) => {
    const cloneArray = chips.slice(0, chips.length)
    cloneArray.splice(chipNumber, 1)
    onChange(cloneArray.join(','))
  }

  const updateChips = () => {
    setChips(makeChips(value))
  }

  const setFocus = (elem) => {
    elem.current.focus()
  }

  useEffect(updateChips, [value])

  return (
    <ul className="ChipsInput" onClick={() => setFocus(chipsInput)}>
      {chips.map((chip, i) =>
        i === chips.length - 1 || chips.length === 0 ? null : (
          <li key={i} className="ChipsInput__tag">
            <span>{chip}</span>
            <button className="close-button" onClick={() => removeChip(i)}>
              <CloseIcon className="close-icon" />
            </button>
          </li>
        )
      )}
      <input
        ref={chipsInput}
        className="ChipsInput__input"
        type="text"
        value={chips[chips.length - 1]}
        placeholder="Введите"
        onChange={(e) => updateChipsString(e.target.value)}
      />
    </ul>
  )
}

export default ChipsInput
