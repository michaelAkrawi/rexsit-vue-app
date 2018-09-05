
export function loadFbSdk(appId, version, callback) {

    window.fbAsyncInit = function () {
        FB.init({
            appId,
            xfbml: false,
            version,
            cookie: true
        });
        FB.AppEvents.logPageView();
        callback();
    };
    (function (d, s, id) {
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        const js = d.createElement(s); js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

export function getFBLoginStatus(callback) {
    FB.getLoginStatus(function (response) {
        callback(response);
    });
}

export function fbLogin(options) {
    return new Promise(resolve => {
        window.FB.login(response => resolve(response), options);
    });
}

export function getFBInfo(userID) {
    return new Promise(resolve => {
        window.FB.api(`/${userID}/`, 'GET', { fields: ['first_name', 'last_name', 'email'] }, response => {
            resolve(response);
        })
    })
}

export function getFBProfilePicture(userID) {
    return new Promise(resolve => {
        window.FB.api(`/${userID}/picture`, 'GET', { redirect: false }, response => resolve(response));

    });
}