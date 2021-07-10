const verifyToken = require('../middlewares/authJWT');
const controller = require('../controllers/user.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.get('/api/user/info', [verifyToken], controller.userInfo);
  app.get('/api/user/chats', [verifyToken], controller.userChats);
};
