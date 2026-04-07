 export  const verify_emailmsg = (link)=>{
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
</html>`
}
