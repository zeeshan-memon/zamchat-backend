'use strict';

const helper = require('../helper/helper');
const config = require('../config/config');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const repository = require('../helper/seq-repository');
const sequelize = require('../config/sequelize').sequelize;
const seqModels = require('../models/index');
const templates = require('../helper/templates');
var generator = require('generate-password');
const {
  Sequelize
} = require('sequelize');
const Op = Sequelize.Op;
let transaction = null;
var dateFormat = require('dateformat');
module.exports = {

  /**
   * ===================================================================================================================
   * Request for login to the system from web.
   * ===================================================================================================================
   */

  login: async (req, res) => {

    await fnLogin(req, res);

  },


  /**
   * ===================================================================================================================
   * Request for crete new Account. like crete new profile of user, admin, etc. This
   * Request set admin123 as default password and generate a JWT token and send in the user email to varify his email.
   * ===================================================================================================================
   */
  create: async (req, res) => {

    await fnCreateAccount(req, res);

  },

  /**
   * ===================================================================================================================
   * Request for getting the  list or single user account. client can also pass query string in the requets . Also
   * client can pass accountid in parameter to get single account's data. This Request will never return password
   * fields present in an account.
   * ===================================================================================================================
   */
  get: async (req, res) => {

    await fnGetAccount(req, res);

  },

  /**
   * ===================================================================================================================
   * Request to delete an account. This request will update isDeleted Field in a perticular account.
   * ===================================================================================================================
   */

  delete: async (req, res) => {

    await fnDeleteAccount(req, res);

  },

  /**
   * ===================================================================================================================
   * General Request for update fields in a perticular account. The request is also used to update first password set by
   * the account user after emaiil varification.
   * ===================================================================================================================
   */

  update: async (req, res) => {

    await fnUpdateAccount(req, res);

  },

  /**
   * ===================================================================================================================
   * Seperate request for getting the profile of a perticulat user account.
   * ===================================================================================================================
   */

  profile: async (req, res) => {

    await fnGetProfile(req, res);

  },

  /**
   * ===================================================================================================================
   * Request for forget password. This request will generate a token and send on user's varified email address . user
   * can use the token to update its password
   * ===================================================================================================================
   */

  forgetPassword: async (req, res) => {

    await fnForgetPassword(req, res);

  },

  /**
   * ===================================================================================================================
   * Request for logout an account. This request is used to log out karry and remove its device id from db so that
   * karry can login again from another device as well.
   * ===================================================================================================================
   */

  logout: async (req, res) => {

    await fnLogout(req, res);

  },

  /**
   * ===================================================================================================================
   * Request for change password. this request has been used for both mobile and web interfaces to change a password of
   * an account. that means user can change his password by providing old password and new password.
   * ===================================================================================================================
   */

  changePassword: async (req, res) => {

    await fnChangePassword(req, res);

  },

  /**
   * ===================================================================================================================
   * Request for change password. this request has been used for both mobile and web interfaces to change a password of
   * an account. that means user can change his password by providing old password and new password.
   * ===================================================================================================================
   */

  updatePassword: async (req, res) => {

    await fnUpdatePassword(req, res);

  },

  /**
   * ===================================================================================================================
   * Request for getting the single user account with list of user charities.
   * ===================================================================================================================
   */
  getUserWithCharityList: async (req, res) => {

    await fnGetUserWithCharityList(req, res);

  },

  /**
   * ===================================================================================================================
   * Request for login to the system from web.
   * ===================================================================================================================
   */

  adminLogin: async (req, res) => {

    await fnAdminLogin(req, res);

  },


  /**
   * ===================================================================================================================
   * Request for getting the  list of user account. client can also pass query string in the requets. 
   * ===================================================================================================================
   */
  getAllUsers: async (req, res) => {

    await fnGetAllUsers(req, res);

  },

  /**
   * ===================================================================================================================
   * Request for send sms to client to inform them schedueling.
   * ===================================================================================================================
   */

  sendSms: async (req, res) => {

    await fnSendSms(req, res);

  },

  /**
   * ===================================================================================================================
   * Request for verify OTP code.
   * ===================================================================================================================
   **/

  verifyCode: async (req, res) => {

    await fnVerifyCode(req, res);

  },

  /**
   * ===================================================================================================================
   * Request for resend OTP code.
   * ===================================================================================================================
   */

  resendCode: async (req, res) => {

    await fnResendCode(req, res);

  },

  /**
   * ===================================================================================================================
   * Request for send sms to client to inform them schedueling.
   * ===================================================================================================================
   */

  autoSendSms: async (req, res) => {

    await fnAutoSendSms(req, res);

  },
}


