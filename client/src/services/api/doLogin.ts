const doLogin = async (email: string, password: string) => {
    return fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        });
};

export default doLogin;
