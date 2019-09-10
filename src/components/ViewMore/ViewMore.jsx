import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  ListGroup,
  ListGroupItem,
  Modal, ModalBody,
  ModalFooter,
  Button,
  ModalHeader,
} from 'reactstrap';
import NavBar from '../Layout/navBar';
import { getNotifications, readNotification } from '../../redux/actions/actionCreators';

export class ViewMore extends Component {
  state = {
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
    this.toggle(e);
    this.props.readNotification(e.target.getAttribute('data-key'));
  }

  refresh = () => {
    const current = window.location.pathname;
    window.location.replace(current);
  }

  render() {
    const { notifications, read } = this.props;
    return (
      localStorage.getItem('authenticated') ? (
        <Fragment>
          <NavBar />
          <ListGroup className="viewmoreList">
            {
                notifications
                && notifications.notifications
                && notifications.notifications.allNotification
                && notifications.notifications.allNotification.map(notifs => (
                  <ListGroupItem style={{ backgroundColor: notifs.status === 'read' ? '#fff' : '#edf2fa', cursor: 'pointer' }} onClick={this.onclickNotif} key={`${notifs.id}`} data-value={`${notifs.message}`} data-key={`${notifs.id}`}>
                    {notifs.message}
                    {' '}
                    {notifs.status === 'read' ? <span className="read">{notifs.status}</span> : <span className="unread">{notifs.status}</span>}
                  </ListGroupItem>
                ))
              }
          </ListGroup>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Read Notification</ModalHeader>
            <ModalBody>
              { this.state.notificationBody }
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.refresh}>close</Button>
            </ModalFooter>
          </Modal>
        </Fragment>
      ) : window.location.replace('/login')
    );
  }
}

function mapStateToProps(state) {
  return {
    notifications: state.notifications,
  };
}


export default connect(mapStateToProps, { getNotifications, readNotification })(ViewMore);
