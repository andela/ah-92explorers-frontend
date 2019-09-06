/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-inline';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import uuid from 'uuidv4';
import Dropdown from '../Layout/Dropdown.jsx';
import editorConfigs from '../../helpers/ckEditorConfig';
import { publishArticle } from '../../redux/actions/actionCreators';
import Messages from '../Messages/Messages.jsx';
import '../../assets/css/Create.Article.css';
import logo from '../../assets/icons/logo.png';

export class CreateArticle extends Component {
  state = {
    title: 'Write a title',
    body: '<p>Where have you been</p>',
    tagList: ['Tag'],
    tags: null,
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

  enterTags = (e) => {
    const letters = /^[a-zA-Z]+$/;
    if (e.target.value.match(letters)) {
      this.setState({ tags: e.target.value.trim().toLowerCase() });
      return true;
    }
    return false;
  }

  signOut = () => {
    localStorage.clear();
    window.location = '/';
  }

  showTag = (e) => {
    const letters = /^[a-zA-Z]*$/;
    const { tags, tagList } = this.state;
    tags.trim();
    if (e.key === 'Enter') {
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

  render() {
    const tags = this.state.tagList;
    return (
      <div className="mainDiv">
        <Messages success={this.props.article.message} error={this.props.error} />
        <div className="navbarArticle">
          <Link to="/"><img src={logo} className="logoArticle" alt="" /></Link>
          <input className="tagInput" placeholder="Enter Tags Here" onChange={this.enterTags} onKeyPress={this.showTag} type="text" required pattern="/^[a-zA-Z]*$/" />
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
