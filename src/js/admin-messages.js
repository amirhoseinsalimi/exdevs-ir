/* eslint-disable func-names, prefer-arrow-callback */

const getAllMessages = async () => {
  try {
    const fetchResult = await fetch('/api/message', {
      method: 'get',
    });

    const response = await fetchResult;
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getMessageById = async (id) => {
  try {
    const fetchResult = await fetch(`/api/message/${id}`, {
      method: 'get',
    });

    const response = await fetchResult;
    return await response.json();
  } catch (err) {
    throw Error(err);
  }
};

const markMessageAsRead = async (id) => {
  try {
    await fetch(`/api/message/${id}`, {
      method: 'put',
    });
  } catch (err) {
    throw Error(err);
  }
};

const deleteMessageById = async (id) => {
  if (!id) {
    return;
  }

  try {
    await fetch(`/api/message/${id}`, {
      method: 'delete',
    });
  } catch (err) {
    throw Error(err);
  }
};

$(() => {
  const $tBodyMessageTable = $('.messages-table tbody');
  const $btnDeleteMessage = $('.btn-delete-message');
  const $btnReplyMessage = $('.btn-reply-message');
  let currentMessageId = 0;
  let currentMessageEmail = '';

  $btnDeleteMessage.on('click', function () {
    deleteMessageById(currentMessageId)
      .then(() => {
        window.location.reload();
      });
  });

  $btnReplyMessage.on('click', function () {
    window.location.href = `mailto:${currentMessageEmail}`;
  });

  $tBodyMessageTable.on('click', 'tr', function () {
    const messageId = $(this).data('id');

    getMessageById(messageId)
      .then((messageArray) => {
        const {
          id,
          name,
          message,
          email,
          created_at: date,
        } = messageArray[0];

        currentMessageId = id;
        currentMessageEmail = email;

        $('#message-sender-name').text(name);
        $('#message-sender-email').text(email);
        $('#message-text').text(message);
        $('#message-date').text(date);

        $('#messageDetailsModal').modal('toggle');

        markMessageAsRead(messageId)
          .then(() => {
            $(`[data-id=${messageId}] .read-indicator`).attr('src', '/icons/circle.svg');
          });
      });
  });

  getAllMessages()
    .then((messages) => {
      messages.forEach(({
        id,
        name,
        message,
        email,
        created_at: date,
        is_read: isRead,
      }) => {
        $tBodyMessageTable.append(`
        <tr data-id="${id}">
          <th scope="row">
            <img
              class="read-indicator"
              src="${isRead ? '/icons/circle.svg' : '/icons/circle-fill.svg'}"
              alt="${isRead ? 'Message is read' : 'New message'}" />
          </th>
            <td>${name}</td>
            <td class="message">${message}</td>
            <td>${email}</td>
            <td>${date}</td>
          </tr>
        `);
      });
    });
});
