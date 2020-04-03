import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Header extends React.Component {
  render() {
    return (
      <div>
	<h1>808</h1>
	<button className="play">
	  Play
	</button>
	<button className="stop">
	  Stop
	</button>
	<input type="number" id="bpm" name="quantity" min="0" value={128}></input>
	<label for="bpm">BPM</label>
      </div>
    );
  }
}

class Drums extends React.Component {
  render() {
    const drumNames = ['Kick', 'Snare', 'Open Hat', 'Closed Hat'];

    return (
      <table>
	<tr>
 	  <th></th>
	  { Array(16).fill('').map((_val, index) => (
	    <th>{index + 1}</th>
	  ))}
	</tr>
	{ drumNames.map((drumName) => (
	  <Drum name={drumName} />
	))}
      </table>
    );
  }
}

class Drum extends React.Component {
  render() {
    return (
      <tr>
	<td>{this.props.name}</td>
	{ Array(16).fill('').map((_val, index) => (
	  <Step />
	))}
      </tr>
    );
  }
}

class Step extends React.Component {
  render() {
    return (
      <td>Step</td>
    );
  }
}

class Player extends React.Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

class DrumKit extends React.Component {
  render() {
    return (
      <div>
	<Header/>
	<Drums/>
	<Player/>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <DrumKit />,
  document.getElementById('root')
);
