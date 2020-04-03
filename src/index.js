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
	<div className="control">
	  <label htmlFor="bpm">BPM: </label>
	  <input type="number" id="bpm" name="quantity" min="0" value={this.props.BPM} onChange={() => {}}></input>
	</div>
	<div className="control">
	  <label htmlFor="sequences">Sequence: </label>
	  <select id="sequence">
	    { Object.keys(this.props.sequences).map((sequenceName) => (<option key={sequenceName} value={sequenceName}>{sequenceName}</option>)) }
	  </select>
	</div>
      </div>
    );
  }
}

class Drums extends React.Component {
  render() {
    const currentSequence = this.props.sequences[this.props.currentSequenceName];
    return (
      <table>
	<thead>
	  <tr>
	    <th></th>
	    { Object.values(currentSequence)[0].map((_value, index) => (
	      <th key={index + 1}>{index + 1}</th>
	    ))}
	  </tr>
	</thead>
	<tbody>
	  { Object.keys(currentSequence).map((drumName) => (
	    <Drum key={drumName} name={drumName} steps={currentSequence[drumName]}/>
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
	{ this.props.steps.map((_val, index) => (
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

class DrumKit extends React.Component {
  constructor(props) {
    super(props);
    const sequences = this.buildSequences();
    this.state = {
      BPM: 128,
      sequences: sequences,
      currentSequenceName: Object.keys(sequences)[0],
      currentStep: 1,
      currentSecond: 1,
    }
  }

  buildSequences() {
    return {
      'Custom' : this.props.drumNames.reduce((sequence, drumName) => Object.assign(sequence, { [drumName]: Array(this.props.stepCount).fill('') }), {})
    }
  }

  render() {
    return (
      <div>
	<Header BPM={this.state.BPM} sequences={this.state.sequences} currentSequenceName={this.state.currentSequenceName}/>
	<Drums sequences={this.state.sequences} currentSequenceName={this.state.currentSequenceName}/>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <DrumKit drumNames={['Kick', 'Snare', 'Open Hat', 'Closed Hat']} stepCount={16}/>,
  document.getElementById('root')
);
