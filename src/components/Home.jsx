/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHome } from '../redux/actions/actionCreators/home';
import Navbar from './Layout/Navbar.jsx';
import AuthNavbar from './Layout/AuthNavbar.jsx';

export class Home extends Component {
  render() {
    return (
      <div data-test="homePage">
        {this.props.login.isAuthenticated ? <AuthNavbar /> : <Navbar /> }
        <div className="theBody">
          <div className="headline disappear">
            <div className="headlinePop">
              <img src={require('../assets/icons/star.svg')} alt="" className="star" />
              <span>Popular</span>
            </div>

            <div className="ftBtns">
              <span className="btnLike">Articles</span>
              <span className="btnLike">Channels</span>
              <span className="btnLike2">Topics</span>
            </div>

            <div className="headlineRight">
              <span>Sort by</span>
              <button className="sortBtn" type="button">
                  Date
                <img src={require('../assets/icons/down-arrow.svg')} alt="" className="sortIcon" />
              </button>
            </div>
          </div>

          <div className="firstRow">

            <div className="firstRowFirst">
              <a href="crudArticle.html">
                <h2 style={{ color: '#ffffff}' }} className="fRT">We are facing a major issue</h2>
              </a>
              <p style={{ color: '#ffffff}' }} className="fRST"> We have been working hard</p>
              <div className="profileDisplay pDFRF">
                <img src={require('../assets/icons/man.svg')} alt="" className="profImg pIFRF" />
                <small className="profName pNFRF">Mugerwa Joseph</small>
                <img src={require('../assets/icons/bookmark.svg')} alt="" className="profBookmark pBM" />
              </div>
            </div>


            <div className="secondRowFirst">
              <div className="subColumn sb1 sb2">
                <h3>Effective form Advertising Internet Website </h3>
                <br />
                <div className="profileDisplay">
                  <img src={require('../assets/icons/man.svg')} alt="" className="profImg sbCI" />
                  <span className="profName sbCN">Mugerwa Joseph</span>
                  <img src={require('../assets/icons/bookmark.svg')} alt="" className="profBookmark sbCBM" />
                </div>
              </div>

              <div className="subColumn sb1">
                <h3>Effective form Advertising Internet Website </h3>
                <br />
                <div className="profileDisplay">
                  <img src={require('../assets/icons/man.svg')} alt="" className="profImg sbCI" />
                  <span className="profName sbCN">Mugerwa Joseph</span>
                  <img src={require('../assets/icons/bookmark.svg')} alt="" className="profBookmark sbCBM" />
                </div>
              </div>
            </div>

            <div className="thirdRowFirst">
              <div className="subColumn sb22">
                <h3>Effective form Advertising Internet Website </h3>
                <br />
                <div className="profileDisplay">
                  <img src={require('../assets/icons/man.svg')} alt="" className="profImg sbCI" />
                  <span className="profName sbCN">Mugerwa Joseph</span>
                  <img src={require('../assets/icons/bookmark.svg')} alt="" className="profBookmark sbCBM" />
                </div>
              </div>

              <div className="subColumn sb22 sb224">
                <h3>Effective form Advertising Internet Website</h3>
                <br />
                <div className="profileDisplay">
                  <img src={require('../assets/icons/man.svg')} alt="" className="profImg sbCI" />
                  <span className="profName sbCN">Mugerwa Joseph</span>
                  <img src={require('../assets/icons/bookmark.svg')} alt="" className="profBookmark sbCBM" />
                </div>
              </div>
            </div>

          </div>

          <div className="secondRow">
            <div className="secRowDisplay1">
              <div className="secRowDiv displayDown">
                <img src={require('../assets/icons/photo-1562244602-0f73795e5b16.jpeg')} alt="" className="secRowImg" />
                <div className="secRowCol">
                  <h3 className="sRCT sRCT223">Effective form Advertising Internet Website</h3>
                  <div className="profileDisplay sRCP">
                    <img src={require('../assets/icons/man.svg')} alt="" className="profImg sbCI" />
                    <span className="profName sbCN">Mugerwa Joseph</span>
                    <img src={require('../assets/icons/bookmark.svg')} alt="" className="profBookmark sbCBM" />
                  </div>
                </div>
              </div>

              <div className="secRowDiv secRowDivSpace">
                <img src={require('../assets/icons/photo-1562244602-0f73795e5b16.jpeg')} alt="" className="secRowImg" />
                <div className="secRowCol">
                  <h3 className="sRCT sRCT223">Effective form Advertising Internet Website</h3>
                  <div className="profileDisplay sRCP">
                    <img src={require('../assets/icons/man.svg')} alt="" className="profImg sbCI" />
                    <span className="profName sbCN">Mugerwa Joseph</span>
                    <img src={require('../assets/icons/bookmark.svg')} alt="" className="profBookmark sbCBM" />
                  </div>
                </div>
              </div>
            </div>

            <div className="secRowDisplay2">
              <div className="secRowDivLong1">
                <h3 className="sRCT sRCT223" id="sRCT" style={{ color: '#ffffff' }}>Comment on the Importance of humanlife</h3>
                <p className="sRCT" style={{ color: '#ffffff' }}>The drama can be seen below</p>
                <div className="profileDisplay sRCP">
                  <img src={require('../assets/icons/man.svg')} alt="" className="profImg sbCI" />
                  <span className="profName sbCN" style={{ color: '#ffffff' }}>Mugerwa Joseph</span>
                  <img src={require('../assets/icons/bookmark.svg')} alt="" className="profBookmark sbCBM sbCMLong" />
                </div>
              </div>

              <div className="secRowDiv secRowDivSpace long">
                <img src={require('../assets/icons/photo-1562244602-0f73795e5b16.jpeg')} alt="" className="secRowImg" />
                <div className="secRowCol">
                  <h3 className="sRCT">Effective form Advertising Internet Website</h3>
                  <div className="profileDisplay sRCP">
                    <img src={require('../assets/icons/man.svg')} alt="" className="profImg sbCI" />
                    <span className="profName sbCN">Mugerwa Joseph</span>
                    <img src={require('../assets/icons/bookmark.svg')} alt="" className="profBookmark sbCBM" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="thirdRow">
            <div className="lastCards spaceRight">
              <img src="https://images.unsplash.com/photo-1563242541-b204a2a7d88d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="" className="lastCardImage" />
              <h4 className="cardHeader">How to write better business cards</h4>
              <span className="cardSpan">This shows how to write business</span>
              <div className="profileDisplay cardProfile">
                <img src={require('../assets/icons/man.svg')} alt="" className="profImg sbCI" />
                <span className="profName sbCN">Mugerwa Joseph</span>
                <img src={require('../assets/icons/bookmark.svg')} alt="" className="profBookmark sbCBM" />
              </div>
            </div>

            <div className="lastCards spaceRight">
              <img src="https://images.unsplash.com/photo-1563242541-b204a2a7d88d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="" className="lastCardImage" />
              <h4 className="cardHeader">How to write better business cards</h4>
              <span className="cardSpan">This shows how to write business</span>
              <div className="profileDisplay cardProfile">
                <img src={require('../assets/icons/man.svg')} alt="" className="profImg sbCI" />
                <span className="profName sbCN">Mugerwa Joseph</span>
                <img src={require('../assets/icons/bookmark.svg')} alt="" className="profBookmark sbCBM" />
              </div>
            </div>

            <div className="lastCards spaceRight">
              <img src="https://images.unsplash.com/photo-1563242541-b204a2a7d88d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="" className="lastCardImage" />
              <h4 className="cardHeader">How to write better business cards</h4>
              <span className="cardSpan">This shows how to write business</span>
              <div className="profileDisplay cardProfile">
                <img src={require('../assets/icons/man.svg')} alt="" className="profImg sbCI" />
                <span className="profName sbCN">Mugerwa Joseph</span>
                <img src={require('../assets/icons/bookmark.svg')} alt="" className="profBookmark sbCBM" />
              </div>
            </div>

            <div className="lastCards spaceRight">
              <img src="https://images.unsplash.com/photo-1563242541-b204a2a7d88d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="" className="lastCardImage" />
              <h4 className="cardHeader">How to write better business cards</h4>
              <span className="cardSpan">This shows how to write business</span>
              <div className="profileDisplay cardProfile">
                <img src={require('../assets/icons/man.svg')} alt="" className="profImg sbCI" />
                <span className="profName sbCN">Mugerwa Joseph</span>
                <img src={require('../assets/icons/bookmark.svg')} alt="" className="profBookmark sbCBM" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
});

export default connect(mapStateToProps, { getHome })(Home);
