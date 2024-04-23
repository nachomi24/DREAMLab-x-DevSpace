import Menu from '../Navbar/Navbar'
import Chat from './componentes/chat/chat'
import Bot from './componentes/dreamy/dreamy'

const App = () => {
  return (
    <div>
      <Menu />
      <Bot/>
      <Chat/>
      {/* <Bot/>
      <Chat/> */}
      
    </div>
  )
}

export default App