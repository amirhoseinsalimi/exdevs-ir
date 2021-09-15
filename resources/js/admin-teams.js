/* eslint-disable func-names, prefer-arrow-callback */

const getAllTeams = async () => {
  try {
    const fetchResult = await fetch('/api/team', {
      method: 'get',
    });

    const response = await fetchResult;
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getTeamById = async (id) => {
  try {
    const fetchResult = await fetch(`/api/team/${id}`, {
      method: 'get',
    });

    const response = await fetchResult;
    return await response.json();
  } catch (err) {
    throw Error(err);
  }
};

const updateTeamById = async (id, team) => {
  $.ajax({
    method: 'PUT',
    url: `/api/team/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(team),
    async success() {
      $('#teamModal').modal('toggle');
      window.location.reload();
    },
    complete() {
      $('.modal label[for=photo]').addClass('visible').removeClass('invisible');
      $('.modal #photo').addClass('visible').removeClass('invisible');
    },
  });
};

const deleteTeamById = async (id) => {
  if (!id) {
    return;
  }

  try {
    await fetch(`/api/team/${id}`, {
      method: 'delete',
    });
  } catch (err) {
    throw Error(err);
  }
};

$(() => {
  const $teamsContainer = $('.teams-container');
  const $btnUpdateTeam = $('.btn-update-team');
  const $form = $('form');
  const $addNewTeam = $('.add-new-team');

  let currentTeamId = 0;

  $addNewTeam.on('click', async function () {
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

    $('#teamModal').modal('toggle');
    $('.modal-title').text('Add New Team');
    $form.attr('action', '/api/team/');
    $form.attr('method', 'post');

    $('.modal-footer .btn-update').addClass('invisible').removeClass('visible');
    $('.modal-footer .btn-add').addClass('visible').removeClass('invisible');
  });

  $form.on('submit', () => {
    console.log('Added');
  });

  $btnUpdateTeam.on('click', async () => {
    await updateTeamById(currentTeamId, {
      name: $('#name').val(),
      description: $('#description').val(),
      color: $('#color').val(),
    });
  });

  $teamsContainer.on('click', '.btn-delete-team', async function () {
    if (!window.confirm('Are you sure?')) {
      return;
    }

    const teamsId = $(this).closest('.card').data('id');

    await deleteTeamById(teamsId);
    window.location.reload();
  });

  $teamsContainer.on('click', '.btn-update', async function () {
    const teamId = $(this).closest('.card').data('id');

    const teamArray = await getTeamById(teamId);

    $('.modal-footer .btn-update').removeClass('invisible').addClass('visible');
    $('.modal-footer .btn-add').removeClass('visible').addClass('invisible');

    $('.modal label[for=photo]').removeClass('visible').addClass('invisible');
    $('.modal #photo').removeClass('visible').addClass('invisible');

    const {
      id,
      name,
      description,
      color,
    } = teamArray[0];

    currentTeamId = id;

    $('#name').val(name);
    $('#description').val(description);
    $('#color').val(color);

    $('#teamModal').modal('toggle');
  });

  const { teams } = getAllTeams();

  teams.forEach(({
    id,
    name,
    description,
    color,
  }) => {
    $teamsContainer.prepend(`
        <div class="col-12 col-md-6 mb-2">
          <div class="card mb-2 d-inline-block h-100" style="width: 100%; border-bottom: 5px solid ${color}" data-id="${id}">
            <div class="card-body">
              <h5 class="card-title font-weight-bold">${name}</h5>
              <p class="card-text" style="word-break: break-word">${description}</p>
            </div>
            <div class="card-footer d-flex justify-content-center">
              <div class="btn-group btn-group-sm mx-auto" role="group" aria-label="Team">
                <button type="button" class="btn btn-danger btn-delete-team">Delete</button>
                <button type="button" class="btn btn-info btn-update">Update</button>
              </div>
            </div>
          </div>
        </div>
        `);
  });
});
