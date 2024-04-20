import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

import { ThemeProvider as TailwindThemeProvider } from './components/theme-provider'

import Lab from './containers/Lab'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <TailwindThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <Routes>
            <Route path='/lab/*' element={<Lab />} />
          </Routes>
        </TailwindThemeProvider>
      </QueryParamProvider>
    </BrowserRouter>
  )
}

export default App
