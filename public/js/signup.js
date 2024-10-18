import axios from 'axios';

export async function signup(name, email, password, passwordConfirm) {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://95.104.13.159:8080/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'Success')
      return window.setTimeout(() => {
        location.reload();
        location.assign('/');
      });
  } catch (err) {
    console.error(err);
  }
}
