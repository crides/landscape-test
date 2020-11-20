import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './js/components/root.js';
import { api } from './js/api.js';
import { subscription } from "./js/subscription.js";

import './css/indigo-static.css';
import './css/fonts.css';
import './css/custom.css';

api.setAuthTokens({
  ship: window.ship
});

window.urb = new window.channel();

subscription.start();

window.subscriptionId = window.urb.subscribe("zod", "test", "/poke-primary", () => alert("conn"), (j) => alert(j), () => alert("kick"))
ReactDOM.render((
  <Root />
), document.querySelectorAll("#root")[0]);
