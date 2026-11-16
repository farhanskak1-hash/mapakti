import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRoot from './AppRoot';
import '../css/app.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<AppRoot />);
}
