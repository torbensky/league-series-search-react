import React from 'react';
import {render} from 'react-dom';

import LeagueSeriesBrowser from './LeagueSeriesBrowser.jsx';

class App extends React.Component {
  render () {
    return (<LeagueSeriesBrowser />);
    }
}

render(<App/>, document.getElementById('app'));