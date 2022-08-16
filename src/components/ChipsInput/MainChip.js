export function MainChip({ error, strings, onBlur, onChange, onKeyDown }) {
  return (
    <input
      className={`ChipsInput__input${
        error.keys.includes(strings.length - 1) ? ' error' : ''
      }`}
      type="text"
      onKeyDown={onKeyDown}
      value={strings[strings.length - 1]}
      placeholder={strings.length > 1 ? '' : 'Введите'}
      onBlur={onBlur}
      onChange={onChange}
    />
  )
}
