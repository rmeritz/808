import React from 'react';
import ReactDOM from 'react-dom';
import cloneDeep from 'lodash/cloneDeep';
import './index.css';

class Header extends React.Component {
  render() {
    return (
      <div>
	<h1>808</h1>
	<button className="control" onClick={this.props.handlePlay}>
	  Play
	</button>
	<button className="control" onClick={this.props.handleStop}>
	  Stop
	</button>
	<div className="control">
	  <label htmlFor="bpm">BPM: </label>
	  <input type="number" id="bpm" name="quantity" min="0" value={this.props.BPM} onChange={this.props.handleBPMChange}></input>
	</div>
	<div className="control">
	  <label htmlFor="sequences">Sequence: </label>
	  <select id="sequence" onChange={this.props.handleSequenceChange} value={this.props.currentSequenceName}>
	    { this.props.sequenceNames.map((sequenceName) => (
	      <option key={sequenceName} value={sequenceName}>{sequenceName}</option>
	    )) }
	  </select>
	</div>
      </div>
    );
  }
}

class Drums extends React.Component {
  render() {
    return (
      <table>
	<thead>
	  <tr>
	    <th></th>
	    { Object.values(this.props.currentSequence)[0].map((_value, index) => (
	      <th key={index + 1} className={`drum ${this.props.isPlaying && this.props.currentStep === (index + 1) ? 'drum--playing' : '' }`}>{index + 1}</th>
	    ))}
	  </tr>
	</thead>
	<tbody>
	  {this.props.drums}
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
	{this.props.steps}
      </tr>
    );
  }
}

class Step extends React.Component {
  render() {
    return (
      <td>
	<button className={`step ${this.props.isOn ? "step--on" : ""}`} onClick={this.props.handleClick}>
	</button>
      </td>
    );
  }
}

class DrumKit extends React.Component {
  constructor(props) {
    super(props);
    this.handleStepClick = this.handleStepClick.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleBPMChange = this.handleBPMChange.bind(this);
    this.handleSequenceChange = this.handleSequenceChange.bind(this);
    this.state = {
      BPM: 128,
      sequences: {
	'Custom': this.buildSequence({}),
	'4 on the Floor': this.buildSequence({ 'Kick': [0, 4, 8, 12], 'Snare': [4, 12], 'Open Hat': [2, 6, 10, 14] }),
	'House': this.buildSequence({ 'Kick': [0, 4, 8, 12], 'Open Hat': [0, 2, 4, 6, 8, 10, 12, 14], 'Closed Hat': [1, 3, 5, 7, 9, 11, 13, 15] }),
	'Pop': this.buildSequence({ 'Kick': [0, 2, 5, 8, 11], 'Snare': [4, 12], 2: [11], 'Closed Hat': [0, 2, 4, 6, 8, 10, 12, 14] }),
      },
      currentSequenceName: 'Custom',
      currentStep: 1,
      isPlaying: false,
    }
  }

  buildSequence(sequenceShortHand) {
    return this.props.drumNames.reduce((sequence, drumName) => {
      const steps = Array(this.props.stepCount).fill(false);
      if (sequenceShortHand[drumName]) {
	sequenceShortHand[drumName].map((i) => steps[i] = true);
      }
      return Object.assign(sequence, { [drumName]: steps });
    }, {});
  }

  handleStepClick(drumName, stepIndex) {
    const sequences = cloneDeep(this.state.sequences);
    sequences['Custom'] = cloneDeep(sequences[this.state.currentSequenceName]);
    sequences['Custom'][drumName][stepIndex] = !(sequences['Custom'][drumName][stepIndex]);
    this.setState({ sequences: sequences, currentSequenceName: 'Custom' });
  }

  handlePlay() {
    const minsPerBeat = 1 / this.state.BPM;
    const msPerMin = 60 * 1000;
    const beatsPerBar = 4;
    const barsPerStep = 1 / this.props.stepCount;
    const stepsPerMs = minsPerBeat * msPerMin * beatsPerBar * barsPerStep;

    this.setState({isPlaying: true});

    setInterval(() => {
      if (this.state.isPlaying) {
	this.setState({
	  currentStep: this.state.currentStep === 16 ? 1 : this.state.currentStep + 1,
	});
      }
    }, stepsPerMs);
  }

  handleStop() {
    this.setState({
      currentStep: 1,
      isPlaying: false,
    });
  }

  handleBPMChange(event) {
    this.setState({ BPM: event.target.value });
  }

  handleSequenceChange(event) {
    this.setState({ currentSequenceName: event.target.value});
  }

  render() {
    const currentSequence = this.state.sequences[this.state.currentSequenceName];

    return (
      <div>
	<Header
          BPM={this.state.BPM}
          sequenceNames={Object.keys(this.state.sequences)}
	  currentSequenceName={this.state.currentSequenceName}
          handlePlay={this.handlePlay}
          handleStop={this.handleStop}
          handleBPMChange={this.handleBPMChange}
          handleSequenceChange={this.handleSequenceChange}
	/>
	<Drums
	  currentSequence={currentSequence}
	  currentStep={this.state.currentStep}
	  isPlaying={this.state.isPlaying}
	  drums={ Object.keys(currentSequence).map((drumName) => (
	    <Drum
              key={drumName}
              name={drumName}
	      steps={ currentSequence[drumName].map((value, index) => (
		<Step key={index} isOn={value} handleClick={() => this.handleStepClick(drumName, index)}/>
	      ))}
            />
	  ))}
         />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <DrumKit drumNames={['Kick', 'Snare', 'Open Hat', 'Closed Hat']} stepCount={16}/>,
  document.getElementById('root')
);
