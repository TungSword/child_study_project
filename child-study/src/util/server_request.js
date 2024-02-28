import servcie from './request.js'

function serverConnect(param) {
    return servcie.post({
        url: "/server/connect", data: param
    })
}

export {
    serverConnect
}