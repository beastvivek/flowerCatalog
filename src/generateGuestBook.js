const fs = require('fs');

const getTimeStamp = () => {
  const date = new Date();
  const day = date.toLocaleDateString();
  const time = date.toLocaleTimeString();
  const timeStamp = `${day} ${time}`;
  return timeStamp;
};

const getContent = (prevComments) => {
  let comments = '';
  prevComments.forEach(({ timeStamp, name, comment }) => {
    comments = comments + `<p>${timeStamp} ${name} ${comment}</p>`;
  });
  const template = fs.readFileSync('./public/guestbook.html', 'utf8');
  const content = template.replace('__COMMENTS__', comments);
  return content;
};

const pushNewComment = (name, comment, comments) => {
  const timeStamp = getTimeStamp();
  const post = { timeStamp, name, comment };
  comments.push(post);
};

const generateGuestBook = (request) => {
  const { queryParams: { name, comment } } = request;
  const comments = JSON.parse(fs.readFileSync('./data/comments.json', 'utf8'));
  if (name && comment) {
    pushNewComment(name, comment, comments);
  }
  fs.writeFileSync('./data/comments.json', JSON.stringify(comments), 'utf8');
  const content = getContent(comments);
  return content;
};

module.exports = { generateGuestBook };
