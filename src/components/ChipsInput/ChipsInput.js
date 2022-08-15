import './ChipsInput.scss'
import { useEffect, useState } from 'react'
import { makeChips } from './makeChips'
import CloseIcon from './CloseIcon'

function ChipsInput({ value, onChange }) {
  const [chips, setChips] = useState(makeChips(value))
  const [error, setError] = useState({
    text: 'Закройте кавычки с двух сторон',
    keys: [],
  })

  const isQuotesClosed = (value) => (value.match(/"/g) || []).length % 2 === 0

  const removeError = (key) => {
    const errorKeys = error.keys.slice()
    const index = error.keys.indexOf(key);
    if (index !== -1) {
      errorKeys.splice(index, 1);
    }
    setError({ ...error, keys: errorKeys })
  }

  const addError = (key) => {
    setError({
      ...error,
      keys: [...error.keys, key],
    })
  }

  const removeChip = (key = 0) => {
    const chipsClone = chips.slice()
    chipsClone.splice(key, 1)
    setChips(chipsClone)
  }

  const helperSetChips = ({ value, key }) => {
    const chipsClone = chips.slice()
    chipsClone.splice(key, 1, ...value)
    setChips(chipsClone)
  }

  const splitChips = ({ event, key }) => {
    const val = makeChips(event.target.value)
    helperSetChips({
      value: val,
      key,
    })
  }

  const mainChipConvertToChip = ({ event, key }) => {
    const chipValue = event.target.value
    const isInputEmpty = !!event.target.value
    if (isQuotesClosed(chipValue)) {
      removeError(key)
      if (isInputEmpty) setChips([...chips, ''])
    } else {
      addError(key)
    }
  }

  const handleChip = ({ event, key }) => {
    if (event.target.value === '') {
      removeChip(key)
    } else {
      helperSetChips({
        value: [event.target.value],
        key,
      })
    }
  }

  useEffect(() => {
    onChange(chips.join(','))
  }, [chips, onChange])

  return (
    <div className="Chips">
      <ul className="ChipsInput">
        {chips.map((chip, i) =>
          i < chips.length - 1 ? (
            <li
              key={i}
              className={`ChipsInput__tag${
                error.keys.includes(i) ? ' error' : ''
              }`}
            >
              <span className="hidden">{chip}</span>
              <input
                className="ChipsInput-tag__input"
                type="text"
                value={chip}
                style={{
                  width: chip.length + 1 + 'ch',
                }}
                onBlur={(e) => splitChips({ event: e, key: i })}
                onChange={(e) => handleChip({ event: e, key: i })}
              />
              <button className="close-button" onClick={() => removeChip(i)}>
                <CloseIcon className="close-icon" />
              </button>
            </li>
          ) : null
        )}
        <input
          className={`ChipsInput__input${
            error.keys.includes(chips.length - 1) ? ' error' : ''
          }`}
          type="text"
          value={chips[chips.length - 1]}
          placeholder={chips.length > 1 ? '' : 'Введите'}
          onBlur={(e) =>
            mainChipConvertToChip({ event: e, key: chips.length - 1 })
          }
          onChange={(e) => splitChips({ event: e, key: chips.length - 1 })}
        />
      </ul>
      <label
        className={`ChipsInput__error${error.keys.length ? ' error' : ''}`}
      >
        {error.text}
      </label>
    </div>
  )
}

export default ChipsInput
