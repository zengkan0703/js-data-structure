import React from 'react';
import ReactDOM from 'react-dom';

import AdjacencyMatrix from './graph';
import Tree from "./binary-tree/example/demo";

import 'antd/dist/antd.css'; 
import './style.scss';

ReactDOM.render((
  <Tree/>
),document.getElementById('app'))