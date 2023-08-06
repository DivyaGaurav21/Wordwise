import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Product from './pages/Product'
import Homepage from './pages/Homepage'
import Pricing from './pages/Pricing'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './components/AppLayout'
import Login from './pages/Login'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'
import { CitiesProvider } from './contexts/CitiesContext'



function App() {


  // console.log(cities)

  return (
    <CitiesProvider>
    <BrowserRouter>
      <Routes>
        {/* Default Route  */}
        {/* <Route path="/" element={<Homepage />} /> */}
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="app" element={<AppLayout />}>
          {/* default route  */}
          {/* <Route index element={<CityList cities={cities} isLoading={isLoading} />} /> */}
          <Route index element={<Navigate to='cities' />} />
            <Route path="cities" element={<CityList />} />
          <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    </CitiesProvider>
  )
}

export default App
