import { useState } from 'react'
import Body from './Body' 
import { Provider } from 'react-redux'
import appStore from '../assets/appStore'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
      <Provider store={appStore}>
      <Body/>

      </Provider>
    </div>
  )
}

export default App
