import {render} from 'react-dom'
import ReduxTest from './app/ReduxTest';
import {Provider} from 'react-redux'
import store from './store/store'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

render( 
  <Provider store={store}>
    <ReduxTest />
  </Provider>,
  document.getElementById('root') 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