async function fnLogin(req, res) {
  const body = req.body;
  if (!body.email && !body.password && !body.accountType) {
    return res.status(200).json(helper.error_message(helper.responseMessages.unauthorized_request));
  }
  const query = {
    email: body.email.toLowerCase(),
  };
  try {
    transaction = await sequelize.transaction();
    if (body.accountType === 'normal') {
      const user = await repository.get(seqModels.accounts, query, true, null, null, null, transaction, null, null, null, false)
      if (!user) {
        return res.status(200).json(helper.error_message(helper.responseMessages.incorrect_user));
      } else if (user) {
        await transaction.commit();
        bcrypt.compare(body.password, user.password, (err, result) => {
          if (result) {
            const data = {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName || '',
              role: user.role,
              email: user.email,
              image: user.image,
              // sequence: user.sequence,
              city: user.city,
            };
            const temp = {};
            jwt.sign(data, config.secret, {
              expiresIn: '2400h',
            }, async (err, token) => {
              temp.name = user.firstName + ' ' + user.lastName;
              temp.role = user.role;
              temp.token = token;
              temp.email = user.email;
              return res.status(200).json(helper.success_message(temp));
            });
          } else {
            if (checkIfAJAXRequest(req)) {
              return res.status(200).json(helper.error_message(helper.responseMessages.incorrect_user_password));
            } else {
              return res.status(200).json(helper.error_message(helper.responseMessages.incorrect_user_password));
            }
          }
        });
      } else {
        throw 'Unexpected value for user';
      }
    } else {
      const user = await repository.get(seqModels.accounts, query, true, null, null, null, transaction, null, null, null, false)
      if (!user) {
        return res.status(200).json(helper.error_message(helper.responseMessages.incorrect_user));
      } else if (user) {
        await transaction.commit();
        const temp = {};
        const data = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName || '',
          role: user.role,
          email: user.email,
          image: user.image,
          // sequence: user.sequence,
          city: user.city,
        };
        jwt.sign(data, config.secret, {
          expiresIn: '2400h',
        }, async (err, token) => {
          temp.name = user.firstName + ' ' + user.lastName;
          temp.role = user.role;
          temp.token = token;
          temp.email = user.email;
          return res.status(200).json(helper.success_message(temp));
        });
      } else {
        throw 'Unexpected value for user';
      }
    }
  } catch (e) {
    await transaction.rollback();
    return res.status(200).json(helper.error_message(e));
  }
}

// async function fnCreateAccount(req, res) {
//   try {
//     const body = req.body;
//     let password;
//     let isPassword = body.password;
//     console.log('body!!!', body);
//     // body.password = 'jEtHYjC2bcjEqnht';

//     // body.sequence = await model.counters.increment({
//     //   id: 'accounts',
//     // });
//     if (body.password) {
//       body.password = helper.generateHash(body.password);
//     } else
//     if (!body.password) {
//       password = generator.generate({
//         length: 8,
//         numbers: true
//       });
//       body.password = helper.generateHash(password);
//     }
//     validateUserModel(body, res);
//     if (body.email && body.email !== '') {
//       body.email = body.email.toLowerCase();
//       transaction = await sequelize.transaction();
//       const existed = await repository.get(seqModels.accounts, {
//         email: body.email,
//       }, true, null, null, null, transaction, null, null, null, false);
//       if (existed) {
//         await transaction.commit();
//         return res.status(200).json(helper.error_message(helper.responseMessages.already_registered));
//       }
//     }
//     const data = await repository.save(seqModels.accounts, body, transaction);

