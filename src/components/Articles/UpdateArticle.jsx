/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-inline';
import { connect } from 'react-redux';
import uuid from 'uuidv4';
import Dropdown from '../Layout/Dropdown.jsx';
import editorConfigs from '../../helpers/ckEditorConfig';
import { updateArticle, getArticle } from '../../redux/actions/actionCreators';
import Messages from '../Messages/Messages.jsx';
import '../../assets/css/Create.Article.css';
import logo from '../../assets/icons/logo.png';

export class UpdateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Beneath the lies' || this.props.article.article.title,
      body: '<p>Beneath the lies</p>' || this.props.article.article.body,
      tagList: ['Tag'] || this.props.article.article.tagList,
      tags: null,
    };

    this.tagContainer = React.createRef();
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
    const { tagList, title, body } = this.state;
    if (title === 'Beneath the lies' || body === '<p>Beneath the lies</p>' || tagList === ['Tag']) {
      this.setState({
        title: this.props.article.article.title,
        body: this.props.article.article.body,
        tagList: this.props.article.article.tagList,
      });
    }
    if (this.props.article.article.message === 'Article updated successfully') {
      const { slug } = this.props.article.article.article;
      window.location = `/article/${slug}`;
    }

    return false;
  }

  enterTags = (e) => {
    const letters = /^[a-zA-Z]*$/;
    if (e.target.value.match(letters)) {
      this.setState({ tags: e.target.value.trim().toLowerCase() });
      return true;
    }
    this.setState({ tags: null });
  }

  showTag = (e) => {
    const letters = /^[a-zA-Z]*$/;
    const { tags, tagList } = this.state;
    if (e.key === 'Enter' && tags !== null) {
      if (tags.match(letters)) {
        if (tagList !== null) {
          let emptyArray = tagList[0].split(' ');
          emptyArray = emptyArray.filter(tag => tag !== 'Tag');
          emptyArray.includes(tags) || emptyArray.length > 3 ? null : emptyArray.push(tags);
          const newString = emptyArray.join(' ');
          const newEmptyArray = [];
          newEmptyArray.push(newString);
          this.setState({ tagList: newEmptyArray });
        } else {
          const newEmptyArray = [];
          newEmptyArray.push(e.target.value);
          this.setState({ tagList: newEmptyArray });
        }
      }
    }
  }

  removeTag = e => {
    const { tagList } = this.state;
    let emptyArray = tagList[0].split(' ');
    emptyArray = emptyArray.filter(tag => tag !== e.target.value);
    const newString = emptyArray.join(' ');
    const newEmptyArray = [];
    newEmptyArray.push(newString);
    this.setState({ tagList: newEmptyArray });
  }

  onClickPublish = () => {
    const slug = this.props.match.params.articleSlug;
    this.props.updateArticle(this.state, slug);
  }

  changeTitle = (e) => {
    this.setState({ title: e.target.value });
  }

  changeBody = (event, editor) => {
    const data = editor.getData();
    this.setState({ body: data });
  }


  signOut = () => {
    localStorage.clear();
    window.location = '/';
  }

  render() {
    const tags = this.state.tagList;
    return (
      <div className="mainDiv">
        <Messages success={this.props.article.article.message} error={this.props.error} />
        <div className="navbarArticle">
          <a href="/"><img src={logo} className="logoArticle" alt="" /></a>
          <input className="tagInput" placeholder="Enter Tags Here" onChange={this.enterTags} onKeyPress={this.showTag} required pattern="/^[a-zA-Z]*$/" type="text" />
          <button className="publishBtnArticle" onClick={this.onClickPublish} type="button">Publish now!</button>
          <img src={localStorage.getItem('image')} className="man" alt="" />
          <span className="spanCA">{localStorage.getItem('username')}</span>
          <div className="cADW">
            <Dropdown />
          </div>
        </div>
        <div className="articleCreationDiv">
          <div className="tagsArticle">
            {tags === null || tags[0] === 'Tag' ? '' : tags[0].split(' ').map((tag) => (
              <div key={uuid()} ref={this.tagContainer} style={tags[0] === '' ? { display: 'none' } : { display: 'block' }} className="theTags">
                <button type="button" className="tagCA">
                  { tag }
                </button>
                <button type="button" className="tagClose" onClick={this.removeTag} value={tag}>x</button>
              </div>
            )) }
          </div>
          <div className="articleCreationSD">
            <div className="titleContent">
              <input
                value={this.state.title}
                onChange={this.changeTitle}
                className="bounty"
              />
            </div>
            <div className="textContent">
              <CKEditor
                editor={ClassicEditor}
                data={this.state.body}
                onChange={this.changeBody}
                config={editorConfigs}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateArticle.propTypes = {
};

const getStateFromStore = state => ({
  article: state.articles,
  error: state.articles.article.error,
});

export default connect(getStateFromStore, { updateArticle, getArticle })(UpdateArticle);
