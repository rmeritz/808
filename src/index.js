import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Header extends React.Component {
  render() {
    return (
      <div>
	<h1>808</h1>
	<button className="control">
	  Play
	</button>
	<button className="control">
	  Stop
	</button>
	<input type="number" id="bpm" name="quantity" min="0" defaultValue={128} className="control"></input>
	<label htmlFor="bpm">BPM</label>
	<select id="sequence" className="control">
	  <option value="custom">Custom</option>
	  <option value="4-on-floor">4 on the floor</option>
	</select>
      </div>
    );
  }
}

class Drums extends React.Component {
  render() {
    const drumNames = ['Kick', 'Snare', 'Open Hat', 'Closed Hat'];

    return (
      <table>
	<thead>
	  <tr>
	    <th></th>
	    { Array(16).fill('').map((_val, index) => (
	      <th key={index + 1}>{index + 1}</th>
	    ))}
	  </tr>
	</thead>
	<tbody>
	  { drumNames.map((drumName) => (
	    <Drum key={drumName} name={drumName} />
	  ))}
	</tbody>
      </table>
    );
  }
}

class Drum extends React.Component {
  render() {
    return (
      <tr>
	<td className="drum-name">{this.props.name}</td>
	{ Array(16).fill('').map((_val, index) => (
	  <Step key={index + 1} />
	))}
      </tr>
    );
  }
}

class Step extends React.Component {
  render() {
    return (
      <td>
	<button className="step">
	</button>
      </td>
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