//     const obj = {
//       id: data.id,
//       firstName: data.firstName,
//       lastName: data.lastName || '',
//       email: data.email,
//       role: data.role,
//       image: data.image
//     };
//     var temp = {};
//     jwt.sign(obj, config.secret, {
//       expiresIn: '2400h',
//     }, async (err, token) => {
//       if (err) {
//         return res.status(200).json(helper.error_message(err));
//       }
//       temp.name = data.firstName + ' ' + data.lastName;
//       temp.role = data.role;
//       temp.token = token;
//       temp.email = data.email;
//       const message = {
//         Recipients: body.email,
//         Subject: 'Welcome to Reuse',
//         message: templates.welocmeEmail(data.email, data.contact),
//       };
//       await helper.sendEmail(message);
//       if (!isPassword) {
//         const message = {
//           Recipients: body.email,
//           Subject: 'Password set Request',
//           message: templates.sendPassword(password),
//         };
//         await helper.sendEmail(message);
//       }
//       await transaction.commit();
//       return res.status(200).json(helper.success_message(temp));
//     });
//   } catch (e) {
//     await transaction.rollback();
//     return res.status(200).json(helper.error_message(e));
//   }
// }

async function fnCreateAccount(req, res) {
  try {
    let body = req.body;
    body.contact = `${body.contact}`
    let password;
    let isPassword = body.password;
    console.log('body!!!', body);
    // body.password = 'jEtHYjC2bcjEqnht';

    // body.sequence = await model.counters.increment({
    //   id: 'accounts',
    // });
    if (body.password) {
      body.password = helper.generateHash(body.password);
    } else
      if (!body.password) {
        password = generator.generate({
          length: 8,
          numbers: true
        });
        body.password = helper.generateHash(password);
      }
    validateUserModel(body, res);



    if (body.email && body.email !== '') {
      body.email = body.email.toLowerCase();
      const existed = await repository.get(seqModels.accounts, {
        email: body.email,
      }, true, null, null, null, null, null, null, null, false);
      if (existed) {
        return res.status(200).json(helper.error_message(helper.responseMessages.already_registered));
      }
    }

    transaction = await sequelize.transaction();
    let data
    if (body.contact && body.contact !== '') {
      body.contact = body.contact.toLowerCase();
      const existedAnonymous = await repository.get(seqModels.accounts, {
        contact: body.contact,
      }, true, null, null, null, null, null, null, null, false);

      if (existedAnonymous && existedAnonymous.role == 'anonymous') {
        const update = await repository.update(seqModels.accounts, {
          contact: body.contact,
        }, body, transaction);

        if(update){
          data = await repository.get(seqModels.accounts, {
            contact: body.contact,
          }, true, null, null, null, null, null, null, null, false);
        }
      } else if(existedAnonymous && existedAnonymous.role == 'user'){
        // await transaction.commit();
        return res.status(200).json(helper.error_message(helper.responseMessages.contact_already_registered));
      }else{
        data = await repository.save(seqModels.accounts, body, transaction);
      }
      
    }


    const obj = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName || '',
      email: data.email,
      role: data.role,
      image: data.image
    };
    var temp = {};
    jwt.sign(obj, config.secret, {
      expiresIn: '2400h',
    }, async (err, token) => {
      if (err) {
        return res.status(200).json(helper.error_message(err));
      }
      temp.name = data.firstName + ' ' + data.lastName;
      temp.role = data.role;
      temp.token = token;
      temp.email = data.email;
      const message = {
        Recipients: body.email,
        Subject: 'Welcome to Reuse',
        message: templates.welocmeEmail(data.email, data.contact),
      };
      await helper.sendEmail(message);
      if (!isPassword) {
        const message = {
          Recipients: body.email,
          Subject: 'Password set Request',
          message: templates.sendPassword(password),
        };
        await helper.sendEmail(message);
      }
      await transaction.commit();
      return res.status(200).json(helper.success_message(temp));
    });

  } catch (e) {
    await transaction.rollback();
    return res.status(200).json(helper.error_message(e));
  }
}

