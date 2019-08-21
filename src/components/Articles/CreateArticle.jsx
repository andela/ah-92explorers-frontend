/* eslint-disable  */
import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-inline';
import ContentEditable from 'react-contenteditable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import editorConfigs from '../../helpers/ckEditorConfig';
import { publishArticle } from '../../redux/actions/actionCreators';
import Messages from '../Messages/Messages.jsx';
import '../../assets/css/Create.Article.css'
import logo from '../../assets/icons/logo.png';
import avatar from '../../assets/icons/avatar.svg';

export class CreateArticle extends Component {
  state = {
    title: '<h1>Write a title</h1>',
    body: '<p>Where have you been</p>',
  }

  onClickPublish = () => {
    this.props.publishArticle(this.state)
  }

  render() {
    return (
    <div className="mainDiv">
        <Messages success={this.props.article.message} error={this.props.error} />
        <div className="navbar">
            <img src={logo} className="logo" />
            <button className="publishBtn" onClick={this.onClickPublish}>Publish now!</button>
            <img src={avatar} className="man" />
            <button className="signout">Signout</button>
        </div>
        <div className="titleContent">
            <ContentEditable 
              html={this.state.title}
              onChange={(e) => {
                this.setState({ title: e.target.value })
              }}
              className='bounty'
            /> 
        </div>
        <div className="textContent">
            <CKEditor 
              editor={ ClassicEditor }
              data={this.state.body}
              onChange={(event, editor) => {
                const data = editor.getData();
                this.setState({ body: data })
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
