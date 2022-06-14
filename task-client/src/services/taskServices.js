const URL = process.env.URL_API;

export const createTask = async (data, token) => {
    
    let request = await fetch(`${URL}/task/create`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'x-token': token
      },
      body: JSON.stringify(data)
    })
    return await request.json();
}

export const getTasks = async (sessionToken) =>{
    let request = await fetch(`${URL}/task/`, {
        method: 'GET',
        headers: {
            'x-token': sessionToken,
            'Accept': 'application/json'
        }
    })
    return await request.json();
}

export const updateTask = async (data, token, task_id) => {
    
    let request = await fetch(`${URL}/task/${task_id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-token': token
        }
    })
    return await request.json();
}

export const deleteTask = async (task_id, sessionToken) => {
    
    let request = await fetch(`${URL}/task/${task_id}`, {
        method: 'DELETE',
        headers: {
          'x-token': sessionToken
        }
    })

    return await request.json();
}

/* export const date = (dd, mm, yy) =>{
    switch(mm){
      case '01':
        return `Enero ${dd}, ${yy}`;
        break;
      case '02':
        return `Febero ${dd}, ${yy}`;
        break;
      case '03':
        return `Marzo ${dd}, ${yy}`;
        break;
      case '04':
        return `Abril ${dd}, ${yy}`;
        break;
      case '05':
        return `Mayo ${dd}, ${yy}`;
        break;
      case '06':
        return `Junio ${dd}, ${yy}`;
        break;
      case '07':
        return `Julio ${dd}, ${yy}`;
        break;
      case '08':
        return `Agosto ${dd}, ${yy}`;
        break;
      case '09':
        return `Septiembre ${dd}, ${yy}`;
        break;
      case '10':
        return `Octubre ${dd}, ${yy}`;
        break;
      case '11':
        return `Noviembre ${dd}, ${yy}`;
        break;
      case '12':
        return `Diciembre ${dd}, ${yy}`;
        break;
    }
  } */