async function fnGetAccount(req, res) {
  let query = {};
  let isSingle = false;
  if (req.query) {
    query = req.query;
  }
  if (req.params && req.params.id) {
    query = {
      id: req.params.id,
    };
    isSingle = true;
  }
  try {
    transaction = await sequelize.transaction();
    const data = await repository.get(seqModels.accounts, query, isSingle, null, null, null, transaction, null, null, null, false);
    await transaction.commit();
    return res.status(200).json(helper.success_message(data));
  } catch (e) {
    await transaction.rollback();
    return res.status(200).json(helper.error_message(e));
  }
}

async function fnDeleteAccount(req, res) {
  if (req.params && req.params.id) {
    const body = {
      isDeleted: true,
    };
    const query = {
      id: req.params.id,
    };
    try {
      transaction = await sequelize.transaction();
      const data = await repository.update(seqModels.accounts, query, body, transaction);
      await transaction.commit();
      return res.status(200).json(helper.success_message(data));
    } catch (e) {
      await transaction.rollback();
      return res.status(200).json(helper.error_message(e));
    }
  } else {
    return res.status(200).json(helper.error_message(helper.responseMessages.parameter_Missing));
  }
}

async function fnUpdateAccount(req, res) {
  if (req.params && req.params.id) {
    let body = req.body;
    body.contact = `${body.contact}`
    const query = {
      id: req.params.id,
    };
    let message = {};
    try {
      transaction = await sequelize.transaction();
      const account = await repository.get(seqModels.accounts, query, true, null, null, null, transaction, null, null, null, false);
      if (account == null) {
        await transaction.rollback();
        return res.status(200).json(helper.error_message('Account Not Found'));
      }
      let updateReason = body.reason ? body.reason : 'Update profile';
      if (body.password) {
        // if (account.isVarified == true) {
        //   return res.status(200).json(helper.error_message('Cannot Change Password. Your Link has been used once.'));
        // }
        const newPassword = body.password;
        body.password = helper.generateHash(newPassword);
        body.isVarified = true;
        updateReason = body.reason || 'Password Updating';
        message = {
          Recipients: account.email, // req.session.email,
          Subject: 'Password Updated',
          message: templates.passwordUpdated(account, newPassword),
        };
        helper.sendEmail(message);
      }
      body.updateReason = updateReason;
      console.log('body', body);
      const data = await repository.update(seqModels.accounts, query, body, transaction);
      console.log('update account', data);
      await transaction.commit();
      return res.status(200).json(helper.success_message(data));
    } catch (e) {
      await transaction.rollback();
      return res.status(200).json(helper.error_message(e));
    }
  } else {
    return res.status(200).json(helper.error_message(helper.responseMessages.parameter_Missing));
  }
}

async function fnGetProfile(req, res) {
  try {
    transaction = await sequelize.transaction();
    const data = await repository.get(seqModels.accounts, {
      id: req.session.id
    }, true, null, null, null, transaction, null, null, null, false);
    await transaction.commit();
    return res.status(200).json(helper.success_message(data));
  } catch (e) {
    await transaction.rollback();
    return res.status(200).json(helper.error_message(e));
  }
}

async function fnChangePassword(req, res) {
  const body = req.body;
  try {
    if (!body.oldPassword) {
      return res.status(200).json(helper.error_message(helper.responseMessages.fields_missing + ' : Old Password'));
    }
    if (!body.newPassword) {
      return res.status(200).json(helper.error_message(helper.responseMessages.fields_missing + ' : New Password'));
    }
    transaction = await sequelize.transaction();
    const user = await repository.get(seqModels.accounts, {
      id: req.session.id,
    }, true, null, null, null, transaction, null, null, null, false);
    if (user) {
      bcrypt.compare(body.oldPassword, user.password, async (err, result) => {
        if (result) {
          const newPassword = body.newPassword;
          body.newPassword = helper.generateHash(newPassword);
          // const updateReason = body.reason ? body.reason : 'Update profile Password';
          await repository.update(seqModels.accounts, {
            id: req.session.id,
          }, {
            password: body.newPassword,
          }, transaction);
          const message = {
            Recipients: user.email,
            Subject: 'Password Updated',
            message: templates.passwordUpdated(user, newPassword),
          };
          helper.sendEmail(message);
          await transaction.commit();
          return res.status(200).json(helper.success_message('Password Updated.'));
        } else {
          await transaction.commit();
          return res.status(200).json(helper.error_message('Invalid Old Password'));
        }
      });
    } else {
      await transaction.commit();
      return res.status(200).json(helper.error_message('User Not Found.'));
    }
  } catch (e) {
    await transaction.rollback();
    return res.status(200).json(helper.error_message(e));
  }
}

