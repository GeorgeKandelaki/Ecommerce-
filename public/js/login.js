import axios from 'axios';

export async function login(email, password) {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://95.104.13.159:8080/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'Success')
      return window.setTimeout(() => {
        location.reload();
        location.assign('/');
      }, 1500);
  } catch (err) {
    console.error(err);
  }
}

export function logout() {}
