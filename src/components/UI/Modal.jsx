import { useEffect } from 'react';

const Modal = ({ children, isOpen, onClose }) => {

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    } else {
      document.removeEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='relative bg-white p-20 rounded-xl shadow-lg w-full max-w-xl'>
        <button
          onClick={() => onClose?.()}
          className='absolute text-[40px] top-[-15px] right-2 text-gray-500 hover:text-gray-700'
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
