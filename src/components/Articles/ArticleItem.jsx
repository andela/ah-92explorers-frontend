import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';
import Spinner from '../Spinner/Spinner';
import NavBar from '../Layout/navBar';
import Navbar from '../Layout/Navbar.jsx';
import { getArticle, deleteArticle } from '../../redux/actions/actionCreators';
import '../../assets/css/articleread.css';

export class ArticleReadDelete extends Component {
  state = {
    modal: false,
    slug: '',
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.setState({ slug: params.articleSlug });
    this.props.getArticle(params.articleSlug);
  }


  handleOnDelete = () => {
    const { match: { params } } = this.props;
    this.props.deleteArticle(params.articleSlug);
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  render() {
    const { fetched, owner, authenticated } = this.props.article;
    const loader = Object.keys(this.props.article.article).length === 0;
    return (
      <Fragment>
        { authenticated ? <NavBar /> : <Navbar /> }
        <div className="theBodyArticle">
          <div className="colOne">
            { owner && (
            <div className="deleteIcon" onClick={this.toggle}>
              <img src={require('../../assets/icons/trash.svg')} className="bodyIcons" alt="..." />
            </div>
            )}
            <br></br>
            { owner && (
            <div>
              <a href={`/article/${this.state.slug}/update`}><img src={require('../../assets/icons/edit.svg')} className="bodyIcons disappear edit" alt="..." /></a>
            </div>
            )}
          </div>
          <div className="colTwo">
            <h1 className="title">
              {fetched && this.props.article.article.title}
            </h1>
            <span className="time">
              {fetched && this.props.article.article.time.readTime}
              {' '}
              read
            </span>
            { ReactHtmlParser(fetched && this.props.article.article.body) }
          </div>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            Delete Article
            {' '}
            {fetched && this.props.article.article.title}
          </ModalHeader>
          <ModalBody>
            would you like to delete article?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.handleOnDelete}>Delete Article</Button>
            {' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  article: state.articles,
});

export const connectReadDelete = connect(mapStateToProps,
  { getArticle, deleteArticle })(ArticleReadDelete);
export { connectReadDelete as ReadArticle };