async function fnForgetPassword(req, res) {
  const body = req.body;
  if (!body.email) {
    return res.status(200).json(helper.error_message(helper.responseMessages.fields_missing + ' : Email'));
  }
  try {
    transaction = await sequelize.transaction();
    const data = await repository.get(seqModels.accounts, {
      email: body.email
    }, true, null, null, null, transaction, null, null, null, false);
    if (data) {
      const obj = {
        id: data.id,
        name: data.firstName + ' ' + data.lastName || '',
        email: data.email,
      };
      const newPassword = helper.randomString(8);
      // console.log('newPassword', newPassword);
      await repository.update(seqModels.accounts, {
        id: data.id,
      }, {
        password: newPassword,
      }, transaction);
      // await transaction.commit();
      // const userName = (obj.role === 'driver')? obj.driverName : name;
      const message = {
        Recipients: body.email,
        Subject: 'OTP Password Request',
        message: templates.forgetPassword(obj.name, newPassword),
      };
      // await transaction.commit();
      await helper.sendEmail(message);
      return res.status(200).json(helper.success_message("OTP successfully sent to your email. Please login and login from OTP"));
    } else {
      // await transaction.commit();
      return res.status(200).json(helper.error_message('Account is not Registered.'));
    }
  } catch (e) {
    // await transaction.rollback();
    return res.status(200).json(helper.error_message(e));
  }
}

async function fnUpdatePassword(req, res) {
  if (req.body.email) {
    const body = req.body;
    const query = {
      email: body.email,
    };
    let message = {};
    let updateReason = body.reason ? body.reason : 'Update profile Password';
    try {
      transaction = await sequelize.transaction();
      const account = await repository.get(seqModels.accounts, query, true, null, null, null, transaction, null, null, null, false);
      if (!account) {
        await transaction.commit();
        return res.status(200).json(helper.error_message('Account Not Found'));
      }
      if (body.password) {
        const new_password = body.password;
        body.password = helper.generateHash(new_password);
        body.isVarified = true;
        updateReason = body.reason || 'Password Updating';
        const user = await repository.get(seqModels.accounts, query, true, null, null, null, transaction, null, null, null, false);
        if (!user.lastName) {
          user.lastName = '';
        }
        message = {
          Recipients: account.email, // req.session.email,
          Subject: 'Password Updated',
          message: templates.passwordUpdated(user.email),
        };
        helper.sendEmail(message);
      }
      const data = await repository.update(seqModels.accounts, query, body, transaction);
      await transaction.commit();
      return res.status(200).json(helper.success_message(data));
    } catch (e) {
      await transaction.rollback();
      return res.status(200).json(helper.error_message(e));
    }
  } else {
    return res.status(200).json(helper.error_message(helper.responseMessages.parameter_Missing));
  }
}


/**
 * ===================================================================================================================
 * function is used to check if request is AJAX request
 * ===================================================================================================================
 */
function checkIfAJAXRequest(req) {
  return (req.headers && ((req.headers['x-requested-with'] && req.headers['x-requested-with'] === 'XMLHttpRequest') ||
    (req.headers['content-type'].indexOf('application/json') !== -1)) ? true : false);
}

/**
 * ===================================================================================================================
 * function is used to validate model for creating user account.
 * ===================================================================================================================
 */

