/* eslint-disable global-require */
/* istanbul ignore file */
// Component handling hompage

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner.jsx';
import { getFeed } from '../../redux/actions/actionCreators';
import bookmarkIcon from '../../assets/icons/bookmark.svg';
import bookmarkGreen from '../../assets/icons/bookmarkBlack.svg';
import { bookmarkArticle, getAllBookmarks } from '../../redux/actions/actionCreators/bookMark';
import NavBar from '../Layout/Navbar.jsx';
import '../../assets/css/homepage.css';
import '../../assets/css/pagination.css';

export class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagValue: 'first' || this.props.page,
      bookmarkIcon,
      bookmarkGreen,
    };
    this.inputRef = React.createRef();
    this.btnLeft = React.createRef();
    this.btnRight = React.createRef();
    this.Span = React.createRef();
  }

  componentDidMount() {
    this.props.getFeed();
    this.props.getAllBookmarks();
    getAllBookmarks();
  }

  componentDidUpdate() {
    if (this.state.pagValue === 'first' && this.props.page !== undefined) {
      this.setState({ pagValue: this.props.page });
    }
    return false;
  }

  changePage = (e) => {
    this.setState({ pagValue: e.target.value });
  }

  toLastPage = (e) => {
    this.setState({ pagValue: e.target.value });
    this.props.getFeed(this.props.totalPages - 1);
  }

  checkPage = (e) => {
    if (e.key === 'Enter' && parseInt(e.target.value, 10) <= this.props.totalPages - 1) {
      this.setState({ pagValue: e.target.value });
      this.props.getFeed(this.state.pagValue);
    }

    return false;
  }

  changePaginationLeft = () => {
    if (this.props.page > 1) {
      this.inputRef.current.style.display = 'none';
      this.setState({ pagValue: this.props.previousPage });
      this.props.getFeed(this.props.previousPage);
    }
    return false;
  }

  changePaginationRight = () => {
    if (this.props.page < this.props.totalPages - 1) {
      this.setState({ pagValue: this.props.nextPage });
      this.props.getFeed(this.props.nextPage);
    }
    return false;
  }

  handleClick = (slug) => {
    const {
      bookmarkArticle,
    } = this.props;
    bookmarkArticle(slug);
  };

  render() {
    const {
      bookmarkIcon, bookmarkGreen,
    } = this.state;
    if (this.props.loading || this.props.articles[0] === undefined) {
      return <Spinner />;
    }
    const { articles, bookmarks } = this.props;
    return (
      <Fragment>
        <div data-test="homePage" className="feedHome homepage">
          <NavBar token={localStorage.getItem('jwtToken')} username={localStorage.getItem('username')} avatar={localStorage.getItem('image')} />
          <div className="theBody">
            <div className="headline disappear">
              <div className="headlinePop">
                <span>Most Recent</span>
              </div>
            </div>
            <div className="firstRow">
              <div className="firstRowFirst" style={{ backgroundImage: `url(${articles[0].image})` }}>
                <a href="crudArticle.html">
                  <Link to={`/article/${articles[0].slug}`}><h3 style={{ color: '#ffffff' }} className="fRT">{ articles[0].title }</h3></Link>
                </a>
                <small style={{ color: '#ffffff' }} className="fRST">{ articles[0].date }</small>
                <div className="profileDisplay pDFRF">
                  <img src={articles[0].profile} alt="" className="profImg pIFRF" />
                  <Link to={`/user-profile/${articles[0].author}`}><small className="profNameFeed pNFRF">{ articles[0].author }</small></Link>
                  <img src={bookmarks.includes(articles[0].id) ? bookmarkGreen : bookmarkIcon} onClick={() => this.handleClick(articles[0].slug)} alt="" className="profBookmark bmCD prof1" />
                </div>
              </div>
              <div className="secondRowFirst">
                <div className="subColumn sb1 sb2">
                  <Link to={`/article/${articles[1].slug}`}><div className="cardHeader">{ articles[1].title }</div></Link>
                  <small className="cardSpan">{articles[1].date}</small>
                  <br />
                  <div className="profileDisplay">
                    <img src={articles[1].profile} alt="" className="profImg sbCI" />
                    <Link to={`/user-profile/${articles[1].author}`}><span className="profNameFeed sbCN">{ articles[1].author }</span></Link>
                    <img src={bookmarks.includes(articles[1].id) ? bookmarkGreen : bookmarkIcon} onClick={() => this.handleClick(articles[1].slug)} alt="" className="profBookmark sbCBM prof2" />
                  </div>
                </div>

                <div className="subColumn sb1">
                  <Link to={`/article/${articles[2].slug}`}><div className="cardHeader">{ articles[2].title }</div></Link>
                  <small className="cardSpan">{articles[2].date}</small>
                  <br />
                  <div className="profileDisplay">
                    <img src={articles[2].profile} alt="" className="profImg sbCI" />
                    <Link to={`/user-profile/${articles[2].author}`}><span className="profNameFeed sbCN">{ articles[2].author }</span></Link>
                    <img src={bookmarks.includes(articles[2].id) ? bookmarkGreen : bookmarkIcon} onClick={() => this.handleClick(articles[2].slug)} alt="" className="profBookmark sbCBM prof3" />
                  </div>
                </div>
              </div>

              <div className="thirdRowFirst">
                <div className="subColumn sb22">
                  <Link to={`/article/${articles[3].slug}`}><div className="cardHeader">{ articles[3].title }</div></Link>
                  <small className="cardSpan">{articles[3].date}</small>
                  <br />
                  <div className="profileDisplay">
                    <img src={articles[3].profile} alt="" className="profImg sbCI" />
                    <Link to={`/user-profile/${articles[3].author}`}><span className="profNameFeed sbCN">{ articles[3].author }</span></Link>
                    <img src={bookmarks.includes(articles[3].id) ? bookmarkGreen : bookmarkIcon} onClick={() => this.handleClick(articles[3].slug)} alt="" className="profBookmark sbCBM prof4" />
                  </div>
                </div>

                <div className="subColumn sb22 sb224">
                  <Link to={`/article/${articles[4].slug}`}><div className="cardHeader">{ articles[4].title }</div></Link>
                  <small className="cardSpan">{articles[4].date}</small>
                  <br />
                  <div className="profileDisplay">
                    <img src={articles[4].profile} alt="" className="profImg sbCI" />
                    <Link to={`/user-profile/${articles[4].author}`}><span className="profNameFeed sbCN">{ articles[4].author }</span></Link>
                    <img src={bookmarks.includes(articles[4].id) ? bookmarkGreen : bookmarkIcon} onClick={() => this.handleClick(articles[4].slug)} alt="" className="profBookmark sbCBM prof5" />
                  </div>
                </div>
              </div>

            </div>

            <div className="secondRow">
              <div className="secRowDisplay1">
                <div className="secRowDiv displayDown">
                  <Link to={`/article/${articles[5].slug}`}><img src={articles[5].image} alt="" className="secRowImg" /></Link>
                  <div className="secRowCol">
                    <Link to={`/article/${articles[5].slug}`}><div className="sRCT sRCT223 cardHeader">{ articles[5].title }</div></Link>
                    <small className="cardSpan">{articles[5].date}</small>
                    <div className="profileDisplay sRCP">
                      <img src={articles[5].profile} alt="" className="sbPI sbCI" />
                      <Link to={`/user-profile/${articles[5].author}`}><span className="profNameFeed sbCN">{ articles[5].author }</span></Link>
                      <img src={bookmarks.includes(articles[5].id) ? bookmarkGreen : bookmarkIcon} onClick={() => this.handleClick(articles[5].slug)} alt="" className="profBookmark bmCD prof6" />
                    </div>
                  </div>
                </div>

                <div className="secRowDiv secRowDivSpace">
                  <Link to={`/article/${articles[6].slug}`}><img src={articles[6].image} alt="" className="secRowImg" /></Link>
                  <div className="secRowCol">
                    <Link to={`/article/${articles[6].slug}`}><div className="sRCT sRCT223 cardHeader">{ articles[6].title }</div></Link>
                    <small className="cardSpan">{articles[6].date}</small>
                    <div className="profileDisplay sRCP">
                      <img src={articles[6].profile} alt="" className="sbPI sbCI" />
                      <Link to={`/user-profile/${articles[6].author}`}><span className="profNameFeed sbCN">{ articles[6].author }</span></Link>
                      <img src={bookmarks.includes(articles[6].id) ? bookmarkGreen : bookmarkIcon} onClick={() => this.handleClick(articles[6].slug)} alt="" className="profBookmark bmCD prof7" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="secRowDisplay2">
                <Link to={`/article/${articles[7].slug}`}>
                  <div className="secRowDivLong1" style={{ backgroundImage: `url(${articles[7].image})` }}>
                    <Link to={`/article/${articles[7].slug}`}><div className="sRCT sRCT223 cardHeader" id="sRCT" style={{ color: '#ffffff' }}>{ articles[7].title }</div></Link>
                    <small className="sRCT cardSpan" style={{ color: '#ffffff' }}>{ articles[7].date }</small>
                    <div className="profileDisplay sRCP">
                      <img src={articles[7].profile} alt="" className="profImg sbCI" />
                      <Link to={`/user-profile/${articles[7].author}`}><span className="profNameFeed sbCN" style={{ color: '#ffffff' }}>{ articles[7].author }</span></Link>
                      <img src={bookmarks.includes(articles[7].id) ? bookmarkGreen : bookmarkIcon} onClick={() => this.handleClick(articles[7].slug)} alt="" className="profBookmark sbCBM sbCMLong prof8" />
                    </div>
                  </div>
                </Link>

                <div className="secRowDiv secRowDivSpace long">
                  <Link to={`/article/${articles[8].slug}`}><img src={articles[8].image} alt="" className="secRowImg" /></Link>
                  <div className="secRowCol">
                    <Link to={`/article/${articles[8].slug}`}><div className="sRCT cardHeader">{ articles[8].title }</div></Link>
                    <small className="cardSpan">{articles[8].date}</small>
                    <div className="profileDisplay sRCP">
                      <img src={articles[8].profile} alt="" className="profImg sbCI" />
                      <Link to={`/user-profile/${articles[8].author}`}><span className="profNameFeed sbCN">{ articles[8].author }</span></Link>
                      <img src={bookmarks.includes(articles[8].id) ? bookmarkGreen : bookmarkIcon} onClick={() => this.handleClick(articles[8].slug)} alt="" className="profBookmark bmCD prof9" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="thirdRow">
              <div className="lastCards spaceRight">
                <Link to={`/article/${articles[9].slug}`}><img src={articles[9].image} alt="" className="lastCardImage" /></Link>
                <Link to={`/article/${articles[9].slug}`}><div className="cardHeader">{articles[9].title}</div></Link>
                <small className="cardSpan">{articles[9].date}</small>
                <div className="profileDisplay cardProfile">
                  <img src={articles[9].profile} alt="" className="profImg sbCI" />
                  <Link to={`/user-profile/${articles[9].author}`}><span className="profNameFeed sbCN">{articles[9].author}</span></Link>
                  <img src={bookmarks.includes(articles[9].id) ? bookmarkGreen : bookmarkIcon} onClick={() => this.handleClick(articles[9].slug)} alt="" className="profBookmark sbCBM prof10" />
                </div>
              </div>

              <div className="lastCards spaceRight">
                <Link to={`/article/${articles[10].slug}`}><img src={articles[10].image} alt="" className="lastCardImage" /></Link>
                <Link to={`/article/${articles[10].slug}`}><div className="cardHeader">{articles[10].title}</div></Link>
                <small className="cardSpan">{articles[10].date}</small>
                <div className="profileDisplay cardProfile">
                  <img src={articles[10].profile} alt="" className="profImg sbCI" />
                  <Link to={`/user-profile/${articles[10].author}`}><span className="profNameFeed sbCN">{articles[10].author}</span></Link>
                  <img src={bookmarks.includes(articles[10].id) ? bookmarkGreen : bookmarkIcon} onClick={() => this.handleClick(articles[10].slug)} alt="" className="profBookmark sbCBM prof11" />
                </div>
              </div>

              <div className="lastCards spaceRight">
                <Link to={`/article/${articles[11].slug}`}><img src={articles[11].image} alt="" className="lastCardImage" /></Link>
                <Link to={`/article/${articles[11].slug}`}><div className="cardHeader">{articles[11].title}</div></Link>
                <small className="cardSpan">{articles[11].date}</small>
                <div className="profileDisplay cardProfile">
                  <img src={articles[11].profile} alt="" className="profImg sbCI" />
                  <Link to={`/user-profile/${articles[11].author}`}><span className="profNameFeed sbCN">{articles[11].author}</span></Link>
                  <img src={bookmarks.includes(articles[11].id) ? bookmarkGreen : bookmarkIcon} onClick={() => this.handleClick(articles[11].slug)} alt="" className="profBookmark sbCBM prof12" />
                </div>
              </div>

              <div className="lastCards spaceRight">
                <Link to={`/article/${articles[12].slug}`}><img src={articles[12].image} alt="" className="lastCardImage" /></Link>
                <Link to={`/article/${articles[12].slug}`}><div className="cardHeader" style={{ fontWeight: 'bold' }}>{articles[12].title}</div></Link>
                <span className="cardSpan">{articles[12].date}</span>
                <div className="profileDisplay cardProfile">
                  <Link to={`/user-profile/${articles[12].author}`}><img src={articles[12].profile} alt="" className="profImg sbCI" /></Link>
                  <span className="profNameFeed sbCN">{articles[12].author}</span>
                  <img src={bookmarks.includes(articles[12].id) ? bookmarkGreen : bookmarkIcon} onClick={() => this.handleClick(articles[12].slug)} alt="" className="profBookmark sbCBM prof13" />
                </div>
              </div>
            </div>
            <div className="pagination">
              <button type="button" className="paginationBtnsIcons" style={!this.props.previousPage ? { cursor: 'not-allowed' } : { cursor: 'pointer' }} onClick={this.changePaginationLeft} ref={this.btnLeft}><img src="https://image.flaticon.com/icons/svg/892/892513.svg" alt="" className="paginationIconBack" /></button>
              <input type="text" value={this.state.pagValue} onChange={this.changePage} onKeyPress={this.checkPage} ref={this.inputRef} className="paginationInput" />
              <span className="moreBtn">...</span>
              <button type="button" onClick={this.toLastPage} value={this.props.totalPages - 1} className="paginationBtnsIcons">{this.props.totalPages - 1}</button>
              <button type="button" style={this.props.page === this.props.totalPages - 1 ? { cursor: 'not-allowed' } : { cursor: 'pointer' }} className="paginationBtnsIcons" onClick={this.changePaginationRight} ref={this.btnRight}><img src="https://image.flaticon.com/icons/svg/892/892529.svg" alt="" className="paginationIconNext" /></button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  articles: state.articles.feed,
  loading: state.articles.loading,
  page: state.articles.page,
  totalPages: state.articles.totalPages,
  nextPage: state.articles.nextPage,
  previousPage: state.articles.previousPage,
  article: state.articles,
  bookmarks: state.boookMarking.bookmarks,
});

export default connect(mapStateToProps, { getFeed, bookmarkArticle, getAllBookmarks })(Feed);
