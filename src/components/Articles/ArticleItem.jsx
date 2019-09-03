import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import Spinner from '../Spinner/Spinner';
import { getArticle } from '../../redux/actions/actionCreators';

export class ArticleItem extends Component {
  componentDidMount() {
    const slug = this.props.match.params.articleSlug;
    this.props.getArticle(slug);
  }

  render() {
    if (this.props.loading) {
      return <Spinner />;
    }
    const { title, slug, body } = this.props.article;
    return (
      <div>
        <h1>{title}</h1>
        <a href={`/article/${slug}/update`}><button type="button">Update</button></a>
        <div>
          {ReactHtmlParser(body)}
        </div>
      </div>
    );
  }
}

const getArticleFromStore = (state) => ({
  article: state.articles.article,
  loading: state.articles.loading,
});

export default connect(getArticleFromStore, { getArticle })(ArticleItem);
