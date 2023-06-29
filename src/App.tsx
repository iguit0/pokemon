import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalStyle } from './styles/globalStyle'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<>Home</>} />
        <Route path='*' element={<>Not Found</>} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  )
}

export default App
