import './App.css'
import ChipsInput from './components/ChipsInput/ChipsInput'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState('это первый чипс, это "второй," чипс')
  return (
    <div className="App">
      <header className="App-header">
        <ChipsInput value={value} onChange={setValue} />
        <p>
          Строка: <br />
          {value}
        </p>
      </header>
    </div>
  )
}

export default App