function validateUserModel(body, res) {
  if (!body.email) {
    return res.status(200).json(helper.error_message(helper.responseMessages.fields_missing + ' : User email'));
  }
  if (!body.password) {
    return res.status(200).json(helper.error_message(helper.responseMessages.fields_missing + ' : User password'));
  }
  if (!body.firstName) {
    return res.status(200).json(helper.error_message(helper.responseMessages.fields_missing + ' : User firstName'));
  }
  if (!body.lastName) {
    return res.status(200).json(helper.error_message(helper.responseMessages.fields_missing + ' : User lastName'));
  }
  if (!body.contact) {
    return res.status(200).json(helper.error_message(helper.responseMessages.fields_missing + ' : User contact'));
  }
  if (!body.address) {
    return res.status(200).json(helper.error_message(helper.responseMessages.fields_missing + ' : User Address'));
  }
  return true;
}

async function fnGetUserWithCharityList(req, res) {

  let query = {};
  let isSingle = false;
  if (req.query) {
    query = req.query;
  }
  if (req.params && req.params.id) {
    query = {
      userId: req.params.id,
    };
    isSingle = false;
  }
  try {
    transaction = await sequelize.transaction();
    seqModels.accounts.hasOne(seqModels.scheduling, {
      foreignKey: 'userId'
    })
    const data = await repository.get(seqModels.accounts, query, isSingle, {
      exclude: ['password', 'deletedBy', 'deleteDone', 'isDeleted', 'updateDate', 'token', 'role', 'accountType', 'isVarified']
    }, null, [{
      model: seqModels.scheduling,
      attributes: {
        exclude: ['deletedBy', 'deleteDone', 'isDeleted', 'updatedDate']
      }
    }], transaction, null, null, null, false);
    await transaction.commit();
    return res.status(200).json(helper.success_message(data));
  } catch (e) {
    await transaction.rollback();
    return res.status(200).json(helper.error_message(e));
  }
}



async function fnAdminLogin(req, res) {
  const body = req.body;
  if (!body.email && !body.password) {
    return res.status(200).json(helper.error_message(helper.responseMessages.unauthorized_request));
  }

  console.log('body', body);
  const query = {
    email: body.email.toLowerCase(),
    role: 'admin'
  };
  try {
    transaction = await sequelize.transaction();
    const user = await repository.get(seqModels.accounts, query, true, null, null, null, transaction, null, null, null, false)
    if (!user) {
      console.log('userrrr', user);
      return res.status(200).json(helper.error_message(helper.responseMessages.incorrect_user));
    } else if (user) {
      // await transaction.commit();
      bcrypt.compare(body.password, user.password, (err, result) => {
        if (result) {
          const data = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName || '',
            role: user.role,
            email: user.email,
            image: user.image,
            city: user.city,
          };
          const temp = {};
          jwt.sign(data, config.secret, {
            expiresIn: '2400h',
          }, async (err, token) => {
            temp.name = user.firstName + ' ' + user.lastName;
            temp.role = user.role;
            temp.token = token;
            temp.email = user.email;
            await transaction.commit();
            return res.status(200).json(helper.success_message(temp));
          });
        } else {
          if (checkIfAJAXRequest(req)) {
            return res.status(200).json(helper.error_message(helper.responseMessages.incorrect_user_password));
          } else {
            return res.status(200).json(helper.error_message(helper.responseMessages.incorrect_user_password));
          }
        }
      });
    } else {
      throw 'Unexpected value for user';
    }

  } catch (e) {
    await transaction.rollback();
    return res.status(200).json(helper.error_message(e));
  }
}

