import axios from "axios";

export async function handleRegister(e, props) {
  try {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData.entries());
    props.setLoader(true);
    // const data = await axios.post('http://localhost:4000/users/signup', {...body}, {
    const data = await axios.post('https://pvpsit-backend.onrender.com/users/signup', {...body}, {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://pvpsit.onrender.com'
      },
      withCredentials: true,
    })
    props.setLoader(false);
    if(data.status >= 200 && data.status < 300) {
      alert('signup success')
      props.navigate(-1);
    } else console.log(data.data);
    window.location.reload();
  } catch (e) {console.log(e)}
}

export async function handleLogin (e, props) {
  try {
    e.preventDefault();
    console.log('handleLogin')
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData.entries());
    props.setLoader(true);
    // const data = (await axios.post('http://localhost:4000/users/login', {...body}, {
      const data = (await axios.post('https://pvpsit-backend.onrender.com/users/login', {...body}, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://pvpsit.onrender.com'
        },
        withCredentials: true,
      })).data;
      props.setLoader(false);
      props.setUser(data.data)
      console.log(props.user);
      const {status} = data;
      if(props.user.role === 'admin' || props.user.role === 'staff') props.setAuthorized(true);
      if(status === 'success') {
        window.location.reload();
        props.navigate(-1);
        props.setLoggedIn(true);
      }
    } catch (e) {console.log(e)}
}

export function handleLogout(setLoggedIn, setAuthorized) {
  try {
  // axios.get('http://localhost:4000/users/logout', {
    axios.get('https://pvpsit-backend.onrender.com/users/logout', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://pvpsit.onrender.com'
      },
      withCredentials: true,
    }).then(data => {
      if(data.status !== 200) return ;
      setLoggedIn(false);
      setAuthorized(false);
    }).catch(err => console.log(err));
    // window.location.reload();
  } catch (e) {console.log(e)}
}

export async function createNotify(e, coverImg, props) {
  try {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData.entries());
    console.log({formData})
    console.log({body})
    props.setLoader(true);
    // const data = await axios.post(`http://localhost:4000/${props.heading.toLowerCase()}`, {...body, coverImg}, {
      const data = await axios.post(`https://pvpsit-backend.onrender.com/${props.heading.toLowerCase()}`, {...body, coverImg}, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://pvpsit.onrender.com'
      },
      withCredentials: true
    })
    props.setLoader(false);
    if(data.status === 201) {
      props.navigate(`/${props.heading.toLowerCase()}`);
    } else {
      console.log(data);
    }
  } catch (e) {console.log(e)}
}

export async function handleEdit(e, url, props) {
  try {
    e.preventDefault();
    console.log('edit');
    const formData = new FormData(e.target);
    [...formData.entries()]?.forEach(([key, value]) => {
      if(!value) formData.delete(key);
    });
    const body = Object.fromEntries(formData.entries());
    if(!body?.coverImg?.size) delete body['coverImg']
    else body.coverImg = props.coverImg;
    console.log('edit: ', body)
    const data = await axios.patch(url, {...body},{
      headers: {
        'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://pvpsit.onrender.com'
    },
    withCredentials: true,
  })
  if(data.status === 200) {
    props.navigate(`/${props.heading.toLowerCase()}`);
  } else {
    console.log(data.data);
  }
  window.location.reload();
  } catch (e) {console.log(e)}
}

export async function handleDelete(url, id, setItem) {
  try {
    const ok = window.confirm('Are you sure you want to delete this item?');
    if(!ok) return ;
    console.log({url, id});
    const data = await axios.delete(`${url}/${id}`, {
      headers: {
        'Access-Control-Allow-Origin': 'https://pvpsit.onrender.com',
      },
      withCredentials: true,
  })
  if  (data.status === 204) {
      setItem(null);
  } else {
    console.log(data);
  }
  window.location.reload();
  } catch (e) {console.log(e)}
}

export async function handleDeleteAll(e, navigate) {
  try {
    e.preventDefault();
    const ok = window.confirm(`Are you sure you want to delete all ${e.target.name.value}`)
    if(!ok) return navigate(-1);
    // const url = `http://localhost:4000/${e.target.name.value}/delete-all`
    const url = `https://pvpsit-backend.onrender.com/${e.target.name.value}/delete-all`
    console.log(url);
    const res = await axios.delete(url, {
      headers: {
        'Access-Control-Allow-Origin': 'https://pvpsit.onrender.com',
      },
      withCredentials: true
    })
    if(res.status === 204) navigate(-1);
    else console.log('error delete all');
  } catch (e) {console.log(e)}
}
