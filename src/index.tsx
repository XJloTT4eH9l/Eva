import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import store from './store';
import App from './containers/App/App';
import './i18n';
import './styles/index.scss';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter basename='/Eva'>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </Provider>
);

//basename='/Eva/'