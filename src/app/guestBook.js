const fs = require('fs');

const generatePostRow = (timeStamp, name, comment) => {
  const timeStampTag = `<td>${timeStamp}</td>`;
  const nameTag = `<td>${name}</td>`;
  const commentTag = `<td>${comment}</td>`;
  const post = `<tr>${timeStampTag}${nameTag}${commentTag}</tr>`;
  return post;
};

class GuestBook {
  #comments;
  constructor(comments) {
    this.#comments = comments;
  }

  addComment(comment) {
    this.#comments.unshift(comment);
  }

  toJson() {
    return JSON.stringify(this.#comments);
  }

  #createTable() {
    const comments = this.#comments.map(({ timeStamp, name, comment }) => {
      return generatePostRow(timeStamp, name, comment);
    }).join('');
    const table = `<table class="comments"><tbody>${comments}</tbody></table>`;
    return table;
  }

  toHtml(template, name) {
    template = template.replace('__COMMENTS__', this.#createTable());
    return template.replace('__NAME__', name.toUpperCase());
  }
}

const getContent = (comments, name) => {
  const guestBook = new GuestBook(comments);
  const template = fs.readFileSync('./resource/guestbook.html', 'utf8');
  const content = guestBook.toHtml(template, name);
  return content;
};

const generateGuestBook = (comments, name) => {
  const content = getContent(comments, name);
  return content;
};

module.exports = { GuestBook, generateGuestBook };
