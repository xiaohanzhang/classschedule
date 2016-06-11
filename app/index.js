import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store';
import App from './containers/App';
import './app.less';

const store = configureStore();

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);



