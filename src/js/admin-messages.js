$(() => {
  let currentMessage = {};

  $('li.message-item')
    .on('click', () => {
      const message = JSON.parse($(this)
        .attr('data-message'));

      $.ajax({
        url: '/mark-message/',
        method: 'put',
        dataType: 'json',
        data: {
          messageId: message.id,
        },
        timeout: 6000,
        beforeSend: () => {
        },
        statusCode: {
          204: () => {
            $(this)
              .find('span.read-status-indicator')
              .addClass('d-hidden');
            $('.message-bubble')
              .removeClass('d-none')
              .addClass('d-flex');
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

      currentMessage = message;

      $('span.name')
        .text(message.sender_name);
      $('span.email')
        .text(message.sender_email);
      $('span.date')
        .text(message.date);
      $('p.message-text')
        .text(message.message_text);
    });

  $('a.buttons')
    .on('click', () => {
      const role = $(this)
        .attr('role');

      // eslint-disable-next-line
      if (role === 'delete' && confirm('Are you sure about this ?')) {
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
                .hide('slow', () => {
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
      } else if (role === 'reply') {
        window.location.href = `mailto: ${currentMessage.sender_email}?subject=Exceptional Developers`;
      }
    });
});
