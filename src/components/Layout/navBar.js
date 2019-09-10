import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import dotenv from 'dotenv';
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
const { APP_URL_BACKEND } = process.env;
export class Navbar extends Component {
  state = {
    toggle: 'none',
    modal: false,
    notificationBody: '',
  }

  componentDidMount() {
    this.props.getNotifications();
  }

  toggle = (e) => {
    this.setState(prevState => ({
      modal: !prevState.modal,
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
    const notif = [];
    const { profile, notifications } = this.props;
    const toggleBadge = notifications && Object.keys(notifications).length > 0;
    const img = profile && profile.image === '' ? manIcon : profile && profile.image;
    return (
      <Fragment>
        <div className="navbar">
          <img src={logo} alt="" className="logo dash-logo" />
          <ul>
            <li><a href="./userDashboard.html">Dashboard</a></li>
            <li><a href="./stats.html">Stats</a></li>
            <li><a href="./profile.html">Profile</a></li>
          </ul>
          <div className="restOfNav">
            <img src={search} alt="" className="navIcons navIconColor" />
            <div onClick={this.onHandleClick}>
              <img src={notification} alt="" className="navIcons navIconColor" />
              {toggleBadge
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
            <ListGroup style={{ display: this.state.toggle }}>
              {
                notifications
                && notifications.notifications
                && notifications.notifications.allNotification
                && notifications.notifications.allNotification.slice(0, 5).map(notifs => (
                  <ListGroupItem style={{ backgroundColor: notifs.status === 'read' ? '#fff' : '#edf2fa', cursor: 'pointer' }} onClick={this.onclickNotif} key={`${notifs.id}`} data-value={`${notifs.message}`} data-key={`${notifs.id}`}>
                    {notifs.message}
                    {' '}
                    {notifs.status === 'read' ? <span className="read">{notifs.status}</span> : <span className="unread">{notifs.status}</span>}
                  </ListGroupItem>
                ))
              }
              <ListGroupItem style={{ cursor: 'pointer' }} onClick={this.viewmore}><span className="viewmore">view more ...</span></ListGroupItem>
            </ListGroup>
            <img src={img} alt="" className="navIcons manIcon" />
            <Dropdown />
          </div>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Read Notification</ModalHeader>
          <ModalBody>
            {this.state.notificationBody}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.refresh}>close</Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile.profile,
    notifications: state.notifications,
    read: state.notifications,
  };
}


export default connect(mapStateToProps, { getNotifications, readNotification })(Navbar);
