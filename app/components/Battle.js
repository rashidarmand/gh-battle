import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

const ptString = PropTypes.string.isRequired;
const ptFunc = PropTypes.func.isRequired;

class PlayerInput extends React.Component {
  static propTypes = {
    id: ptString,
    label: ptString,
    onSubmit: ptFunc
  }

  static defaultProps = { label: 'Username' }

  state = { username: '' }

  handleChange = ({ target }) => {
    const value = target.value;

    this.setState(_=> ({ username: value }));
  }

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }

  render() {
    const { username } = this.state;
    const { label } = this.props;
    const { handleSubmit, handleChange } = this;

    return (
      <form className='column' onSubmit={ handleSubmit }>
        <label className='header' htmlFor="username">{ label }</label>
        <input 
          id="username"
          placeholder="Github Username"
          type="text"
          autoComplete="off" 
          value={ username }
          onChange={ handleChange } />
        <button
          className='button'
          type='submit'
          disabled={ !username }>Submit</button>
      </form>
    )
  }
}

export default class Battle extends React.Component {
  state = {
    playerOneName: '',
    playerTwoName: '',
    playerOneImage: null,
    playerTwoImage: null
  }

  handleSubmit = (id, username) => {
    this.setState(_=> ({
      [id + 'Name']: username,
      [id + 'Image']: `https://github.com/${username}.png?size=200`
    }));
  }

  handleReset = (id) => {
    this.setState(_=> ({
      [id + 'Name']: '',
      [id + 'Image']: null
    }));
  }

  render() {
    const { match } = this.props;
    const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;
    const { handleReset, handleSubmit } = this;
    
    return (
      <div>
        <div className="row">
          {
            !playerOneName &&
              <PlayerInput
                id='playerOne'
                label='Player One'
                onSubmit={ handleSubmit } />
          }
          {
            playerOneImage !== null &&
              <PlayerPreview avatar={ playerOneImage } username={ playerOneName }>
                <button
                  className='reset'
                  onClick={ () => handleReset('playerOne') }>
                    Reset
                </button>
              </PlayerPreview>
          }
          {
            !playerTwoName &&
              <PlayerInput
                id='playerTwo'
                label='Player Two'
                onSubmit={ handleSubmit } />
          }
          {
            playerTwoImage !== null &&
              <PlayerPreview avatar={ playerTwoImage } username={ playerTwoName }>
                <button
                  className='reset'
                  onClick={ () => handleReset('playerTwo') }>
                    Reset
                </button>
              </PlayerPreview>
          }
        </div>
        {
          playerOneImage && playerTwoImage &&
          <Link
            className="button"
            to={{
              pathname: `${ match.url }/results`,
              search: `?playerOneName=${ playerOneName }&playerTwoName=${ playerTwoName }`
            }}>
              Battle
          </Link>
        }
      </div>
    )
  }
}
