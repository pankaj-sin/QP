import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './context/ThemeProvider';
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <HelmetProvider>
        <ThemeProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
    </HelmetProvider>
        
);

reportWebVitals();
