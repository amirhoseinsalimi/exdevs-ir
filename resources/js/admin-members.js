/* eslint-disable func-names, prefer-arrow-callback */

const getAllMembers = async () => {
  let response = [];

  try {
    const fetchResult = await fetch('/api/member', {
      method: 'get',
    });

    response = await (await fetchResult).json();
  } catch (err) {
    console.log(err);
  }

  return response;
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

const updateMemberById = async (id, member) => {
  $.ajax({
    method: 'PUT',
    url: `/api/member/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(member),
    async success() {
      $('#memberModal').modal('toggle');
      window.location.reload();
    },
    complete() {
      $('.modal label[for=photo]').addClass('visible').removeClass('invisible');
      $('.modal #photo').addClass('visible').removeClass('invisible');
    },
  });
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

$(async () => {
  const $membersContainer = $('.members-container');
  const $btnUpdateMember = $('.btn-update-member');
  const $form = $('form');
  const $addNewMember = $('.add-new-member');

  let currentMemberId = 0;

  $addNewMember.on('click', function () {
    $('.modal label[for=photo]').addClass('visible').removeClass('invisible');
    $('.modal #photo').addClass('visible').removeClass('invisible');

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

  $btnUpdateMember.on('click', async () => {
    await updateMemberById(currentMemberId, {
      fullName: $('#name').val(),
      email: $('#email').val(),
      description: $('#description').val(),
      telegram: $('#telegram').val(),
      github: $('#github').val(),
      role: $('#role').val(),
      twitter: $('#twitter').val(),
      linkedin: $('#linkedin').val(),
    });
  });

  $membersContainer.on('click', '.btn-delete-member', async function () {
    if (!window.confirm('Are you sure?')) {
      return;
    }

    const memberId = $(this).closest('.card').data('id');

    await deleteMemberById(memberId);
    window.location.reload();
  });

  $membersContainer.on('click', '.btn-update', async function () {
    const messageId = $(this).closest('.card').data('id');

    const memberArray = await getMemberById(messageId);

    $('.modal-footer .btn-update').removeClass('invisible').addClass('visible');
    $('.modal-footer .btn-add').removeClass('visible').addClass('invisible');

    $('.modal label[for=photo]').removeClass('visible').addClass('invisible');
    $('.modal #photo').removeClass('visible').addClass('invisible');

    const {
      id,
      fullName: name,
      role,
      description,
      telegram,
      email,
      twitter,
      linkedin,
      github,
    } = memberArray;

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
  });

  const members = await getAllMembers();

  members.forEach(({ id, fullName, description, photo }) => {
    const photoCleaned = photo.replace(/uploads/g, '');

    $membersContainer.prepend(`
        <div class="col-12 col-md-6 col-lg-3 mb-2">
          <div class="card mb-2 d-inline-block h-100" style="width: 100%;" data-id="${id}">
            <img src="${photoCleaned}" class="card-img-top" alt="${fullName}'s photo">
            <div class="card-body">
              <h5 class="card-title">${fullName}</h5>
              <p class="card-text" style="word-break: break-word">${description}</p>
            </div>
            <div class="card-footer d-flex justify-content-center">
              <div class="btn-group btn-group-sm mx-auto" role="group" aria-label="Team member">
                <button type="button" class="btn btn-danger btn-delete-member">
                  Delete
                </button>
                <button type="button" class="btn btn-info btn-update">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
        `);
  });
});
