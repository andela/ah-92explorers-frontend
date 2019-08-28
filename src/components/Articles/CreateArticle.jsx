import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-inline';
import { connect } from 'react-redux';
import editorConfigs from '../../helpers/ckEditorConfig';
import { publishArticle } from '../../redux/actions/actionCreators';
import Messages from '../Messages/Messages.jsx';
import '../../assets/css/Create.Article.css';
import logo from '../../assets/icons/logo.png';
import avatar from '../../assets/icons/avatar.svg';

export class CreateArticle extends Component {
  state = {
    title: 'Write a title',
    body: '<p>Where have you been</p>',
  }

  componentDidMount() {
    const token = localStorage.getItem('jwtToken');
    if (!token || this.props.error === 'unauthorised to use this resource, please signup/login') {
      localStorage.clear();
      window.location = '/login';
    }
  }

  componentDidUpdate() {
    if (this.props.article.message) {
      const { slug } = this.props.article.article;
      window.location = `/article/${slug}`;
    }
  }

  onClickPublish = () => {
    this.props.publishArticle(this.state);
  }

  render() {
    return (
      <div className="mainDiv">
        <Messages success={this.props.article.message} error={this.props.error} />
        <div className="navbarArticle">
          <img src={logo} className="logoArticle" alt="" />
          <button className="publishBtnArticle" onClick={this.onClickPublish} type="button">Publish now!</button>
          <img src={avatar} className="man" alt="" />
          <button className="signoutBtn" type="button">Signout</button>
        </div>
        <div className="titleContent">
          <input
            value={this.state.title}
            onChange={(e) => {
              this.setState({ title: e.target.value });
            }}
            className="bounty"
          />
        </div>
        <div className="textContent">
          <CKEditor
            editor={ClassicEditor}
            data={this.state.body}
            onChange={(event, editor) => {
              const data = editor.getData();
              this.setState({ body: data });
            }}
            config={editorConfigs}
          />
        </div>
      </div>
    );
  }
}

CreateArticle.propTypes = {
};

const getStateFromStore = state => ({
  article: state.articles.article,
  error: state.articles.article.error,
});

export default connect(getStateFromStore, { publishArticle })(CreateArticle);
