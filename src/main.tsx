import ReactDOM from 'react-dom'

import App from 'components/app'

import { StoreContextProvider } from 'src/hooks/use-store'

ReactDOM.render(
  <StoreContextProvider>
    <App />
  </StoreContextProvider>,
  document.querySelector('#app')
)
