import './ChipsInput.scss'
import { useCallback, useEffect, useRef, useState } from 'react'
import { makeChips } from './makeChips'
import Chip from './Chip'
import { MainChip } from './MainChip'
import { disableTextSelection } from './disableTextSelection'

function ChipsInput({ value, onChange }) {
  const [chips, setChips] = useState(makeChips(value))
  const [error, setError] = useState({
    text: 'Закройте кавычки с двух сторон',
    keys: [],
  })
  const [selection, setSelection] = useState({
    isStarted: false,
    list: [],
  })
  const chipsRef = useRef(null)

  const isQuotesClosed = (value) => (value.match(/"/g) || []).length % 2 === 0

  const removeErrors = useCallback((keyList = []) => {
    const errorKeys = error.keys.slice()
    keyList
      .slice()
      .sort((a, b) => b - a)
      .forEach((key) => {
        const index = error.keys.indexOf(key)
        if (index !== -1) {
          errorKeys.splice(index, 1)
        }
      })
    setError((prevState) => ({
      text: prevState.text,
      keys: errorKeys,
    }))
  }, [error.keys])

  const addError = ({ key }) => {
    setError((prevState) => ({
      text: prevState.text,
      keys: [...error.keys, key],
    }))
  }
  console.log(error)

  const removeChips = useCallback((keyList = []) => {
    const chipsClone = chips.slice()
    keyList
      .slice()
      .sort((a, b) => b - a)
      .forEach((key) => {
        chipsClone.splice(key, 1)
      })
    setChips(chipsClone)
    removeErrors(keyList)
  }, [chips, removeErrors])

  const setChipsHelper = ({ value, key }) => {
    const chipsClone = chips.slice()
    chipsClone.splice(key, 1, ...value)
    setChips(chipsClone)
  }

  const splitChipsOnChange = ({ event, key }) => {
    const chipValue = event.target.value
    if (isQuotesClosed(chipValue)) {
      removeErrors([key])
    }
    const chips = makeChips(chipValue)
    const filteredChips = chips.filter(
      (element, i) => element !== '' || i === chips.length - 1
    )
    setChipsHelper({
      value: filteredChips,
      key,
    })
  }

  const splitChipsOnBlur = ({ event, key }) => {
    const chipValue = event.target.value
    if (isQuotesClosed(chipValue)) {
      const chips = makeChips(chipValue)
      const filteredChips = chips.filter((element) => element !== '')
      setChipsHelper({
        value: filteredChips,
        key,
      })
      removeErrors([key])
    } else {
      addError({key})
    }
  }

  const handleMainChip = ({ event, key }) => {
    const chipValue = event.target.value
    const isInputEmpty = !!event.target.value
    if (isQuotesClosed(chipValue)) {
      if (isInputEmpty) setChips([...chips, ''])
      removeErrors([key])
    } else {
      addError({key})
    }
  }

  const handleChip = ({ event, key }) => {
    const chipValue = event.target.value
    if (isQuotesClosed(chipValue)) {
      removeErrors([key])
    }
    if (chipValue === '') {
      removeChips([key])
    } else {
      setChipsHelper({
        value: [chipValue],
        key,
      })
    }
  }

  const handleKeyPress = ({ event, key }) => {
    if (
      event.key === 'Backspace'&&
      event.target.selectionEnd === 0 &&
      event.target.selectionStart === 0 &&
      selection.list.length === 0
    ) {
      removeChips([key - 1])
    }
  }

  const addToSelection = ({ key }) => {
    if (selection.isStarted && !selection.list.includes(key)) {
      disableTextSelection()
      setSelection((prevState) => ({
        list: [...prevState.list, key],
        isStarted: prevState.isStarted,
      }))
    }
  }
  const startSelection = useCallback(() => {
    if (!selection.isStarted) {
      setSelection((prevState) => ({
        list: prevState.list,
        isStarted: true,
      }))
    }
  },[selection.isStarted])
  const endSelection = useCallback(() => {
    if (selection.isStarted) {
      setSelection((prevState) => ({
        list: prevState.list,
        isStarted: false,
      }))
    }
  },[selection.isStarted])

  const resetSelection = useCallback(() => {
    if (!selection.isStarted) {
      setSelection({ ...selection, list: [] })
    }
  },[selection])

  useEffect(() => {
    onChange(chips.join(','))

    const deleteSelection = (event) => {
      if (event.key === 'Delete') {
        removeChips(selection.list)
      }
      resetSelection()
    }

    const mouseDownSelection = () => {
      resetSelection()
      startSelection()
    }

    document.addEventListener('keyup', deleteSelection)
    document.addEventListener('mousedown', mouseDownSelection)
    document.addEventListener('mouseup', endSelection)
    return () => {
      document.removeEventListener('keyup', deleteSelection)
      document.removeEventListener('mousedown', mouseDownSelection)
      document.removeEventListener('mouseup', endSelection)
    }
  }, [chips, onChange, removeChips, resetSelection, selection.list, startSelection, endSelection])

  return (
    <div
      className="Chips"
      onMouseLeave={() => {
        endSelection()
      }}
      tabIndex={-1}
      ref={chipsRef}
    >
      <ul className="ChipsInput">
        {chips.map((chip, i) =>
          i < chips.length - 1 ? (
            <Chip
              key={i}
              error={error}
              searchElement={i}
              selection={selection}
              chip={chip}
              onBlur={(event) => splitChipsOnBlur({ event, key: i })}
              onChange={(event) => handleChip({ event, key: i })}
              closeButtonOnClick={() => removeChips([i])}
              onMouseOver={() => addToSelection({ key: i })}
            />
          ) : null
        )}
        <MainChip
          error={error}
          strings={chips}
          onBlur={(event) => handleMainChip({ event, key: chips.length - 1 })}
          onChange={(event) =>
            splitChipsOnChange({ event, key: chips.length - 1 })
          }
          onKeyDown={(event) =>
            handleKeyPress({ event, key: chips.length - 1 })
          }
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
