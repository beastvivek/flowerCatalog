(function () {
  const generateRowData = (data) => {
    const tdElement = document.createElement('td');
    tdElement.innerText = data;
    return tdElement;
  };

  const generatePostRow = ({ timeStamp, name, comment }) => {
    const rowElement = document.createElement('tr');
    rowElement.append(generateRowData(timeStamp));
    rowElement.append(generateRowData(name));
    rowElement.append(generateRowData(comment));
    return rowElement;
  };

  const appendTableRow = (post, tableBody) => {
    tableBody.append(generatePostRow(post));
  };

  const generateTableBody = (xhr) => {
    const tableBody = document.querySelector('.comments > tbody');
    tableBody.innerText = '';
    const posts = JSON.parse(xhr.response);
    posts.forEach((post) => appendTableRow(post, tableBody));
  };

  const generateError = (xhr) => {
    const bodyElement = document.querySelector('body');
    bodyElement.innerText = xhr.statusText;
  };

  const parseFormData = (formData) => {
    return new URLSearchParams(formData);
  };

  const addComment = () => {
    const xhr = new XMLHttpRequest();
    const formElement = document.querySelector('.comment-form');
    const formData = new FormData(formElement);

    const parsedData = parseFormData(formData);

    xhr.onload = (event) => {
      if (xhr.status === 200) {
        return generateTableBody(xhr);
      }
      return generateError(xhr);
    };
    xhr.open('POST', '/guestbook');
    xhr.send(parsedData);
    formElement.reset();
  };

  const main = () => {
    const addCommentElement = document.querySelector('.add-comment');
    addCommentElement.onclick = addComment;
  }

  window.onload = main;
})();