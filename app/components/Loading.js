import React from 'react';
import PropTypes from 'prop-types';

const ptString = PropTypes.string.isRequired;
const ptNum = PropTypes.number.isRequired;

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
};

export default class Loading extends React.Component {
  static propTypes = {
    text: ptString,
    speed: ptNum
  };
  
  static defaultProps = {
    text: 'LOADING',
    speed: 300
  };
  
  state = { text: this.props.text };


  componentDidMount() {
    const { text, speed } = this.props;
    const stopper = text + '...';

    this.interval = window.setInterval(_=> {
      this.state.text === stopper
        ? this.setState(_=> ({ text }))
        : this.setState(prevState => ({ text: prevState.text + '.' }));
    }, speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    const { content } = styles;
    const { text } = this.state;
    return (
      <p style={ content }>{ text }</p>
    );
  }
}
