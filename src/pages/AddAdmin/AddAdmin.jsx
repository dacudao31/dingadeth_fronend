import { useRef, useState } from 'react'
import Back from '../../components/UI/Back'
import TextField from '../../components/UI/TextField'
import Button from '../../components/UI/Button'
import Modal from '../../components/UI/Modal'
import useCustomSnackbar from '../../hooks/useCustomSnackbar'
import { generateAccessKey } from '../../hooks/keyGenerator';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom'
import useHttp from '../../hooks/http-hook'

const AddAdmin = () => {
  const [accessKey, setAccessKey] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [buttonText, setbuttonText] = useState('Click to Copy');
  const [confirmAdd, setConfirmAdd] = useState(false);
  const navigate = useNavigate();

  const [isOpenModal, setIsModalOpen] = useState(false);
  const { SnackbarComponent, showSnackbar } = useCustomSnackbar();
  const { sendRequest } = useHttp();
  const nameRef = useRef();
  const passwordRef = useRef();
  const cpasswordRef = useRef();
  

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/profile/admins');
  };

  const submitHandler = async () => {
    const name = nameRef.current.value;
    setName(name);
    const ak = generateAccessKey();
    setAccessKey(ak);

    if (passwordRef.current.value !== cpasswordRef.current.value) {
      showSnackbar("Password does not match", "error");
      return;
    }
    
    setPassword(passwordRef.current.value);
    
    if (name.length <= 0) {
      showSnackbar("Enter the admin's name", "warning")
    } else {
      const res = await sendRequest({
        url: '/api/u/mk',
        body: JSON.stringify({
          name: name,
          accessKey: ak,
          password: passwordRef.current.value
        }),
        method: 'POST'
      })

      if (res.success) {
        console.log(res);
        openModal();
      };
    }
  }

  const copyHandler = () => {
    // Copy the text to the clipboard
    const formattedContent = `Access Key: ${accessKey}, Password: ${password}`;
    navigator.clipboard.writeText(formattedContent)
        .then(() => {
            // Show a success message when the copy is successful
            showSnackbar(`You have copied your access key and password`, "success");
            setbuttonText("Copied!");
        })
        .catch((error) => {
            // Handle errors (if any) and show an error message
            showSnackbar(`Failed to copy access key and password`, "error");
            console.error("Copy failed:", error);
        });
};

  return (
    <main className='flex flex-col gap-3'>
      <SnackbarComponent />
      <Modal isOpen={isOpenModal} onClose={closeModal}>
        <section className='flex flex-col gap-3'>
          <div>
            <h1 className='font-bold text-lg'>Nice!</h1>
            <p>You have added '{name}' as admin.</p>
          </div>
          <TextField title="Access Key" disabled placeholder={accessKey}/>
          <TextField title="Password" disabled placeholder={password}/>
          <Button onClick={copyHandler} variant='secondary'>{buttonText}</Button>
        </section>
      </Modal>
      <Back to={'/profile/admins'}/>
      <h1 className='font-bold desktop:text-xl phone:text-lg'>Create an Admin</h1>
      <section className='flex flex-col gap-3'>
        <TextField title="Name" ref={nameRef} placeholder="Juan Dela Cruz"/>
        {/* <TextField onChange={(event) => accessKeyChange(event)} type="number" title="Access Key" placeholder="Enter up to 9-digits"/> */}
        <TextField type="password" ref={passwordRef} title="Password"/>
        <TextField type="password" ref={cpasswordRef} title="Confirm Password"/>
      </section>
      <section className='flex items-center gap-2'>
        <Checkbox onChange={() => setConfirmAdd(!confirmAdd)}/>
        <p>I confirm to add a new admin for Ding-Adeth's Social Media Manager</p>
      </section>
      <Button disabled={!confirmAdd} variant={confirmAdd ? 'default' : 'disabled'} onClick={submitHandler}>Generate Key</Button>
    </main>
  )
}

export default AddAdmin
