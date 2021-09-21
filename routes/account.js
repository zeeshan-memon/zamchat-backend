const Controller = require('../controllers/accounts');
module.exports = (app, tokenValidation, decodeBody) => {
    app.post('/login', decodeBody, Controller.login);
    app.route('/accounts/:id?')
        .get(tokenValidation, decodeBody, Controller.get)
        .post(decodeBody, Controller.create)
        .delete(tokenValidation, decodeBody, Controller.delete)
        .put(tokenValidation, decodeBody, Controller.update);
    app.post('/logout', tokenValidation, decodeBody, Controller.logout);
    app.get('/profile', tokenValidation, decodeBody, Controller.profile);
    app.post('/updatePassword', decodeBody, Controller.updatePassword);
    app.post('/changepassword', tokenValidation, decodeBody, Controller.changePassword);
    app.post('/forgetPassword', decodeBody, Controller.forgetPassword);

    app.get('/userWithCharityList', tokenValidation, decodeBody, Controller.getUserWithCharityList);
    app.post('/adminLogin', decodeBody, Controller.adminLogin);
    app.route('/getAllUsers')
        .post(tokenValidation, decodeBody, Controller.getAllUsers)

    app.post('/sendSms', decodeBody, Controller.sendSms);
    app.post('/resendcode', decodeBody, Controller.resendCode);
    app.post('/verifycode', decodeBody, Controller.verifyCode);
    app.get('/autoSendSms', decodeBody, Controller.autoSendSms);
}
