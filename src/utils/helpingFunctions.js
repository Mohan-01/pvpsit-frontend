import axios from "./axios.js";

/* 

  ============== User Handling Functions ============== 

*/

export async function handleRegister(e) {
  try {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData.entries());
    const res = await axios.post('/users/signup', {...body}, {
    // const data = await axios.post('/users/signup', {...body}, {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': 'https://pvpsit.onrender.com'
          'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true,
    })
    return res.data;
  } catch (e) {console.log(e)}
}

export async function handleLogin (e) {
  try {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData.entries());
    // const data = (await axios.post('/users/login', {...body}, {
      const res = await axios.post('/users/login', {...body}, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': 'https://pvpsit.onrender.com'
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true,
      });
      
      return res.data;
    } catch (e) {console.log(e)}
}

export function handleLogout(setLoggedIn, setAuthorized) {
  try {
  axios.get('/users/logout', {
    // axios.get('/users/logout', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': 'https://pvpsit.onrender.com'
        'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true,
    }).then(data => {
      if(data.status !== 200) return ;
      setLoggedIn(false);
      setAuthorized(false);
      window.localStorage.removeItem('userId');
    }).catch(err => console.log(err));
    // window.location.reload();
  } catch (e) {console.log(e)}
}

export async function getUser(id) {
  try {
    const res = await axios.get(`/users/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Access-Control-Allow-Origin': 'https://pvpsit.onrender.com',
        'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true
    });
    return res.data;
  } catch (e) {console.log(e)};
}

/*

  ============== Notifications Handling Functions ==============

*/

export async function getNotifications(route) {
  try {
    const res = await axios.get(route, 
      {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'https://pvpsit.onrender.com',
      }
    }
    );
    return res.data;
  } catch(e) {console.log(e)};
}

export async function getSpecificNotification(route, id) {
  try {
    const res = await axios.get(`${route}/${id}`);
    return res.data;
  } catch(e) {console.log(e)};
}

function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })
}

export async function createNotify(e, heading) {
  // heading, setLoader, navigate
  try {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData.entries());
    
    const file = e.target.coverImg.files[0];
    if(file) body.coverImg = await convertImageToBase64(file);
    else delete body['coverImg'];

    const res = await axios.post(`/${heading.toLowerCase()}`, {...body}, {
      // const data = await axios.post(`/${props.heading.toLowerCase()}`, {...body, coverImg}, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': 'https://pvpsit.onrender.com'
        'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true
    })
    
    return res.data;
  } catch (e) {console.log(e)}
}

export async function handleEdit(e, id, heading) {
  // coverImg, navigate, heading
  try {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    [...formData.entries()]?.forEach(([key, value]) => {
      if(!value) formData.delete(key);
    });
    const body = Object.fromEntries(formData.entries());
    
    const file = e.target.coverImg.files[0];
    if(file) body.coverImg = await convertImageToBase64(file);
    else delete body['coverImg'];
    
    const res = await axios.patch(`${heading.toLowerCase()}/${id}`, {...body},{
      headers: {
        'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': 'https://pvpsit.onrender.com'
      'Access-Control-Allow-Origin': '*'
    },
    withCredentials: true,
  })
  return res.data;
  } catch (e) {console.log(e)}
}

export async function handleDelete(route, id, setItem) {
  try {
    const ok = window.confirm('Are you sure you want to delete this item?');
    if(!ok) return ;
    
    await axios.delete(`${route}/${id}`, {
      headers: {
        // 'Access-Control-Allow-Origin': 'https://pvpsit.onrender.com',
        'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true,
  })
  window.location.reload();
  return ;
  } catch (e) {console.log(e)}
}

export async function handleDeleteAll(e, navigate) {
  try {
    e.preventDefault();
    const ok = window.confirm(`Are you sure you want to delete all ${e.target.name.value}`)
    if(!ok) return navigate(-1);
    const url = `/${e.target.name.value}/delete-all`
    // const url = `/${e.target.name.value}/delete-all`
    // console.log(url);
    const res = await axios.delete(url, {
      headers: {
        // 'Access-Control-Allow-Origin': 'https://pvpsit.onrender.com',
        'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true
    })
    if(res.status === 204) navigate(-1);
    else console.log('error delete all');
  } catch (e) {console.log(e)}
}
