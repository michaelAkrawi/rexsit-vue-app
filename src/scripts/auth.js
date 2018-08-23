import axios from "axios";

export function login(user) {
    return new Promise((resolve, reject) => {
        axios.get({ url: 'url', data: user, method: 'POST' })
            .then(response => {

                const token = response.token;
                localStorage.setItem('user-token', token);
                resolve(response);
            })
            .catch(error => {
                localStorage.removeItem('user-token');
                reject(error);
            })
    })
}
