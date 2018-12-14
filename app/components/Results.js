import React from 'react';
import queryString from 'query-string';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

const ptObject = PropTypes.object.isRequired;
const ptNum = PropTypes.number.isRequired;
const ptString = PropTypes.string.isRequired;

function Profile ({ info }) {
  const { avatar_url, login, name, location, company, followers, following, public_repos, blog } = info;
  return (
    <PlayerPreview avatar={ avatar_url } username={ login }>
      <ul className="space-list-items">
        { name && <li>{ name }</li> }
        { location && <li>{ location }</li> }
        { company && <li>{ company }</li> }
        <li>Followers: { followers }</li>
        <li>Following: { following }</li>
        <li>Public Repos: { public_repos }</li>
        { blog && <li><a href={ blog }>{ blog }</a></li> }
      </ul>
    </PlayerPreview>
  );
}

Profile.propTypes = { info: ptObject };

function Player ({ label, score, profile }) {
  return (
    <div>
      <h1 className="header">{ label }</h1>
      <h3 style={{ textAlign: 'center' }}>Score: { score }</h3>
      <Profile info={ profile }/>
    </div>
  );
}

Player.propTypes = {
  label: ptString,
  score: ptNum,
  profile: ptObject
};

export default class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true
  };

  async componentDidMount() {
    const { playerOneName, playerTwoName } = queryString.parse(this.props.location.search);

    const players = await api.battle([ playerOneName, playerTwoName ])

    if(players === null) {
      return this.setState(_=> ({
        error: `Looks like there was an error. Please check that both users exist on Github!`,
        loading: false
      }))
    }

    this.setState(_=> ({
      error: null,
      winner: players[0],
      loser: players[1],
      loading: false
    }));
    
  }

  render() {
    const { error, winner, loser, loading } = this.state;

    if(loading === true) {
      return <Loading />
    }

    if(error) {
      return (
        <div>
          <p>{ error }</p>
          <Link to='/battle'>Reset</Link>
        </div>
      );
    }
    
    return (
      <div>
        <div className="row"><Link to="/battle" className='button'>Play Again</Link></div>
        <div className="row">
          <Player 
            label='Winner'
            score={ winner.score }
            profile={ winner.profile }/>
          <Player 
            label='Loser'
            score={ loser.score }
            profile={ loser.profile }/>
        </div>
      </div>
    )
  }
}
