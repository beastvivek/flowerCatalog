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
  const comments = prevComments.map(({ timeStamp, name, comment }) => {
    return generatePostRow(timeStamp, name, comment);
  });
  return `<table class="comments"><tbody>${comments.join('')}</tbody></table>`;
};

const getContent = (prevComments) => {
  const comments = generateCommentsTable(prevComments);
  const template = fs.readFileSync('./data/guestbook.html', 'utf8');
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

const toGuestBookParams = (request) => {
  const post = {};
  const entries = request.url.searchParams.entries();

  for (const entry of entries) {
    post[entry[0]] = entry[1];
  }

  return post;
};

const generateGuestBook = (request) => {
  const { name, comment } = toGuestBookParams(request);
  const comments = JSON.parse(fs.readFileSync('./data/comments.json', 'utf8'));
  if (name && comment) {
    pushNewComment(name, comment, comments);
  }
  const content = getContent(comments);
  return content;
};

const commentHandler = (request, response) => {
  const guestBook = generateGuestBook(request);
  response.setHeader('content-type', 'text/html');
  response.end(guestBook);
  return true;
};

const addCommentHandler = (request, response) => {
  const { url: { pathname } } = request;
  if (pathname) {
    return commentHandler(request, response);
  }
  return false;
};

const dynamicHandler = (request, response) => {
  const { url: { pathname } } = request;
  if (pathname === '/guestbook.html') {
    return addCommentHandler(request, response);
  }
  return false;
};

module.exports = { dynamicHandler };
