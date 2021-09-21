/* eslint-disable linebreak-style */
const config = require('../config/config');
/**
 * ===================================================================================================================
 * General method export templates for emails.
 * ===================================================================================================================
 **/
module.exports = {
    scheduleConfirm: (cahrityType) => {
        return `<!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>Reuse</title>
        </head>
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap" />
        <body style="margin: 0px;">
          <div style="background-color: white;
          max-width: 550px !important;
          display: block;
          margin: auto !important;
          font-family: 'Poppins', sans-serif;">
            <div
              style="padding: 0px 30px; max-width: 96vw; font-size: 12px; border: 3rem solid #263e86; border-bottom: 0;">
              <div style="padding: 20px 0px;">
              <div style="text-align: center;">  
              <img alt="Reuse" src="${config.LOGO}">
                <h1 style="color: #263e86; font-weight:800; margin-top: 20px; margin-bottom: -10px; font-size: 1.65em;"> Pickup Request Initiated </h1>
                <p style="color: #263e86; font-weight:500; font-size: 16px; padding: 0 30px;"> Thank you for participating in the <span style="color: #a6ce39; font-weight:600;">${cahrityType}</span> clothing drive. </p>
                </div>
                <div
                  style="text-align: left !important; font-weight: 600; font-size: 15px; color: rgb(93 93 93 / .90); margin: 2rem 0; border: 2px solid #f2f2f2; padding: 15px 30px; box-shadow: inset 0 0 4px #f2f2f2;">
                  <div style="margin-bottom: 10px;"><p style="font-weight: 500;">You will be receiving a text message within 10 business days with a pickup date and time.</p></div>
                  <div style="margin-bottom: 10px;"><p style="font-weight: 500;">Instructions for donation: Please put your clothing bags outside on your front porch or garage driveway such that it is easy for us to pick up while maintaining social distancing. Items you can donate include:</p></div>
                  <div style="margin-bottom: 10px; font-weight: 500;"><ul style="padding-left: 15px;">
                    <li>Clothing - Men, Women and Children</span></li>
                    <li>Home Textiles - Bedsheet, Comforters, Towels, Curtains, and all other home textiles</span></li>
                    <li>Accessories - Purses and Shoes</span></li>
                  </ul></div>
                  <div style="margin-bottom: 0px;"><p style="font-weight: 500;">For any questions or concerns, you may contact us at: <br><a style="word-break: break-all;"
                      href="mailto:info@reusetrs.com">info@reusetrs.com</a></p></div>
                </div>
                <table style="width: 100%">
                  <tr>
                    <td style="margin-right: 15px; text-align: right;">
                      <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/REUSE-Textile-Recycling-Services-101385458209494">
                        <img alt="Facebook" src="${config.FACEBOOKLOGO}" width="35"/>
                      </a>
                    </td>
                    <td style="margin-right: 15px; text-align: left;">
                      <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/reusetrs/">
                        <img alt="Instagram" src="${config.INSTAGRAMLOGO}" width="35"/>
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div style=" background: #a6ce39;
                color: white;
                text-align: center;
                padding: 15px;">
              <div style="font-size: 16px; font-weight: 500;">
                <div>
                  <a href="www.reusetrs.com" target="_blank" rel="noopener noreferrer" style="color: white;">
                  www.reusetrs.com
                </a>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>`;
    },
    emailVerification: (userName, varificationLink) => {
        const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ReUse</title>
</head>
<body style="font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">
    <section style="margin:0 auto;width:100%;max-width:600px;display:block">
        <div style="margin:0 auto;padding:30px 0 40px;display:block;box-sizing:border-box">
            <img src="${config.logo}" style="width:100px;height:100px;margin:0 0 15px 0;padding-right:30px;padding-left:30px">
            <h1 style="font-size:30px;padding-right:30px;padding-left:30px">
                Welcome to ReUse! </h1>
            <p style="font-size:17px;padding-right:30px;padding-left:30px">
                Dear ${userName}, Your account has been recently created on <strong>ReUse</strong>. Please Click <a
                    href="${varificationLink}">here</a> to verify your Account.
                   <br/>
                   <br/>
                    If the above link does not work please copy below Url and paste it on your address bar.
                    ${varificationLink}
            </p>
        </div>
    </section>
</body>
</html>`;
        return template;
    },
    changePasswordEmailForResponsiblePerson: (userName, merchantName, varificationLink) => {
        const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ReUse</title>
</head>
<body style="font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">
    <section style="margin:0 auto;width:100%;max-width:600px;display:block">
        <div style="margin:0 auto;padding:30px 0 40px;display:block;box-sizing:border-box">
            <img src="${config.logo}" style="width:100px;height:100px;margin:0 0 15px 0;padding-right:30px;padding-left:30px">
            <h1 style="font-size:30px;padding-right:30px;padding-left:30px">
                Welcome to ReUse! </h1>
            <p style="font-size:17px;padding-right:30px;padding-left:30px">
                Dear ${userName}, Your Merchant <strong>${merchantName}</strong> has been recently registered on <strong>ReUse</strong>. Please Click <a
                    href="${varificationLink}">here</a> to verify your Account.
                <br/>
                <br/>
                If the above link does not work please copy below Url and paste it on your address bar.
                ${varificationLink}
            </p>
        </div>
    </section>
</body>
</html>`;
        return template;
    },
    changePasswordEmailForResponsiblePersonFP: (userName, fpName, varificationLink) => {
        const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ReUse</title>
</head>
<body style="font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">
    <section style="margin:0 auto;width:100%;max-width:600px;display:block">
        <div style="margin:0 auto;padding:30px 0 40px;display:block;box-sizing:border-box">
            <img src="${config.logo}" style="width:100px;height:100px;margin:0 0 15px 0;padding-right:30px;padding-left:30px">
            <h1 style="font-size:30px;padding-right:30px;padding-left:30px">
                Welcome to ReUse! </h1>
            <p style="font-size:17px;padding-right:30px;padding-left:30px">
                Dear ${userName}, Your Fleet Provider <strong>${fpName}</strong> has been recently registered on <strong>ReUse</strong>. Please Click <a
                    href="${varificationLink}">here</a> to verify your Account.
                <br/>
                <br/>
                If the above link does not work please copy below Url and paste it on your address bar.
                ${varificationLink}
            </p>
        </div>
    </section>
</body>
</html>`;
        return template;
    },
    changePassword: (userName, varificationLink) => {
        const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ReUse</title>
</head>
<body style="font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">
    <section style="margin:0 auto;width:100%;max-width:600px;display:block">
        <div style="margin:0 auto;padding:30px 0 40px;display:block;box-sizing:border-box">
            <img src="${config.logo}" style="width:100px;height:100px;margin:0 0 15px 0;padding-right:30px;padding-left:30px">
            <h1 style="font-size:30px;padding-right:30px;padding-left:30px">
                Welcome to ReUse! </h1>
            <p style="font-size:17px;padding-right:30px;padding-left:30px">
                Dear ${userName}, Please Click <a href="${varificationLink}">here</a> to verify your Account.
                <br/>
                <br/>
                If the above link does not work please copy below Url and paste it on your address bar.
                ${varificationLink}
            </p>
        </div>
    </section>
</body>
</html>`;
        return template;
    },
    forgetPassword: (userName, code) => {
        return `<!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>Reuse</title>
        </head>
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap" />
        <body style="margin: 0px;">
          <div style="background-color: white;
          max-width: 550px !important;
          display: block;
          margin: auto !important;
          font-family: 'Poppins', sans-serif;">
            <div
              style="padding: 0px 30px; max-width: 96vw; font-size: 12px; border: 3rem solid #263e86; border-bottom: 0;">
              <div style="padding: 20px 0px;">
              <div style="text-align: center;">
                <img alt="Reuse" src="${config.LOGO}">
                <h1 style="color: #263e86; font-weight:800; margin-top: 20px; margin-bottom: -10px; font-size: 1.65em;"> Password Reset Code </h1>
                </div>
                <div
                  style="text-align: left !important; font-weight: 600; font-size: 15px; color: rgb(93 93 93 / .90); margin: 2rem 0; border: 2px solid #f2f2f2; padding: 15px 30px; box-shadow: inset 0 0 4px #f2f2f2;">
                  <div style="margin-bottom: 10px;"><p style="font-weight: 600;">Hello ${userName},</p></div>
                  <div style="margin-bottom: 10px;"><p style="font-weight: 500;">We got a request to reset your account password. To reset the password enter the code below on the password reset page.</p></div>
                  <div style="margin-bottom: 10px; color: #263e86;"><p style="font-weight: 500;"></p>Reset Code: ${code}</div>
                  <div style="margin-bottom: 10px;"><p style="font-weight: 500;">If you did not request this password change, please ignore the email - your password will remain unaffected</p></div>
                </div>
                <table style="width: 100%;">
            <tr>
              <td style="margin-right: 15px; text-align: right;">
                <a target="_blank" rel="noopener noreferrer"
                  href="https://www.facebook.com/REUSE-Textile-Recycling-Services-101385458209494">
                  <img alt="Facebook" src="${config.FACEBOOKLOGO}" width="35" />
                </a>
              </td>
              <td style="margin-right: 15px; text-align: left;">
                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/reusetrs/">
                  <img alt="Instagram" src="${config.INSTAGRAMLOGO}" width="35" />
                </a>
              </td>
            </tr>
          </table>
              </div>
            </div>
            <div style=" background: #a6ce39;
                color: white;
                text-align: center;
                padding: 15px;">
              <div style="font-size: 16px; font-weight: 500;">
                <div>
                  <a href="www.reusetrs.com" target="_blank" rel="noopener noreferrer" style="color: white;">
                  www.reusetrs.com
                </a>
                </div>
              </div>
            </div>
          </div>
        
        </body>

        </html>`;
    },
    taskSubmitted: (admin, task) => {
        let targetDate = new Date(task.targetDate);
        targetDate = targetDate.getMonth() + 1 + '-' + targetDate.getDate() + '-' + targetDate.getFullYear();

        const template = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>ReUse</title>
        </head>
        
        <body style="font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">
            <section style="margin:0 auto;width:100%;max-width:600px;display:block">
                <div style="margin:0 auto;padding:30px 0 40px;display:block;box-sizing:border-box">
                    <img src="${config.logo}" style="width:100px;height:100px;margin:0 0 15px 0;padding-right:30px;padding-left:30px">
                    <h1 style="font-size:30px;padding-right:30px;padding-left:30px">
                        Hey!  ${admin.firstName} </h1>
                    <p style="font-size:17px;padding-right:30px;padding-left:30px">
                    A new task from ReUse Account Manager/Sales Person needs your approval. Task details are as follows:
                    </p>
                    <div style="padding: 0 30px; text-align: center;">
                        <div style="border:1px solid #a0a0a2;border-radius:8px;padding:40px 0;margin-top:20px;width:100%;"
                            style="vertical-align:middle ; text-align: center;">
                            <h4 style="margin-bottom:2px;font-size:17px;font-weight:400">
                            Task Requested By:  ${task.user.name}  
                            </h4>
                            <h4 style="margin-bottom:0;font-size:17px;font-weight:400">
                            For Merchant:  ${task.merchant.name} 
                            </h4>
                            <h4 style="margin-bottom:0;font-size:17px;font-weight:400">
                            Proposed Target Date: ${targetDate} 
                            </h4>
                        </div>
                    </div>
                </div>
            </section>
        </body>
        </html>`;
        return template;
    },
    passwordUpdated: (userId) => {
        return `<!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>Reuse</title>
        </head>
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap" />
        <body style="margin: 0px;">
          <div style="background-color: white;
          max-width: 550px !important;
          display: block;
          margin: auto !important;
          font-family: 'Poppins', sans-serif;">
            <div
              style="padding: 0px 30px; max-width: 96vw; font-size: 12px; border: 3rem solid #263e86; border-bottom: 0;">
              <div style="padding: 20px 0px;">
              <div style="text-align: center;">
                <img alt="Reuse" src="${config.LOGO}">
                <h1 style="color: #263e86; font-weight:800; margin-top: 20px; margin-bottom: -10px; font-size: 1.65em;"> Password Change Request Successful </h1>
                </div>
                <div
                  style="text-align: left !important; font-weight: 600; font-size: 15px; color: rgb(93 93 93 / .90); margin: 2rem 0; border: 2px solid #f2f2f2; padding: 15px 30px; box-shadow: inset 0 0 4px #f2f2f2;">
                  <div style="margin-bottom: 10px;"><p style="font-weight: 600;">Hello,</p></div>
                  <div style="margin-bottom: 10px;"><p style="font-weight: 500;">Your password change request for your User ID <strong>${userId}</strong> is successful. Now you can Log in anytime with your new password.</p></div>
                  <div style="margin-bottom: 10px;"><p style="font-weight: 500;">If you did not make this change or you believe an unauthorized person has accessed your account, go to our website to reset your password without delay.</p></div>
                  <div style="margin-bottom: 0px;"><p style="font-weight: 500;">For any questions or concerns, you may contact us at: <br><a style="word-break: break-all;"
                    href="mailto:info@reusetrs.com">info@reusetrs.com</a></p></div>
                </div>
                <table style="width: 100%;">
            <tr>
              <td style="margin-right: 15px; text-align: right;">
                <a target="_blank" rel="noopener noreferrer"
                  href="https://www.facebook.com/REUSE-Textile-Recycling-Services-101385458209494">
                  <img alt="Facebook" src="${config.FACEBOOKLOGO}" width="35" />
                </a>
              </td>
              <td style="margin-right: 15px; text-align: left;">
                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/reusetrs/">
                  <img alt="Instagram" src="${config.INSTAGRAMLOGO}" width="35" />
                </a>
              </td>
            </tr>
          </table>
              </div>
            </div>
            <div style=" background: #a6ce39;
                color: white;
                text-align: center;
                padding: 15px;">
              <div style="font-size: 16px; font-weight: 500;">
                <div>
                  <a href="www.reusetrs.com" target="_blank" rel="noopener noreferrer" style="color: white;">
                  www.reusetrs.com
                </a>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>`;
    },
    karryProfileSubmitted: (fpadmin, karry) => {
        const template = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>ReUse</title>
        </head>   
        <body style="font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">
            <section style="margin:0 auto;width:100%;max-width:600px;display:block">
                <div style="margin:0 auto;padding:30px 0 40px;display:block;box-sizing:border-box">
                    <img src="${config.logo}" style="width:100px;height:100px;margin:0 0 15px 0;padding-right:30px;padding-left:30px">
                    <h1 style="font-size:30px;padding-right:30px;padding-left:30px">
                        Hey!  ${fpadmin.firstName} </h1>
                    <p style="font-size:17px;padding-right:30px;padding-left:30px">
                    A new Karry Profile Update needs your approval. Details are as follows:
                    </p>
                    <div style="padding: 0 30px; text-align: center;">
                        <div style="border:1px solid #a0a0a2;border-radius:8px;padding:40px 0;margin-top:20px;width:100%;"
                            style="vertical-align:middle ; text-align: center;">
                            <h4 style="margin-bottom:2px;font-size:17px;font-weight:400">
                            Karry :  ${karry.firstName}  
                        </div>
                    </div>
                </div>
            </section>
        </body>
        </html>`;
        return template;
    },
    karryProfileApproved: (karry) => {
        const template = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>ReUse</title>
        </head>
        <body style="font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">
            <section style="margin:0 auto;width:100%;max-width:600px;display:block">
                <div style="margin:0 auto;padding:30px 0 40px;display:block;box-sizing:border-box">
                    <img src="${config.logo}" style="width:100px;height:100px;margin:0 0 15px 0;padding-right:30px;padding-left:30px">
                    <h1 style="font-size:30px;padding-right:30px;padding-left:30px">
                        Hey!  ${karry.firstName} </h1>
                    <p style="font-size:17px;padding-right:30px;padding-left:30px">
                    Your Profile has been approved by Administrator:
                       </p>
                </div>
            </section>
        </body>
        </html>`;
        return template;
    },

    sendPassword: (password) => {
        return `<!DOCTYPE html>
<html lang="en">

 

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Reuse</title>

 

</head>

 

<body style="margin: 0px;" >
    <style>
        .header {
            background: url('header-bg.svg');
            display: flex;
            justify-content: center;
            padding: 20px 0px;
        }

 

        .header img {
            max-width: 100%;
            height: auto;
        }

 

        .body{
            padding:56px 75px ;
            max-width: 96vw;
            text-align: center;
            font-size: 12px;
            background: whitesmoke;

 

        }

 

        .text-mute{
            font-weight: 100;
            font-size: 11px;
            color: #7D7D7D;
        }

 

        .instruction{
            display: flex; 
            flex-direction: column;
            margin-top: 50px;

 

        }

 

        .instruction div{
            margin-top: 5px;
        }

 

        .footer-info{
            font-size: 11px;
            margin-top: 15px;

 

        }
        footer{
            background:#263E86; 
            color:white;
            padding-bottom: 34px ;
            padding-left: 54px;
            padding-right: 54px;
            padding-top: 40px;
            text-align: center;
            font-weight: lighter;

 

        }
        

 

        * {
            font-family: Arial, Helvetica, sans-serif;
        }
    </style>
    <div style="max-width:600px!important; display: block; margin: auto!important">
        <div class="header">
            <img src="logo.svg">
        </div>
        <div class="body">
            <h1> Your password is ${password} </h1>
            <div style=" font-weight:500; line-height: 16px;">
                Thank you for participating in the clothing drive. The response has been overwhelming. All
                sign ups will shortly receive a text message with their pick up date and time.
            </div>
            <div class="text-mute">
                <br />
                <br/>
                <br/>
                <div style="color: black;">For any questions or concerns, you may contact us at: <a
                        href="https://reusetrs.com/contact/">https://reusetrs.com/contact/</a></div>
            </div>
        </div>

 

        <footer >
            <div style="display: flex; justify-content: center; ">

 

                <div >
                    <a href="https://reustrs.us4.list-manage.com/track/click?u=d5f9b0fef7092a677b76000d1&id=b713189fe7&e=f5f7b48845">
                        <img src="facebook.svg" />
                    </a>
                </div>
                <div style="margin: 0px 12px;">
                    <a href="https://reustrs.us4.list-manage.com/track/click?u=d5f9b0fef7092a677b76000d1&id=a1b504dc5b&e=f5f7b48845">
                        <img src="twitter.svg" />
                    </a>
                </div>
                <div >
                    <a href="https://reustrs.us4.list-manage.com/track/click?u=d5f9b0fef7092a677b76000d1&id=a1b504dc5b&e=f5f7b48845">
                        <img src="linkedin.svg" />
                    </a>
                </div>

 

            </div>
            <div class="footer-info">
                <div >
                    Copyright © 2020 ReUse Textile Recycling Services, All rights reserved
                </div>
                <div style="margin-top: 5px;" >
                        6830 Kirbyville Street, Houston, Texas, 77033 
                    </a>
                </div>
            </div>
    
        </footer>
    </div>
    
</body>

</html>`;

    },

    welocmeEmail: (userId, phone) => {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>Reuse</title>
        </head>
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap" />
        <body style="margin: 0px;">
          <div style="background-color: white;
          max-width: 550px !important;
          display: block;
          margin: auto !important;
          font-family: Poppins, sans-serif;">
            <div
              style="padding: 0px 30px; max-width: 96vw; font-size: 12px; border: 3rem solid #263e86; border-bottom: 0;">
              <div style="padding: 20px 0px;">
              <div style="text-align: center;">
                <img alt="Reuse" src="${config.LOGO}">
                <h1 style="color: #263e86; font-weight:800; margin-top: 20px; margin-bottom: -10px;"> Welcome To ReuseTRS </h1>
                <p style="color: #263e86; font-weight:600; font-size: 16px;  padding: 0 30px;"> Thank you for signing up with Reuse Textile Recycling services. </p>
                </div>
                <div
                  style="text-align: left !important; font-weight: 600; font-size: 15px; color: rgb(93 93 93 / .90); margin: 2rem 0; border: 2px solid #f2f2f2; padding: 15px 30px; box-shadow: inset 0 0 4px #f2f2f2;">
                  <div style="margin-bottom: 10px;"><p style="font-weight: 500;">We're excited to have you on board. Here are your account details:</p></div>
                  <div style="margin-bottom: 10px;">
                    <table aria-hidden="true" id="property" style="border-collapse: collapse; width: 100%;">
                      <tr>
                        <td style="text-align: left; padding: 2px; word-break: break-all;">User Id: <strong>${userId}</strong></td>
                      </tr>
                      <tr>
                        <td style="text-align: left; padding: 2px; word-break: break-all;">Tel: ${phone}</td>
                      </tr>
                    </table>
                  </div>
                  <div style="margin-bottom: 0px;"><p style="font-weight: 500;">Now you can log in to our web portal at any time, and schedule pickups with ease. For any questions or concerns, you may contact us at: <br><a style="word-break: break-all;"
                      href="mailto:info@reusetrs.com">info@reusetrs.com</a></p></div>
                </div>
                <div style="margin: 40px 0; text-align: center;">
            <a type="button" target="_blank" rel="noopener noreferrer" href="${config.FRONTEND}/#/account" style="color: white;
          background-color: #263e86;
          border: none;
          padding: 10px 15px;
          text-decoration: none;">Schedule Pickup</a>
          </div>
                <table style="width: 100%;">
            <tr>
              <td style="margin-right: 15px; text-align: right;">
                <a target="_blank" rel="noopener noreferrer"
                  href="https://www.facebook.com/REUSE-Textile-Recycling-Services-101385458209494">
                  <img alt="Facebook" src="${config.FACEBOOKLOGO}" width="35" />
                </a>
              </td>
              <td style="margin-right: 15px; text-align: left;">
                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/reusetrs/">
                  <img alt="Instagram" src="${config.INSTAGRAMLOGO}" width="35" />
                </a>
              </td>
            </tr>
          </table>
              </div>
            </div>
            <div style=" background: #a6ce39;
                color: white;
                text-align: center;
                padding: 15px;">
              <div style="font-size: 16px; font-weight: 500;">
                <div>
                  <a href="www.reusetrs.com" target="_blank" rel="noopener noreferrer" style="color: white;">
                  www.reusetrs.com
                </a>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>`;
    }
};