async function fnGetAllUsers(req, res) {
  let body = req.body;
  console.log('body!!!!!!', body);
  let query = {
    role: {
      [Op.notIn]: ['admin','anonymous']
    }
  };
  let search = body.search || '';
  // if (!body.offset && !body.limit) {
  //   return res.status(200).json(helper.error_message('Required Fields Missing'));
  // }
  if (body.date && body.search) {
    if ((body.date.from === '' && body.date.to !== '')) {
      return res.status(200).json(helper.error_message('Date From Missing'));
    }

    let startDate = new Date(body.date.from);
    startDate.setHours('00');
    startDate.setMinutes('00')
    startDate.setSeconds('00')
    startDate.setMilliseconds('000');

    let endDate = (body.date.to) ? new Date(body.date.to) : new Date()
    endDate.setHours('23');
    endDate.setMinutes('59')
    endDate.setSeconds('59')
    endDate.setMilliseconds('999');
    query = {
      [Op.and]: [{
          [Op.or]: [{
              email: {
                [Op.like]: `%${search}%`
              }
            },
            {
              firstname: {
                [Op.like]: `%${search}%`
              }
            },
            {
              lastname: {
                [Op.like]: `%${search}%`
              }
            },
            {
              state: {
                [Op.like]: `%${search}%`
              }
            },
            {
              contact: {
                [Op.like]: `%${search}%`
              }
            },
          ]
        },
        {
          role: {
            [Op.notIn]: ['admin','anonymous']
          }
        },
        {
          createDate: {
            [Op.gte]: startDate,
            [Op.lte]: endDate
          }
        },
      ]
    }
  } else
  if (body.date) {
    if ((body.date.from === '' && body.date.to !== '')) {
      return res.status(200).json(helper.error_message('Date From Missing'));
    }

    let startDate = new Date(body.date.from);
    startDate.setHours('00');
    startDate.setMinutes('00')
    startDate.setSeconds('00')
    startDate.setMilliseconds('000');

    let endDate = (body.date.to) ? new Date(body.date.to) : new Date()
    endDate.setHours('23');
    endDate.setMinutes('59')
    endDate.setSeconds('59')
    endDate.setMilliseconds('999');
    query = {
      [Op.and]: [{
          role: {
            [Op.notIn]: ['admin','anonymous']
          }
        },
        {
          createDate: {
            [Op.gte]: startDate,
            [Op.lte]: endDate
          }
        },
      ]
    }
  } else
  if (body.search) {
    query = {
      [Op.and]: [{
          [Op.or]: [{
              email: {
                [Op.like]: `%${search}%`
              }
            },
            {
              firstname: {
                [Op.like]: `%${search}%`
              }
            },
            {
              lastname: {
                [Op.like]: `%${search}%`
              }
            },
            {
              state: {
                [Op.like]: `%${search}%`
              }
            },
            {
              contact: {
                [Op.like]: `%${search}%`
              }
            },
          ]
        },
        {
          role: {
            [Op.notIn]: ['admin','anonymous']
          }
        },
      ]
    }
  }

  try {
    transaction = await sequelize.transaction();
    const data = await repository.get(seqModels.accounts, query, false, ['id', 'firstname', 'lastname', 'address', 'address2', 'contact', 'city', 'state', 'zip', 'email', 'createDate'], null, null, transaction, null, body.offset, body.limit, false);
    const count = await repository.count(seqModels.accounts, query, transaction, false);
    let returnObj = {
      totalRecordCount: count,
      records: data
    }
    await transaction.commit()
    return res.status(200).json(helper.success_message(returnObj));
  } catch (e) {
    await transaction.rollback();
    return res.status(200).json(helper.error_message(e));
  }
}
async function fnSendSms(req, res) {
  try {
    const body = req.body;
    if (!body.users.length === 0) {
      return res.status(200).json(helper.error_message('Required Fields Missing'));
    }
    transaction = await sequelize.transaction();

    for (let index = 0; index < body.users.length; index++) {
      const data = body.users[index];
      helper.sendSms(data.to, data.message);
      await repository.update(seqModels.routesplan, {
        id: data.id
      }, {
        isMessaged: true
      }, transaction);

    }
    // body.users.map(async (data) => {
    //   helper.sendSms(data.to, data.message)
    // });
    await transaction.commit();
    return res.status(200).json(helper.success_message('Message Successfully Sended'));
  } catch (e) {
    await transaction.rollback();
    return res.status(200).json(helper.error_message(e));
  }
}

