import React from 'react'
import { Provider } from 'react-redux'
import ImageSearchPage from './modules/imageSearch/components/ImageSearchPage'
import store from './core/store'
import './modules/core/stylesheets/Layout.scss'

function App() {
  return (
    <Provider store={store}>
      <div className="layout">
        <ImageSearchPage />
      </div>
    </Provider>
  );
}

export default App
