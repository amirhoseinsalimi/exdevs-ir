/* eslint-disable func-names, prefer-arrow-callback */

const getAllMembers = async () => {
  try {
    const fetchResult = await fetch('/api/member', {
      method: 'get',
    });

    const response = await fetchResult;
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getMemberById = async (id) => {
  try {
    const fetchResult = await fetch(`/api/member/${id}`, {
      method: 'get',
    });

    const response = await fetchResult;
    return await response.json();
  } catch (err) {
    throw Error(err);
  }
};

// const addNewMember = async (newMemberData) => {
//   try {
//     const fetchResult = await fetch('/api/member/', {
//       method: 'post',
//       body: {
//
//       },
//     });
//   } catch (err) {
//
//   }
// };

const updateMemberById = async (id) => {
  try {
    await fetch(`/api/member/${id}`, {
      method: 'put',
    });
  } catch (err) {
    throw Error(err);
  }
};

const deleteMemberById = async (id) => {
  if (!id) {
    return;
  }

  try {
    await fetch(`/api/member/${id}`, {
      method: 'delete',
    });
  } catch (err) {
    throw Error(err);
  }
};

$(() => {
  const $membersContainer = $('.members-container');
  const $btnUpdateMember = $('.btn-update-member');
  const $form = $('form');
  const $addNewMember = $('.add-new-member');

  let currentMemberId = 0;

  $addNewMember.on('click', function () {
    $('#name').val('');
    $('#email').val('');
    $('#description').val('');
    $('#telegram').val('');
    $('#github').val('');
    $('#role').val('');
    $('#twitter').val('');
    $('#linkedin').val('');
    $('#photo').val('');

    $('#memberModal').modal('toggle');
    $('.modal-title').text('Add New Member');
    $form.attr('action', '/api/member/');
    $form.attr('method', 'post');

    $('.modal-footer .btn-update').addClass('invisible').removeClass('visible');
    $('.modal-footer .btn-add').addClass('visible').removeClass('invisible');
  });

  $form.on('submit', () => {
    console.log('Added');
  });

  $membersContainer.on('click', '.btn-delete-member', function () {
    if (!window.confirm('Are you sure?')) {
      return;
    }

    deleteMemberById(currentMemberId)
      .then(() => {
        window.location.reload();
      });
  });

  $membersContainer.on('click', '.btn-update', function () {
    const messageId = $(this).closest('.card').data('id');

    getMemberById(messageId)
      .then((memberArray) => {
        $('.modal-footer .btn-update').removeClass('invisible').addClass('visible');
        $('.modal-footer .btn-add').removeClass('visible').addClass('invisible');

        const {
          id,
          full_name: name,
          role,
          description,
          photo,
          telegram,
          email,
          twitter,
          linkedin,
          github,
        } = memberArray[0];

        currentMemberId = id;

        $('#name').val(name);
        $('#email').val(email);
        $('#description').val(description);
        $('#telegram').val(telegram);
        $('#github').val(github);
        $('#role').val(role);
        $('#twitter').val(twitter);
        $('#linkedin').val(linkedin);

        $('#memberModal').modal('toggle');

        // updateMemberById(messageId)
        //   .then(() => {
        //     $(`[data-id=${messageId}] .read-indicator`).attr('src', '/icons/circle.svg');
        //   });
      });
  });

  getAllMembers()
    .then((members) => {
      members.forEach(({
        id,
        full_name,
        role,
        description,
        photo,
        telegram,
        email,
        twitter,
        linkedin,
        github,
      }) => {
        photo = photo.replace(/uploads/g, '');
        console.log(photo);

        $membersContainer.prepend(`
        <div class="col-12 col-md-6 col-lg-3 mb-2">
          <div class="card mb-2 d-inline-block h-100" data-id="${id}">
            <img src="${photo}" class="card-img-top" alt="${full_name}'s photo">
            <div class="card-body">
              <h5 class="card-title">${full_name}</h5>
              <p class="card-text">${description}</p>
            </div>
            <div class="card-footer d-flex justify-content-center">
              <div class="btn-group btn-group-sm mx-auto" role="group" aria-label="Team member">
                <button type="button" class="btn btn-danger btn-delete-member">Delete</button>
                <button type="button" class="btn btn-info btn-update">Update</button>
              </div>
            </div>
          </div>
        </div>
        `);
      });
    });
});
