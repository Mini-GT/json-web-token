const formDOM = document.querySelector('.form')
const usernameInputDOM = document.querySelector('.username-input')  as HTMLInputElement
const passwordInputDOM = document.querySelector('.password-input') as HTMLInputElement
const formAlertDOM = document.querySelector('.form-alert') as HTMLInputElement
const resultDOM = document.querySelector('.result')
const btnDOM = document.querySelector('#data')
const tokenDOM = document.querySelector('.token')

if(!formDOM || !formAlertDOM || !tokenDOM || !usernameInputDOM || !passwordInputDOM || !resultDOM || !btnDOM) {
    throw Error;
}

formDOM.addEventListener('submit', async (e) => {
  formAlertDOM.classList.remove('text-success')
  tokenDOM.classList.remove('text-success')

  e.preventDefault()
  const username = usernameInputDOM.value
  const password = passwordInputDOM.value

  try {
    const { data } = await axios.post('/api/v1/login', { username, password })

    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = data.msg

    formAlertDOM.classList.add('text-success')
    usernameInputDOM.value = ''
    passwordInputDOM.value = ''

    localStorage.setItem('token', data.token)
    resultDOM.innerHTML = ''
    tokenDOM.textContent = 'token present'
    tokenDOM.classList.add('text-success')
  } catch (error) {
    if(axios.isAxiosError(error)) {
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = error.response?.data?.msg|| 'An unknown error occurred.';
        localStorage.removeItem('token')
        resultDOM.innerHTML = ''
        tokenDOM.textContent = 'no token present'
        tokenDOM.classList.remove('text-success')
    } else {
        formAlertDOM.textContent = 'An unexpected error occurred.';
    }
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
  }, 2000)
})

btnDOM.addEventListener('click', async () => {
  const token = localStorage.getItem('token')
  try {
    const { data } = await axios.get('/api/v1/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    resultDOM.innerHTML = `<h5>${data.msg}</h5><p>${data.secret}</p>`

    data.secret
  } catch (error) {
    if (axios.isAxiosError(error)) {
        localStorage.removeItem('token')
        resultDOM.innerHTML = `<p>${error.response?.data?.msg}</p>`
      } else {
        resultDOM.innerHTML = 'An unexpected error occurred.';
      }
    
  }
})

const checkToken = () => {
  tokenDOM.classList.remove('text-success')

  const token = localStorage.getItem('token')
  if (token) {
    tokenDOM.textContent = 'token present'
    tokenDOM.classList.add('text-success')
  }
}
checkToken()