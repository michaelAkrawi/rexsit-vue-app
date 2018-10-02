
export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.Token) {
        return { 'Authorization': 'Bearer ' + user.Token , 'Content-Type': 'application/json' };
    } else {
        return {};
    }
}

export function getAuthUser() {
    return JSON.parse(localStorage.getItem('user'));
}

