import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getGithubRepos } from "../../actions/profile.action";
import Spinner from "../layout/Spinner";

const ProfileGithub = ({ username, dispatch, repos }) => {
  useEffect(() => {
    dispatch(getGithubRepos(username));
  }, [getGithubRepos, username]);
  console.log(repos);
  return (
    <div className="profile-github">
      <h3 className="">
        <i className="fab fa-github"></i> Github Repos
      </h3>
      {repos === null || repos.length == 0 ? (
        <Spinner />
      ) : (
        repos.map((repo) => (
          <div key={repo._id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars: {repo.stargazers_count}
                </li>
                <li className="badge badge-dark">
                  Watchers: {repo.watchers_count}
                </li>
                <li className="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propType = {
  username: PropTypes.string.required,
  repos: PropTypes.array.isRequired,
  dispatch: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ repos: state.profile.repos });
export default connect(mapStateToProps)(ProfileGithub);
