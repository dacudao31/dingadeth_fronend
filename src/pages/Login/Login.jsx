import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// import TopLogo from '../../components/UI/TopLogo'
import Button from '../../components/UI/Button';
import TextField from '../../components/UI/TextField';
import useHttp from '../../hooks/http-hook';
import useCustomSnackbar  from '../../hooks/useCustomSnackbar';
import { useUser } from '../../context/userProvider'; 


const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { isLoading, sendRequest } = useHttp();
  const { SnackbarComponent, showSnackbar } = useCustomSnackbar();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const loginHandler = async () => {
    const res = await sendRequest({
      url: '/api/u/login',
      method: 'POST',
      body: JSON.stringify({
        username: usernameRef.current.value,
        password: passwordRef.current.value
      })
    });

    if (!res.success) {
      showSnackbar('Incorrect Access Key or Password', 'error')
    } else {
        localStorage.setItem("access", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("key", usernameRef.current.value);
        setUser(res.user);
        navigate('/profile') 
    }        
  }

  return (
    <main className='max-w-lg mx-auto flex flex-col h-screen items-center w-full desktop:pt-32 gap-5'>
          <SnackbarComponent />
          <img className='w-40' src='/logo.png' />
          <div className='flex w-full px-5 flex-col gap-5'>
              <h1 className='text-xl font-bold'>Sign In</h1>
              <TextField ref={usernameRef} title="Username"/>
              <TextField ref={passwordRef} type="password" title="Password"/>
              <Button disabled={isLoading} onClick={loginHandler}>Login</Button>
          </div>  
      </main>
  )
}

export default Login
