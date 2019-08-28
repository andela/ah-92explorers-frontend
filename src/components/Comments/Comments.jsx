/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import '../../assets/auth/css/style.css';
import { connect } from 'react-redux';
import { sortArrayDesd as sortComments } from 'tesla-error-handler';
import manIcon from '../../assets/images/man.jpg';
import { fetchComments, postComment, deleteComment } from '../../redux/actions/actionCreators/comments';
import '../../assets/css/comment.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

export class Comments extends React.Component {
  state = {
    body: '',
  }

  componentDidMount() {
    const { slug } = this.props;
    this.props.fetchComments(slug);
  }

  handleOnComment = (body, slug) => {
    this.props.postComment(body, slug).then((res) => {
      this.props.fetchComments(slug);
      this.setState({ body: '' });
    });
  }

  onChange = (e) => {
    this.setState({ body: e.target.value });
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

  render() {
    const {
      username, userImage, slug,
    } = this.props;
    const { body } = this.state;
    const { comments } = this.props;
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
                  {moment(element.updatedAt).fromNow()}
                </div>
                <p className="comment-body">
                  {element.body}
                </p>
              </div>
              <div className="commentFooter">
                { element.commentor.username === localStorage.getItem('username')
                  ? (
                    <img
                      src={require('../../assets/icons/trash.svg')}
                      alt=""
                      className="bodyIcons footerIconsRight trash"
                      onClick={() => this.onDeleteComment(element.id)}
                    />
                  )
                  : ''}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
});

export default connect(
  mapStateToProps, { fetchComments, postComment, deleteComment },
)(Comments);
