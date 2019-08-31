import ReactParserHtml from 'react-html-parser';

const fetchImage = (body) => {
  const image = ReactParserHtml(body);
  let imageUrl;
  let defaultUrl;
  image.forEach((bd) => {
    if (bd.type === 'figure') {
      imageUrl = bd.props.children[0].props.src;
    }
    defaultUrl = process.env.DEFAULT_IMAGE;
  });
  if (imageUrl) {
    return imageUrl;
  }
  return defaultUrl;
};

export default fetchImage;
