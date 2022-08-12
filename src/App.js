import './App.css'
import ChipsInput from './components/ChipsInput/ChipsInput'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState('это первый чипс, это "второй," чипс')
  return (
    <div className="App">
      <ChipsInput value={value} onChange={setValue} />
      <p>
        Строка: <br />
        {value}
      </p>
    </div>
  )
}

export default App
