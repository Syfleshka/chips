import './ChipsInput.scss'
import { useEffect, useState } from 'react'
import { makeChips } from './makeChips'
import CloseIcon from './CloseIcon'

function ChipsInput({ value, onChange }) {
  const [chips, setChips] = useState(makeChips(value))
  const [error, setError] = useState({ text: '', key: -1 })
  const errorMessages = {
    quotes: 'Закройте кавычки с двух сторон'
  }

  const removeChip = (key = 0) => {
    console.log('removing chip:', key)
    const chipsClone = chips.slice()
    chipsClone.splice(key, 1)
    console.log('oldArr:', chips)
    console.log('newArr:', chipsClone)
    setChips(chipsClone)
  }

  const helperSetChips = ({ value, key }) => {
    const chipsClone = chips.slice()
    chipsClone.splice(key, 1, ...value)
    setChips(chipsClone)
  }

  const handleMainChip = ({ event, key }) => {
    const val = makeChips(event.target.value)
    helperSetChips({
      value: val,
      key,
    })
  }
  const mainChipConvertToChip = ({ event, key }) => {
    const chipValue = event.target.value
    const isQuotesClosed = (chipValue.match(/"/g) || []).length % 2 === 0
    const isInputEmpty = !!event.target.value
    if (isQuotesClosed) {
      setError({...error, text: '', key: -1})
      if (isInputEmpty) setChips([...chips, '' ])
    } else {
      setError({...error, text: errorMessages.quotes,  key})
    }
  }

  const handleChip = ({ event, key }) => {
    console.log(event.target.value)
    if (event.target.value === '') {
      removeChip(key)
    }
    helperSetChips({
      value: [event.target.value],
      key,
    })
  }

  const convertToChip = ({ event, key }) => {
    /*
    const chipValue = event.target.value
    const isQuotesClosed = (chipValue.match(/"/g) || []).length % 2 === 0
    const isInputEmpty = !!event.target.value
    if (isQuotesClosed) {
      setError({...error, text: '', key: -1})
      if (isInputEmpty) setChips([...chips, '' ])
    } else {
      setError({...error, text: errorMessages.quotes,  key})
    }
    */
  }



  useEffect(() => {
    onChange(chips.join(','))
  }, [chips, onChange])

  return (
    <div className="Chips">
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
                onBlur={(e) => convertToChip({ event: e, key: chips.length - 1 })}
                onChange={(e) => handleChip({ event: e, key: i })}
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
          placeholder={chips.length > 1 ? "" : "Введите"}
          onBlur={(e) => mainChipConvertToChip({ event: e, key: chips.length - 1 })}
          onChange={(e) => handleMainChip({ event: e, key: chips.length - 1 })}
        />
      </ul>
      <label className="ChipsInput__error">{error.text}</label>
    </div>
  )
}

export default ChipsInput
