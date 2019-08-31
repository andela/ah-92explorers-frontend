/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner.jsx';
import { getFeed } from '../../redux/actions/actionCreators';
import Navbar from '../Layout/Navbar.jsx';
import '../../assets/css/homepage.css';

export class Feed extends Component {
  componentDidMount() {
    this.props.getFeed();
  }

  render() {
    if (this.props.loading || this.props.articles[0] === undefined) {
      return <Spinner />;
    }
    const { articles } = this.props;
    return (
      <div data-test="homePage" className="feedHome">
        <Navbar token={articles[14].token} username={articles[14].username} avatar={articles[14].image} />
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
                <Link to={`/profile/${articles[0].author}`}><small className="profNameFeed pNFRF">{ articles[0].author }</small></Link>
                <img src={require('../../assets/icons/bookmark.svg')} alt="" className="profBookmark bmCD" />
              </div>
            </div>
            <div className="secondRowFirst">
              <div className="subColumn sb1 sb2">
                <Link to={`/article/${articles[1].slug}`}><div className="cardHeader">{ articles[1].title }</div></Link>
                <small className="cardSpan">{articles[1].date}</small>
                <br />
                <div className="profileDisplay">
                  <img src={articles[1].profile} alt="" className="profImg sbCI" />
                  <Link to={`/profile/${articles[1].author}`}><span className="profNameFeed sbCN">{ articles[1].author }</span></Link>
                  <img src={require('../../assets/icons/bookmark.svg')} alt="" className="profBookmark sbCBM" />
                </div>
              </div>

              <div className="subColumn sb1">
                <Link to={`/article/${articles[2].slug}`}><div className="cardHeader">{ articles[2].title }</div></Link>
                <small className="cardSpan">{articles[2].date}</small>
                <br />
                <div className="profileDisplay">
                  <img src={articles[2].profile} alt="" className="profImg sbCI" />
                  <Link to={`/profile/${articles[2].author}`}><span className="profNameFeed sbCN">{ articles[2].author }</span></Link>
                  <img src={require('../../assets/icons/bookmark.svg')} alt="" className="profBookmark sbCBM" />
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
                  <Link to={`/profile/${articles[3].author}`}><span className="profNameFeed sbCN">{ articles[3].author }</span></Link>
                  <img src={require('../../assets/icons/bookmark.svg')} alt="" className="profBookmark sbCBM" />
                </div>
              </div>

              <div className="subColumn sb22 sb224">
                <Link to={`/article/${articles[4].slug}`}><div className="cardHeader">{ articles[4].title }</div></Link>
                <small className="cardSpan">{articles[4].date}</small>
                <br />
                <div className="profileDisplay">
                  <img src={articles[4].profile} alt="" className="profImg sbCI" />
                  <Link to={`/profile/${articles[4].author}`}><span className="profNameFeed sbCN">{ articles[4].author }</span></Link>
                  <img src={require('../../assets/icons/bookmark.svg')} alt="" className="profBookmark sbCBM" />
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
                    <Link to={`/profile/${articles[5].author}`}><span className="profNameFeed sbCN">{ articles[5].author }</span></Link>
                    <img src={require('../../assets/icons/bookmark.svg')} alt="" className="profBookmark bmCD" />
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
                    <Link to={`/profile/${articles[6].author}`}><span className="profNameFeed sbCN">{ articles[6].author }</span></Link>
                    <img src={require('../../assets/icons/bookmark.svg')} alt="" className="profBookmark bmCD" />
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
                    <Link to={`/profile/${articles[7].author}`}><span className="profNameFeed sbCN" style={{ color: '#ffffff' }}>{ articles[7].author }</span></Link>
                    <img src={require('../../assets/icons/bookmark.svg')} alt="" className="profBookmark sbCBM sbCMLong" />
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
                    <Link to={`/profile/${articles[8].author}`}><span className="profNameFeed sbCN">{ articles[8].author }</span></Link>
                    <img src={require('../../assets/icons/bookmark.svg')} alt="" className="profBookmark bmCD" />
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
                <Link to={`/profile/${articles[9].author}`}><span className="profNameFeed sbCN">{articles[9].author}</span></Link>
                <img src={require('../../assets/icons/bookmark.svg')} alt="" className="profBookmark sbCBM" />
              </div>
            </div>

            <div className="lastCards spaceRight">
              <Link to={`/article/${articles[10].slug}`}><img src={articles[10].image} alt="" className="lastCardImage" /></Link>
              <Link to={`/article/${articles[10].slug}`}><div className="cardHeader">{articles[10].title}</div></Link>
              <small className="cardSpan">{articles[10].date}</small>
              <div className="profileDisplay cardProfile">
                <img src={articles[10].profile} alt="" className="profImg sbCI" />
                <Link to={`/profile/${articles[10].author}`}><span className="profNameFeed sbCN">{articles[10].author}</span></Link>
                <img src={require('../../assets/icons/bookmark.svg')} alt="" className="profBookmark sbCBM" />
              </div>
            </div>

            <div className="lastCards spaceRight">
              <Link to={`/article/${articles[11].slug}`}><img src={articles[11].image} alt="" className="lastCardImage" /></Link>
              <Link to={`/article/${articles[11].slug}`}><div className="cardHeader">{articles[11].title}</div></Link>
              <small className="cardSpan">{articles[11].date}</small>
              <div className="profileDisplay cardProfile">
                <img src={articles[11].profile} alt="" className="profImg sbCI" />
                <Link to={`/profile/${articles[11].author}`}><span className="profNameFeed sbCN">{articles[11].author}</span></Link>
                <img src={require('../../assets/icons/bookmark.svg')} alt="" className="profBookmark sbCBM" />
              </div>
            </div>

            <div className="lastCards spaceRight">
              <Link to={`/article/${articles[12].slug}`}><img src={articles[12].image} alt="" className="lastCardImage" /></Link>
              <Link to={`/article/${articles[12].slug}`}><div className="cardHeader">{articles[12].title}</div></Link>
              <span className="cardSpan">{articles[12].date}</span>
              <div className="profileDisplay cardProfile">
                <Link to={`/profile/${articles[12].author}`}><img src={articles[12].profile} alt="" className="profImg sbCI" /></Link>
                <span className="profNameFeed sbCN">{articles[12].author}</span>
                <img src={require('../../assets/icons/bookmark.svg')} alt="" className="profBookmark sbCBM" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  articles: state.articles.feed,
  loading: state.articles.loading,
});

export default connect(mapStateToProps, { getFeed })(Feed);
