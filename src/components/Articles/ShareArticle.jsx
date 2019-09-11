import React from 'react';
import { APP_URL_FRONTEND } from '../../utils/constants';

export class ShareArticle extends React.Component {
  shareSocial = (provider) => {
    const { fetched, article } = this.props;
    const url = `${APP_URL_FRONTEND}/article/${article.slug}`;
    const tweet = `"${article.title}" - by ${fetched && article.author.username} @ ${APP_URL_FRONTEND}/article/${article.slug}`;
    switch (provider) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${tweet}&hashtags=92-Explorers`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${article.title}&body=Checkout this article "${article.title}" by ${fetched && article.author.username} on Authors Haven. ${'\n\n'} @ ${url}`);
        break;
      default:
    }
  };

  render() {
    return (
      <div className="socialNet">
        <img
          src={require('../../assets/icons/facebook-logo-in-circular-button-outlined-social-symbol.svg')}
          className="bodyIcons shareIcons fb"
          alt="share to facebook"
          onClick={() => this.shareSocial('facebook')}
        />
        <img
          src={require('../../assets/icons/twitter-circular-button.svg')}
          className="bodyIcons shareIcons tw"
          alt="share to twitter"
          onClick={() => this.shareSocial('twitter')}
        />
        <img
          src={require('../../assets/icons/email.svg')}
          className="bodyIcons shareIcons gp"
          alt="share via email"
          onClick={() => this.shareSocial('email')}
        />
      </div>
    );
  }
}

export default ShareArticle;
