import './assets/styles/styles.scss';
import {createElement} from 'react';
import {render} from 'react-dom';

import {App} from './components/App';

render(createElement(App), $('#app')[0]);
