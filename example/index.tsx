// import 'react-app-polyfill/ie11';
import * as React from 'react';
import { IDBProvider } from '../.';
import Articles from './articles';
import { models } from './core/db/models';

const App = () => {
  return (
    <IDBProvider name="DB" models={models}>
      <Articles />
    </IDBProvider>
  );
};

try {
  const createRoot = require('react-dom/client');

  const root = createRoot(document.getElementById('root')!);
  root.render(<App />);
} catch (err) {
  const ReactDOM = require('react-dom');

  ReactDOM.render(<App />, document.getElementById('root'));
}
