export function isPhone(str) {
    const phone = /^((13[0-9])|(14[5,7,9])|(15[0-3,5-9])|(16[6])|(17[0,1,3,5-8])|(18[0-9])|(19[8-9]))\d{8}$/
    return phone.test(str)
}

export function isPass(str) {
    //const pass = /^(?!(?:[^a-zA-Z]|\D|[a-zA-Z0-9])$).{6,20}$/
    const pass = /^[A-Za-z0-9\@\&\*\$\^\*\_\-]{6,20}$/
    return pass.test(str)
}

export function isMail(str) {
    const mail = /^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/
    return mail.test(str)
}

export function strip(html) {
    return html === undefined
      ? ''
      : html.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, '')
  }