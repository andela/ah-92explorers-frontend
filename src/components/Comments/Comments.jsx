
import React from 'react';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import '../../assets/auth/css/style.css';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { sortArrayDesd as sortComments } from 'tesla-error-handler';
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import manIcon from '../../assets/images/man.jpg';
import {
  fetchComments, postComment, deleteComment, updateComment,
  fetchEditCommentHistory, likeAComment,
} from '../../redux/actions/actionCreators/comments';
import '../../assets/css/comment.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Messages from '../Messages/Messages.jsx';

export class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      isInEditMode: false,
      commentToEdit: '',
      newComment: '',
      dropdownOpen: false,
      modal: false,
      username: '',
      pic: '',
      addNotif: false,
      updateNotif: false,
    };
  }

  componentDidMount() {
    const { slug } = this.props;
    this.props.fetchComments(slug);
  }

  handleOnComment = (body, slug) => {
    this.props.postComment(body, slug).then((res) => {
      if (res.type !== 'SET_COMMENT_ERROR') {
        this.props.fetchComments(slug);
        this.setState({ body: '', addNotif: false });
      } else {
        this.setState({ addNotif: true });
      }
    });
  }

  isliked = (array) => {
    const res = array.find(element => element.user.username === this.props.login.user.username);
    return !!res;
  }

  likeComment = (commentId) => {
    this.props.likeAComment(commentId).then(() => {
      const { slug } = this.props;
      this.props.fetchComments(slug);
    });
  }

  onChange = (e) => {
    this.setState({
      body: e.target.value,
      addNotif: false,
    });
  }

  onDeleteComment = itemId => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure, you want to delete this comment?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.props.deleteComment(itemId).then((res) => {
              const { slug } = this.props;
              this.props.fetchComments(slug);
            });
          },
        },
        {
          label: 'No',
          onClick: () => {
          },
        },
      ],
    });
  }

  changeEditMode = (index) => {
    this.setState(prevState => ({
      isInEditMode: !prevState.isInEditMode,
      commentToEdit: index,
    }));
  }

  onEditChange = (e) => {
    this.setState({ newComment: e.target.value, updateNotif: false });
  }

  updateCommentValue = (theComment, i, lastComment) => {
    this.props.updateComment(theComment, i, lastComment).then((res) => {
      if (res.type !== 'SET_COMMENT_ERROR') {
        const { slug } = this.props;
        this.setState({ isInEditMode: false, updateNotif: false });
        this.props.fetchComments(slug);
      } else {
        this.setState({ isInEditMode: true, updateNotif: true });
      }
    });
  }

  toggleEditHistory = (id, username, pic) => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      username,
      pic,
    }));
    this.props.fetchEditCommentHistory(id);
  }

  toggle = (id) => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
      commentToEdit: id,
    }));
  }

  renderDataModal = () => {
    const { commentHistory } = this.props;
    return commentHistory.map(editedComment => (
      <div className="each-history-comment" key={shortid.generate()}>
        <div className="sub-image">
          <img src={this.state.pic} alt="" className="commPic" />
        </div>
        <div className="sub-content">
          <span className="sub-username">
            {this.state.username}
          </span>
          <p className="sub-body">{editedComment.body}</p>
          <div className="sub-time">{moment(editedComment.createdAt).fromNow()}</div>
        </div>
      </div>
    ));
  }

  render() {
    const {
      username, userImage, slug,
    } = this.props;
    const {
      body, newComment, addNotif, updateNotif,
    } = this.state;
    const { comments, commentError } = this.props;
    return (
      <div>
        <div className="commentForm">
          <div className="profileSection">
            <img src={userImage} alt={username} className="commPic" />
            <span className="profileName">{username}</span>
          </div>
          <div className="comment-field">
            <input
              type="text"
              value={body}
              name="body"
              className="cmBox"
              placeholder="Enter a comment here"
              onChange={this.onChange}
            />
          </div>
          { addNotif && commentError && (<Messages danger={commentError} error={commentError} />)}
          <br />
          <button className="publish" type="button" onClick={() => this.handleOnComment(body, slug)}>Comment</button>
        </div>

        <div className="comment-list">
          {sortComments(comments).map(element => (
            <div className="commentCard" key={element.id}>
              <div className="commentSection">
                <img src={element.commentor.image ? element.commentor.image : manIcon} alt={element.commentor.username} className="commPic" />
                <span className="profileName">{element.commentor.username}</span>
                <div className="comment-date">
                  {' '}
                  {moment(element.createdAt).fromNow()}
                </div>

                { this.state.isInEditMode && this.state.commentToEdit === element.id ? (
                  <div className="comment-body">
                    {' '}
                    <input type="text" defaultValue={element.body} onChange={this.onEditChange} className="cmBox" />
                    <button onClick={this.changeEditMode} type="button" className="x-btn">X</button>
                    <br />
                    { updateNotif && this.state.commentToEdit === element.id && commentError
                    && (<Messages danger={commentError} error={commentError} />) }
                    <button className="publish" type="button" onClick={() => this.updateCommentValue(newComment, element.id, element.body)}>Update Comment</button>
                  </div>
                )
                  : (
                    <div className="comment-acts">
                      <p className="comment-body">
                        {element.body}
                        {'    '}
                        { (element.createdAt === element.updatedAt)
                          ? null
                          : (
                            <label
                              className="com-edited"
                              onClick={() => this.toggleEditHistory(
                                element.id, element.commentor.username, element.commentor.image
                                  ? element.commentor.image : manIcon,
                              )}
                            >
                         (edited)
                            </label>
                          )}
                      </p>
                      <div className="like-comment">
                        {
                          this.isliked(element.likes) ? (
                            <div>
                              <img
                                src={require('../../assets/icons/liked.svg')}
                                alt="like button"
                                onClick={() => this.likeComment(element.id)}
                                className="likeImg"
                              />
                              <span className="totalLikes">{element.likes.length}</span>
                            </div>
                          ) : (
                            <div>
                              <img
                                src={require('../../assets/icons/default-like.svg')}
                                alt="like button"
                                onClick={() => this.likeComment(element.id)}
                                className="likeImg"
                              />
                              <span className="totalLikes">{element.likes.length}</span>
                            </div>
                          )
                        }
                      </div>
                    </div>

                  )}
              </div>
              { element.commentor.username === this.props.login.user.username
                ? (
                  <div className="commentActions">
                    <Dropdown
                      isOpen={this.state.dropdownOpen
                      && this.state.commentToEdit === element.id}
                      toggle={() => this.toggle(element.id)}
                    >
                      <DropdownToggle>
                        <i className="fa fa-ellipsis-v"></i>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() => this.changeEditMode(element.id)}>
                          <i className="fa fa-pencil"></i>
                          {' '}
                          Edit
                        </DropdownItem>
                        <DropdownItem onClick={() => this.onDeleteComment(element.id)}>
                          <i className="fa fa-trash"></i>
                          {' '}
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                )
                : ''}
            </div>
          ))}
        </div>
        <div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggleEditHistory}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggleEditHistory}>Edit History</ModalHeader>
            <ModalBody className="com-hist-body">
              {this.renderDataModal()}
            </ModalBody>
            <ModalFooter className="cm-footer">
              <label className="tip-mes">This is visible to anyone who can see this comment.</label>
              {' '}
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  comments: state.comments.comments,
  commentError: state.comments.commentError,
  commentHistory: state.comments.commentHistory,
  login: state.login,
});

export default connect(
  mapStateToProps, {
    fetchComments,
    postComment,
    deleteComment,
    updateComment,
    fetchEditCommentHistory,
    likeAComment,
  },
)(Comments);
