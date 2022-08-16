import CloseIcon from './CloseIcon'
import { useState } from 'react'

function Chip({
  error,
  searchElement,
  selection,
  chip,
  onBlur,
  onChange,
  closeButtonOnClick,
  onMouseOver
}) {
  const [isSelected, setIsSelected] = useState(false)

  const selectChip = (event) => {
    const promise = new Promise((resolve) => {
      resolve(setIsSelected(true))
    })
    promise.then(() => event.target.focus())
  }
  const unSelectChip = (event) => {
    onBlur(event)
    setIsSelected(false)
  }
  return (
    <li
      className={`ChipsInput__tag${
        error.keys.includes(searchElement) ? ' error' : ''}${
        selection.list.includes(searchElement) ? ' selected' : ''}${
        isSelected ? ' active' : ''
      }`}
      onMouseOver={onMouseOver}
      onClick={(event) => {selectChip(event)}}
    >
      <input
        className="ChipsInput-tag__input"
        type="text"
        value={chip}
        style={{
          width: chip.length + 1 + 'ch',
        }}
        onBlur={(event) => {unSelectChip(event)}}
        onChange={onChange}
        disabled={selection.list.includes(searchElement) || !isSelected}
      />
      <button className="close-button" onClick={closeButtonOnClick}>
        <CloseIcon className="close-icon" />
      </button>
    </li>
  )
}

export default Chip
