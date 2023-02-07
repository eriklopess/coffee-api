type RegisterData = {
    name: string;
    email: string;
    password: string;
};

const doRegister = async (data: RegisterData) => {
    return fetch('/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
            ...data
        })
    })
        .then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        });
}

export default doRegister;
