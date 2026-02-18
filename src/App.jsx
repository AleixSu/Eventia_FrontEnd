import { Outlet } from 'react-router-dom'
import './App.css'
import { useModalContext } from './context/ModalContext'
import LoginRegister from './pages/loginRegister/LoginRegister'
import Header from './components/Layout/header/Header'
import useScrollToTop from './utils/Hooks/useScrollToTop'

function App() {
  const { isLoginOpen } = useModalContext()

  useScrollToTop()
  return (
    <div>
      <Header />
      <main>
        <Outlet />
        {isLoginOpen ? <LoginRegister /> : null}
      </main>
    </div>
  )
}

export default App
