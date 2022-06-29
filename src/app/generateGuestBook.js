const fs = require('fs');

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
  const template = fs.readFileSync('./resource/guestbook.html', 'utf8');
  const content = template.replace('__COMMENTS__', comments);
  return content;
};

const generateGuestBook = (comments) => {
  const content = getContent(comments);
  return content;
};

exports.generateGuestBook = generateGuestBook;
