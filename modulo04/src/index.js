import React from 'react';
import { render } from 'react-dom';

import App from './App';

/* 
  Importa o component app e diz onde ele deve ser renderizado,
  neste caso é na div cujo id é 'app'.
*/
render(<App />, document.getElementById("app"));