import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-inline';
import { connect } from 'react-redux';
import editorConfigs from '../../helpers/ckEditorConfig';
import { updateArticle, getArticle } from '../../redux/actions/actionCreators';
import Messages from '../Messages/Messages.jsx';
import '../../assets/css/Create.Article.css';
import logo from '../../assets/icons/logo.png';
import avatar from '../../assets/icons/avatar.svg';

export class UpdateArticle extends Component {
  state = {
    title: 'Beneath the lies' || this.props.article.article.title,
    body: '<p>Beneath the lies</p>' || this.props.article.article.body,
  }

  componentDidMount() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      localStorage.clear();
      window.location = '/login';
    }
    const slug = this.props.match.params.articleSlug;
    this.props.getArticle(slug);
  }

  componentDidUpdate() {
    if (this.state.title === '<h1>Beneath the lies</h1>' || this.state.body === '<p>Beneath the lies</p>') {
      this.setState({
        title: this.props.article.article.title,
        body: this.props.article.article.body,
      });
    }
    if (this.props.article.message) {
      const { slug } = this.props.article.article;
      window.location = `/article/${slug}`;
    }
    return false;
  }

  onClickPublish = () => {
    const slug = this.props.match.params.articleSlug;
    this.props.updateArticle(this.state, slug);
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

UpdateArticle.propTypes = {
};

const getStateFromStore = state => ({
  article: state.articles,
  error: state.articles.error,
});

export default connect(getStateFromStore, { updateArticle, getArticle })(UpdateArticle);
