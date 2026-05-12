export const verify_emailmsg = (link) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Verify Your Account</title>
</head>

<body style="margin:0;font-family:sans-serif;background:#0f172a;color:white;display:flex;justify-content:center;align-items:center;height:100vh;">

  <div style="background:#1e293b;padding:40px;border-radius:10px;text-align:center;width:320px;">
    
    <h2 style="margin-bottom:10px;">Account Verification</h2>
    
    <p style="font-size:14px;color:#cbd5f5;margin-bottom:25px;">
      Click the button below to verify your account and activate your profile.
    </p>

    <a href=${link}
       style="display:inline-block;padding:12px 20px;background:#22c55e;color:white;text-decoration:none;border-radius:5px;font-weight:bold;">
       Verify Account
    </a>

    <p style="font-size:12px;color:#94a3b8;margin-top:20px;">
      If you did not request this, you can safely ignore this message.
    </p>

  </div>

</body>
</html>`;
};

export const emailVerifiedmsg = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Verified</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

  <table align="center" width="500" style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
    <tr>
      <td align="center">
        <h2 style="color: #4CAF50;">✅ Email Verified</h2>
        <p style="font-size: 16px; color: #333;">
          Your email has been successfully verified.
        </p>
        <p style="font-size: 14px; color: #777;">
          You can now continue using our services without any issues.
        </p>

        <a href="https://moodifymusics.netlify.app/" 
           style="display: inline-block; margin-top: 20px; padding: 10px 20px; 
                  background-color: #4CAF50; color: white; text-decoration: none; 
                  border-radius: 5px;">
          Continue
        </a>

        <p style="font-size: 12px; color: #aaa; margin-top: 20px;">
          If you did not perform this action, please contact support.
        </p>
      </td>
    </tr>
  </table>

</body>
</html>`;
