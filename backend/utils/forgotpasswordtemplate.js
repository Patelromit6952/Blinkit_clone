const forgotpasswordtemplate = ({name,otp}) => {
    return `
    <div>
        <p>Dear, ${name}</p>
        <p> You're requested a password reset.Please use following otp code to reset your password</p>
        <div style = "background:yellow;font-size:20px;width:100px;text-align:center;">
            ${otp}
        </div>
        <p>This otp is valid for 1 hour only.Enter this otp in the blinkyit website to procced with resetting your password.</p>
        <br/>
        <br/>
        <p>Thanks</p>
        <p>Blinkyit</p>
    </div>
    `
}
export default forgotpasswordtemplate;