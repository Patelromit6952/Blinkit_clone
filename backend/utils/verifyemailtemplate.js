const verificationemailtemplate = ({name,url}) => {
    return  `
    <p>Dear ${name}</p>
    <p>Thank You For registering Blinkyit</p>
    <a href=${url} style="color:blue;">
    verify email
    </a>
    `
}

export default verificationemailtemplate;