import { useState } from 'react'
import { ContentCopy } from '@mui/icons-material'
import useCustomSnackbar from '../../hooks/useCustomSnackbar'

const Copyfield = ({title, text}) => {
    const { SnackbarComponent, showSnackbar } = useCustomSnackbar();

    const copyHandler = () => {
        // Copy the text to the clipboard
        navigator.clipboard.writeText(text)
            .then(() => {
                // Show a success message when the copy is successful
                showSnackbar(`You have copied your ${title}`, "success");
            })
            .catch((error) => {
                // Handle errors (if any) and show an error message
                showSnackbar(`Failed to copy ${title}`, "error");
                console.error("Copy failed:", error);
            });
    };

    return (
        <main className='w-full flex flex-col '>
            <SnackbarComponent /> 
            <h3 className='font-bold'>{title}</h3>
            <section className='flex items-center gap-2'>
                <input type="text" className='rounded-lg w-full p-2' placeholder={text} disabled />
                <div className='bg-secondary hover:bg-yellow-400 cursor-pointer transition ease-out p-2 rounded-lg' onClick={copyHandler} tabIndex={0}>
                    <ContentCopy />
                </div>
            </section>
        </main>
    )
}

export default Copyfield
