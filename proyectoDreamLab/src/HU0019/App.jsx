import Navbar from '../Navbar/Navbar'
import Content from './Components/Content/Content'

const matriculaKaren = 'A00835268';

function App() {
  return (
    <div>
      <Navbar />
      <Content matricula={matriculaKaren}/>
    </div>
  )
}

export default App
