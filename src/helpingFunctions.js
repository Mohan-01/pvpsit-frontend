import axios from "axios";

export async function handleRegister(e, props) {
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
}

export async function handleLogin (e, props) {
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
      props.setLoggedIn(true);
      props.navigate(-1);
    }
}

export function handleLogout(setLoggedIn, setAuthorized) {
    // axios.get('http://localhost:4000/users/logout', {
    axios.get('https://pvpsit-backend.onrender.com/users/logout', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://pvpsit.onrender.com'
        },
        withCredentials: true,
    }).then(data => {
        if(data.status !== 200) {
        return ;
      }
      setLoggedIn(false);
      setAuthorized(false);
      window.location.reload();
    }).catch(err => console.log(err));
}

export async function createNotify(e, coverImg, props) {
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
  }

  export async function handleEdit(e, url, props) {
    e.preventDefault();
    console.log('edit');
    const formData = new FormData(e.target);
    [...formData.entries()]?.forEach(([key, value]) => {
      if(!value) formData.delete(key);
    });
    const body = Object.fromEntries(formData.entries());
    if(!body?.coverImg?.size) delete body['coverImg']
    body.coverImg = props.coverImg;
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
        window.location.reload();
    } else {
        console.log(data.data);
    }
  }

export async function handleDeleteAll(e, navigate) {
    e.preventDefault();
    const ok = window.confirm(`Are you sure you want to delete all ${e.target.name.value}`)
    if(!ok) return navigate(-1);
    // const url = `http://localhost:4000/${e.target.name.value}/delete-all`
    const url = `https://pvpsit-backend.onrender.com/${e.target.name.value}/delete-all`
    const res = await axios.delete(url, {
      headers: {
        'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://pvpsit.onrender.com'
      },
      withCredentials: true
    })
    if(res.status === 204) navigate(-1);
    else console.log('error delete all');
}

export async function handleDelete(url, id, setItem) {
    const ok = window.confirm('Are you sure you want to delete this item?');
    if(!ok) return ;
    const data = await axios.delete(`${url}/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://pvpsit.onrender.com'
        },
        withCredentials: true,
    })
    if  (data.status === 204) {
        setItem(null);
    } else {
        console.log(data.data);
    }
}