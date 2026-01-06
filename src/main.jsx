import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/home/Home.jsx'
import RouteNotFound from './pages/RouteNotFound/RouteNotFound.jsx'
import Location from './pages/location/Location.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ModalProvider } from './context/ModalContext.jsx'
import Event from './pages/event/Event.jsx'
import { FilterProvider } from './context/FilterContext.jsx'
import MyProfile from './pages/myProfile/MyProfile.jsx'
import AdminArea from './pages/adminArea/AdminArea.jsx'
import EventSelected from './pages/event/EventSelected.jsx'
import LocationSelected from './pages/location/LocationSelected.jsx'
import MyEvents from './pages/myProfile/MyEvents.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ModalProvider>
        <FilterProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<App />}>
                <Route index element={<Home />}></Route>
                <Route path='/Events' element={<Event />}></Route>
                <Route
                  path='/Events/Event/:id'
                  element={<EventSelected />}
                ></Route>
                <Route
                  path='/Locations/Location/:id'
                  element={<LocationSelected />}
                ></Route>
                <Route path='/Locations' element={<Location />}></Route>
                <Route path='/profile' element={<MyProfile />}></Route>
                <Route path='/my_events' element={<MyEvents />}></Route>
                <Route path='/admin_area' element={<AdminArea />}></Route>
                <Route path='*' element={<RouteNotFound />}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </FilterProvider>
      </ModalProvider>
    </AuthProvider>
  </StrictMode>
)
