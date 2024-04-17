import Menu from '../Navbar/Navbar'
import Header from './componentes/header/Header'
import Secciones from './componentes/secciones/Secciones'
import Secciones2 from './componentes/secciones2/Secciones2'
import Descripcion from './componentes/descripcion/Descripcion'

const App = () => {
  return (
    <div>
      <Menu />
      <Header />
      <Descripcion />
      <Secciones />
      <Secciones2 />
    </div>
  )
}

export default App