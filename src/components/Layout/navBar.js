import React, { Component, Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dotenv from 'dotenv';
import { Link } from 'react-router-dom';
import {
  ListGroup, ListGroupItem, Badge, Button,
  ModalBody, ModalHeader, Modal, ModalFooter,
} from 'reactstrap';
import logo from '../../assets/icons/logo.png';
import search from '../../assets/icons/search.svg';
import notification from '../../assets/icons/notification.svg';
import manIcon from '../../assets/icons/man.svg';
import Dropdown from './Dropdown.jsx';
import { getNotifications, readNotification } from '../../redux/actions/actionCreators';

dotenv.config();
export class Navbar extends Component {
  articleRead = React.createRef();

  state = {
    toggle: 'none',
    modal: false,
    modal2: false,
    notificationBody: '',
  }

  componentDidMount() {
    this.props.getNotifications();
  }

  toggle = (e) => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
    if (this.state.modal) this.refresh();
  }

  toggle2 = (e) => {
    this.setState(prevState => ({
      modal2: !prevState.modal2,
    }));
  }

  isHTML = (str) => {
    const doc = new DOMParser().parseFromString(str, 'text/html');
    return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
  }

  handleMouseLeave = (e) => {
    this.setState(prevState => ({
      modal2: !prevState.modal2,
    }));
  }

  onclickNotif = (e) => {
    this.setState({
      notificationBody: e.target.getAttribute('data-value'),
    });
    this.toggle();
    this.props.readNotification(e.target.getAttribute('data-key'));
  }

  viewmore = () => {
    window.location.replace('/more/notifications');
  }

  onHandleClick = () => {
    this.state.toggle === 'none' ? this.setState({ toggle: 'block' }) : this.setState({ toggle: 'none' });
  }

  refresh = () => {
    const current = window.location.pathname;
    window.location.replace(current);
  }

  render() {
    const userImage = localStorage.getItem('image');
    const regex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/;
    const notif = [];
    const { profile, notifications } = this.props;
    const opted = JSON.parse(localStorage.getItem('opted'));
    const notifArray = notifications && notifications.notifications;
    const toggleBadge = notifArray
    && notifArray.allNotification && notifArray.allNotification.length > 0;
    return (
      <Fragment>
        <div className="navbar">
          <a href="/"><img src={logo} alt="" className="logo dash-logo" /></a>
          <ul>
            <li><Link to="/article">Create Article</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
          <div className="restOfNav">
            <img src={search} alt="" className="navIcons navIconColor" />
            <div onClick={this.onHandleClick}>
              <img src={notification} alt="" className="navIcons navIconColor" />
              {opted && toggleBadge
              && (
              <Badge color="danger">
                {
                notifications
                && notifications.notifications
                && notifications.notifications.allNotification
                && notifications.notifications.allNotification.map(e => {
                  if (e.status === 'unread') notif.push(e);
                })
                && notif.length
                }

              </Badge>
              )}
            </div>
            { opted && toggleBadge && (
            <ListGroup className="notifCard" style={{ display: this.state.toggle }} flush>
              {
                notifications
                && notifications.notifications
                && notifications.notifications.allNotification
                && notifications.notifications.allNotification.slice(0, 5).map(notifs => (
                  <ListGroupItem
                    style={{
                      backgroundColor: notifs.status === 'read' ? '#fff' : '#edf2fa', cursor: 'pointer', color: '#000', fontSize: '13px',
                    }}
                    ref={this.articleRead}
                    onClick={this.onclickNotif}
                    key={`${notifs.id}`}
                    data-value={
                      this.isHTML(notifs.message)
                        ? `${notifs.message.split('<')[0]} ${notifs.message.match(regex)[2].split('/')[3].split('-').join(' ')}`
                        : notifs.message
                    }
                    data-key={`${notifs.id}`}
                  >
                    {
                      this.isHTML(notifs.message)
                        ? (
                          <span className="articleComment">
                            {`${notifs.message.split('<')[0]}`}
                            <a className="articleComment" href={`/article/${notifs.message.match(regex)[2].split('/')[3]}`}>
                              <span className="articleLink">{`${notifs.message.match(regex)[2].split('/')[3].split('-').join(' ')}`}</span>
                            </a>
                          </span>
                        ) : notifs.message
                    }
                    {' '}
                    {notifs.status === 'read' ? '' : <span className="unread">{notifs.status}</span>}
                    <br></br>
                    <span style={{ fontSize: '10px', color: '#00000054', fontWeight: 'bold' }}>{moment(notifs.createdAt).fromNow()}</span>
                  </ListGroupItem>
                ))
              }
              <ListGroupItem className="viewmoreNotif" style={{ cursor: 'pointer', color: '#000' }} onClick={this.toggle2}><span className="viewmore">view more ...</span></ListGroupItem>
            </ListGroup>
            )}
            <img src={userImage || process.env.DEFAULT_IMAGE} alt="" className="navIcons manIcon" />
            <Dropdown />
          </div>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Read Notification</ModalHeader>
          <ModalBody>
            {this.state.notificationBody}
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.modal2}
          toggle={this.toggle2}
          onMouseLeave={this.handleMouseLeave}
        >
          <ModalBody className="modalmore">
            { opted && toggleBadge && (
            <ListGroup className="notifCard2" style={{ display: this.state.toggle }} flush>
              {
                notifications
                && notifications.notifications
                && notifications.notifications.allNotification
                && notifications.notifications.allNotification.map(notifs => (
                  <ListGroupItem
                    style={{
                      backgroundColor: notifs.status === 'read' ? '#fff' : '#edf2fa', cursor: 'pointer', color: '#000', fontSize: '13px',
                    }}
                    ref={this.articleRead}
                    onClick={this.onclickNotif}
                    key={`${notifs.id}`}
                    data-value={
                      this.isHTML(notifs.message)
                        ? `${notifs.message.split('<')[0]} ${notifs.message.match(regex)[2].split('/')[3].split('-').join(' ')}`
                        : notifs.message
                      }
                    data-key={`${notifs.id}`}
                  >
                    {
                      this.isHTML(notifs.message)
                        ? (
                          <span className="articleComment">
                            {`${notifs.message.split('<')[0]}`}
                            <a className="articleComment" href={`/article/${notifs.message.match(regex)[2].split('/')[3]}`}>
                              <span className="articleLink">{`${notifs.message.match(regex)[2].split('/')[3].split('-').join(' ')}`}</span>
                            </a>
                          </span>
                        ) : notifs.message
                    }
                    {' '}
                    {notifs.status === 'read' ? '' : <span className="unread">{notifs.status}</span>}
                    <br></br>
                    <span style={{ fontSize: '10px', color: '#00000054', fontWeight: 'bold' }}>{moment(notifs.createdAt).fromNow()}</span>
                  </ListGroupItem>
                ))
              }
            </ListGroup>
            )}
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

Modal.propType = {
  scrollable: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    profile: state.profile.profile,
    notifications: state.recvNotifications,
    read: state.notifications,
  };
}


export default connect(mapStateToProps, { getNotifications, readNotification })(Navbar);
