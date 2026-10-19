import React from 'react';
import {createRoot} from 'react-dom/client';
import Notebook from './notebook';
import './globals.css';
import './atmosphere.css';
createRoot(document.getElementById('root')!).render(<Notebook/>);
