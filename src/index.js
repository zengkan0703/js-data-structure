import React from 'react';
import ReactDOM from 'react-dom';

import AdjacencyMatrix from './graph';

import 'antd/dist/antd.css'; 
import './style.scss';

ReactDOM.render((
  <AdjacencyMatrix/>
),document.getElementById('app'))