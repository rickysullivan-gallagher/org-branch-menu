import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import Demo from './Demo';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <StyledEngineProvider injectFirst>
    <Demo />
  </StyledEngineProvider>
);
