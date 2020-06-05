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

const getAMessageById = async (id) => {
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

    // const response = await fetchResult;
    // return await response.json();
  } catch (err) {
    throw Error(err);
  }
};

$(() => {
  const $tBodyMessageTable = $('.messages-table tbody');

  $tBodyMessageTable.on('click', 'tr', function () {
    const messageId = $(this).data('id');

    getAMessageById(messageId)
      .then((messageArray) => {
        const {
          id,
          name,
          message,
          email,
          created_at: date,
          is_read: isRead,
        } = messageArray[0];
        // console.log(message);
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

  let currentMessage = {};

  $('li.message-item')
    .on('click', function () {
      const message = JSON.parse($(this)
        .data('message'));

      $.ajax({
        url: `/api/message/${message.id}`,
        method: 'put',
        dataType: 'json',
        timeout: 6000,
        beforeSend: () => {
          $('.loader')
            .removeClass('d-none')
            .addClass('d-flex');
        },
        statusCode: {
          204: () => {
            $(this)
              .find('span.read-status-indicator')
              .addClass('d-hidden');
            $('.message-bubble')
              .removeClass('d-none')
              .addClass('d-flex');

            $('.button-share-container')
              .removeClass('d-none')
              .addClass('d-block');

            $('.loader')
              .removeClass('d-flex')
              .addClass('d-none');
          },
          202: () => {
          },
          205: () => {
          },
        },
        error: (err) => {
          console.log(err);
        },
      });

      currentMessage = message;

      $('span.name')
        .text(message.sender_name);
      $('span.email')
        .text(message.sender_email);
      const date = message.date.split('T')[0].split('-')
        .join(', ');
      const time = message.date.split('T')[1].split('.')[0];
      $('.clearfix span.date')
        .text(`${date} - ${time}`);
      $('p.message-text')
        .text(message.message_text);
    });

  $('a.buttons')
    .on('click', function () {
      const btnRole = $(this)
        .attr('role');

      if (btnRole === 'delete' && window.confirm('Are you sure about this?')) {
        $.ajax({
          url: `/delete-message/${currentMessage.id}`,
          method: 'delete',
          dataType: 'json',
          timeout: 6000,
          beforeSend: () => {
            $('.overlay')
              .css({
                visibility: 'visible',
              });
          },
          statusCode: {
            204: () => {
              $('ul')
                .find(`[id='${currentMessage.id}']`)
                .hide('slow', function () {
                  $(this)
                    .remove();
                  $('.message-bubble')
                    .removeClass('d-flex')
                    .addClass('d-none');
                });
              $('.overlay')
                .css({
                  visibility: 'hidden',
                });

              $('.button-share-container')
                .removeClass('d-block')
                .addClass('d-none');

              currentMessage = {};
            },
            202: () => {
            },
            205: () => {
            },
          },
          error: () => {
            window.location.href = '/server-error';
            console.log('500');
          },
        });

        $('.button-share-container')
          .removeClass('d-block')
          .addClass('d-none');
      } else if (btnRole === 'reply') {
        window.location.href = `mailto: ${currentMessage.sender_email}?subject=Exceptional Developers`;
      }
    });
});