async function fnVerifyCode(req, res) {
  const body = req.body;
  if (!body.code) {
    return res.status(200).json(helper.error_message(helper.responseMessages.fields_missing + ' : Code'));
  }
  if (!body.email) {
    return res.status(200).json(helper.error_message(helper.responseMessages.fields_missing + ' : Email'));
  }
  try {
    transaction = await sequelize.transaction();
    const data = await repository.get(seqModels.accounts, {
      email: body.email
    }, true, null, null, null, transaction, null, null, null, false);
    if (data) {
      if (data.password === body.code) {
        await transaction.commit();
        return res.status(200).json(helper.success_message("OTP Matched"));
      } else {
        await transaction.commit();
        return res.status(200).json(helper.error_message("OTP Mismatched"));
      }
    } else {
      await transaction.commit();
      return res.status(200).json(helper.error_message('Account is not Registered.'));
    }
  } catch (e) {
    await transaction.rollback();
    return res.status(200).json(helper.error_message(e));
  }
}

async function fnResendCode(req, res) {
  const body = req.body;
  if (!body.email) {
    return res.status(200).json(helper.error_message(helper.responseMessages.fields_missing + ' : Email'));
  }
  try {
    transaction = await sequelize.transaction();
    const data = await repository.get(seqModels.accounts, {
      email: body.email
    }, true, null, null, null, transaction, null, null, null, false);
    if (data) {
      const obj = {
        id: data.id,
        name: data.firstName + ' ' + data.lastName || '',
        email: data.email,
      };
      const newPassword = helper.randomString(8);
      await repository.update(seqModels.accounts, {
        id: data.id,
      }, {
        password: newPassword,
      }, transaction);
      await transaction.commit();
      const message = {
        Recipients: body.email,
        Subject: 'OTP Password Request',
        message: templates.forgetPassword(obj.name, newPassword),
      };
      await helper.sendEmail(message);
      await transaction.commit();
      return res.status(200).json(helper.success_message("OTP successfully sent to your email."));
    } else {
      await transaction.commit();
      return res.status(200).json(helper.error_message('Account is not Registered.'));
    }
  } catch (e) {
    await transaction.rollback();
    return res.status(200).json(helper.error_message(e));
  }
}

async function fnAutoSendSms(req, res) {
  try {
    let startDate = new Date();
    startDate.setHours('00');
    startDate.setMinutes('00')
    startDate.setSeconds('00')
    startDate.setMilliseconds('000');

    let endDate = new Date()
    endDate.setHours('23');
    endDate.setMinutes('59')
    endDate.setSeconds('59')
    endDate.setMilliseconds('999');
    const query = {
      scheduledAtDt: {
        [Op.gte]: startDate,
        // [Op.lte]: endDate
      },
      isMessaged: false
    }
    seqModels.routesplan.belongsTo(seqModels.accounts, {
      foreignKey: 'userId'
    });
    // seqModels.routesplan.belongsTo(seqModels.scheduling, {
    //   foreignKey: 'scheduleId'
    // })
    const users = await repository.get(seqModels.routesplan, query, false, ['id', 'scheduledAtDt'], null, [{
      model: seqModels.accounts,
      attributes: ['contact']
    },
    // {
    //   model: seqModels.scheduling,
    //   attributes: ['id', 'charity', 'status', 'charityDate']
    // },
  ], null, null, null, null, false);
    if (users.length === 0) {
      // if (res.status) {
      //   return res.status(200).json(helper.success_message('No Data Available'));
      // } else {
        console.log('No Data Available');
      // }
    }
    for (let index = 0; index < users.length; index++) {
      const data = users[index];
      const account = data.account
      var scheduledAtDt = new Date(data.scheduledAtDt)
      if (account !== null) {
        const message = `Your pickup will be on ${dateFormat(scheduledAtDt, "dddd, mmm d, yyyy")}; between 8:00 AM to 6:30 PM. Please keep your donations outside for the driver. Thank you - ReUse`
        // console.log('tooooooo', account.contact);
        // console.log('message', message);
        helper.sendSms(account.contact, message);
        await repository.update(seqModels.routesplan, {
          id: data.id
        }, {
          isMessaged: true
        }, null);
      }
    }
    // await transaction.commit();
    // if (res.status) {
    //   return res.status(200).json(helper.success_message('Successfully messages sended'));
    // } else {
      console.log('Successfully messages sended');
    // }
  } catch (e) {
    // await transaction.rollback();
    // if (res.status) {
    //   return res.status(200).json(helper.error_message(e));
    // } else {
      console.log('Auto sms error', e);
    // }
  }
}
