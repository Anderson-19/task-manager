const URL = process.env.URL_API;

export const fetchRegister = async (data) => {

    let request = await fetch(`${URL}/user/register`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
    return await request.json(); 
}

export const fetchLogin = async (data) => {
console.log(process.env)
    let request = await fetch(`${URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
    return await request.json();
}

export const getUser = async ( user_id, sessionToken ) =>{
    let request = await fetch(`${URL}/user/${user_id}`, {
        method: 'GET',
        headers: {
            'x-token': sessionToken,
            "Accept": "application/json"
        }
    })
    return await request.json();
}
