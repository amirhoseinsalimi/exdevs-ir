import app from '../app/middleware';

import messageController from '../app/controllers/api/messageController';
import memberController from '../app/controllers/api/memberController';
import teamController from '../app/controllers/api/teamController';

app.use('/api/message', messageController);
app.use('/api/member', memberController);
app.use('/api/team', teamController);
