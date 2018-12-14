import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
import Loading from './Loading';

const ptString = PropTypes.string.isRequired;
const ptFunc = PropTypes.func.isRequired;
const ptArray = PropTypes.array.isRequired;

// Stateless Functional Component
function SelectLanguage ({ selectedLanguage, onSelect }) {
  let languages = ['All', 'JavaScript', 'Ruby', 'Python', 'Java', 'CSS'];

  return (
    <ul className='languages'>
      {
        languages.map(lang => ( 
          <li
            style={ lang === selectedLanguage ? { color: '#d0021b' } : null }
            onClick={ () => onSelect(lang) } 
            key={ lang }>
            { lang }
          </li> )
        )
      }
    </ul>
  )
}
// Prop Validation
SelectLanguage.propTypes = {
  selectedLanguage: ptString,
  onSelect: ptFunc
}

function RepoGrid ({ repos }) {
  return (
    <ul className="popular-list">
      {
        repos.map(({ name, owner, html_url, stargazers_count }, index) => (
          <li key={ name } className="popular-item" >
            <div className="popular-rank">#{ index + 1 }</div>
            <ul className="space-list-items">
              <li>
                <img
                  className="avatar"
                  src={ owner.avatar_url }
                  alt={`Avatar for ${ owner.login }`} />
              </li>
              <li>
                <a href={ html_url }>{ name }</a>
              </li>
              <li>
                @{ owner.login }
              </li>
              <li>
                { stargazers_count } stars
              </li>
            </ul>
          </li>
          )
        )
      }
    </ul>
  )
}

RepoGrid.propTypes = { repos: ptArray }

export default class Popular extends React.Component {
  state = {
    selectedLanguage: 'All',
    repos: null
  };

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = async (lang) => {
    this.setState(_=> ({
      selectedLanguage: lang,
      repos: null
    }));

    const repos = await api.fetchPopularRepos(lang)
    this.setState(_=> ({ repos }));
  }

  render() {
    const { selectedLanguage, repos } = this.state;
    const { updateLanguage } = this;
    return (
      <div>
        <SelectLanguage 
          selectedLanguage={ selectedLanguage }
          onSelect={ updateLanguage }
        />
        {
          !repos
          ? <Loading />
          : <RepoGrid repos={ repos } />
        }
      </div>
    )
  }
}