import app from '../app/middleware';

import index from '../app/controllers/web';
import adminLogin from '../app/controllers/web/admin/admin';
import adminMessages from '../app/controllers/web/admin/messages';
import adminMembers from '../app/controllers/web/admin/members';
import adminTeams from '../app/controllers/web/admin/teams';

app.use('/', index);

app.use('/admin', adminLogin);
app.use('/admin/messages', adminMessages);
app.use('/admin/members', adminMembers);
app.use('/admin/teams', adminTeams);
