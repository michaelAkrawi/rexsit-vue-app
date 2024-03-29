
export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token , 'Content-Type': 'application/json' };
    } else {
        return {};
    }
}

export function getAuthUser() {
    return JSON.parse(localStorage.getItem('user'));
}

