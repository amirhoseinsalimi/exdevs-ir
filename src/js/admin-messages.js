/* eslint-disable func-names */

$(() => {
  let currentMessage = {};

  $('li.message-item')
    .on('click', function () {
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
