import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class DrumKit extends React.Component {
  render() {
    return (
      <div>
	I am a DrumKit
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <DrumKit />,
  document.getElementById('root')
);
