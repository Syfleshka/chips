export function MainChip({ strings, onBlur, onChange, onKeyDown }) {
  return (
    <input
      className={`ChipsInput__input`}
      type="text"
      onKeyDown={onKeyDown}
      value={strings[strings.length - 1]}
      placeholder={strings.length > 1 ? '' : 'Введите'}
      onBlur={onBlur}
      onChange={onChange}
    />
  )
}
