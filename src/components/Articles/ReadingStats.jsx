import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  readingStats,
} from '../../redux/actions/actionCreators/profile';
import '../../assets/scss/resetPassword.scss';
import Navbar from '../Layout/navBar';
import Spinner from '../Spinner/Spinner.jsx';

export class ReadingStats extends Component {
  state = {
    myreadingStats: [],
  }

  componentDidMount() {
    const {
      readingStats,
    } = this.props;
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      window.location = '/login';
    }
    readingStats();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.theReadingStats !== null) {
      this.setState({
        myreadingStats: nextProps.theReadingStats,
      });
    }
  }

  render() {
    const {
      loading, theReadingStats, readingStatsTot,
    } = this.props;
    const {
      myreadingStats,
    } = this.state;

    const allreadingStats = myreadingStats.map(stats => (
      <div key={stats.totalArticleRead}>
        <tbody>
          <tr>
            <td className="article-title">
              <div className="article-t">
                <a href={`article/${stats.article.slug}`} target="_blank">{stats.article.title}</a>
              </div>
              <Link to={`article/${stats.article.slug}`}><div className="cardHeader"> View article</div></Link>
            </td>
            <td className="article-Number">
              <span>
                {stats.totalArticleRead}
                {' '}
              </span>
            </td>
            <td className="article-Last">
              {/* <div><span>{stats.lastTime}</span></div> */}
              <div>
                <span>
                  {new Date(stats.lastTime).getDate()}
                  {'/'}
                  {new Date(stats.lastTime).getMonth() + 1}
                  {'/'}
                  {new Date(stats.lastTime).getFullYear()}
                  {' '}
                  {new Date(stats.lastTime).toLocaleTimeString('en-US')}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </div>
    ));

    return (
      <Fragment>
        <Navbar />
        {loading === true && theReadingStats === null ? (
          <section className="profile-section">
            <Spinner />
          </section>
        ) : (
          <div className="all-stats">
            <div className="view-stats">
              <h1>Stats</h1>
              <h3>
Total articles read:
                {' '}
                {readingStatsTot}
              </h3>
              <table>
                <thead>
                  <tr>
                    <th>
                      <td className="article-title"><h6>Article</h6></td>
                      <td className="article-Number"><h6> Number of reading </h6></td>
                      <td className="article-Last"><h6> Last viewed</h6></td>
                    </th>
                  </tr>
                </thead>
                {allreadingStats}
              </table>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.profile.loading,
  theReadingStats: state.profile.readingStat,
  readingStatsTot: state.profile.readingStatTot,
});

export default connect(mapStateToProps, { readingStats })(ReadingStats);
