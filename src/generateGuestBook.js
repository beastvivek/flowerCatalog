const fs = require('fs');

const getTimeStamp = () => {
  const date = new Date();
  const day = date.toLocaleDateString();
  const time = date.toLocaleTimeString();
  const timeStamp = `${day} ${time}`;
  return timeStamp;
};

const generatePostRow = (timeStamp, name, comment) => {
  const timeStampTag = `<td>${timeStamp}</td>`;
  const nameTag = `<td>${name}</td>`;
  const commentTag = `<td>${comment}</td>`;
  const post = `<tr>${timeStampTag}${nameTag}${commentTag}</tr>`;
  return post;
};

const generateCommentsTable = (prevComments) => {
  let comments = '';
  prevComments.forEach(({ timeStamp, name, comment }) => {
    const post = generatePostRow(timeStamp, name, comment);
    comments = comments + post;
  });
  return `<table class="comments"><tbody>${comments}</tbody></table>`;
};

const getContent = (prevComments) => {
  const comments = generateCommentsTable(prevComments);
  const template = fs.readFileSync('./public/guestbook.html', 'utf8');
  const content = template.replace('__COMMENTS__', comments);
  return content;
};

const pushNewComment = (name, comment, comments) => {
  const timeStamp = getTimeStamp();
  const post = { timeStamp, name, comment };
  comments.push(post);
  fs.writeFileSync('./data/comments.json', JSON.stringify(comments), 'utf8');
  return comments;
};

const generateGuestBook = (request) => {
  const { queryParams: { name, comment } } = request;
  let comments = JSON.parse(fs.readFileSync('./data/comments.json', 'utf8'));
  if (name && comment) {
    comments = pushNewComment(name, comment, comments);
  }
  const content = getContent(comments);
  return content;
};

module.exports = { generateGuestBook };
