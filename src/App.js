import './App.scss'
import ChipsInput from './components/ChipsInput/ChipsInput'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState('это первый чипс, это "второй," чипс')
  return (
    <>
      <div className="Logo">
        <img className="Logo__img" src={'/logo512.png'} alt="Chips" />
      </div>
      <div className="App">
        <ChipsInput value={value} onChange={setValue} />
        <p className="App__string">
          Строка: <br />
          {value}
        </p>
      </div>
      <div className="Footer">
        <p className="p">
          Made by{' '}
          <a
            className="href small"
            href="https://syfleshka.github.io/portfolio/"
          >
            Alex D.
          </a>
          {' '}and vector by{' '}
          <a
            className="href small"
            href="https://www.freepik.com/vectors/snack-food"
          >
            freepik
          </a>
        </p>
      </div>
    </>
  )
}

export default App
