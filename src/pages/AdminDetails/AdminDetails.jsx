import { useEffect, useRef, useState } from 'react';
import Back from '../../components/UI/Back';
import Button from '../../components/UI/Button';
import TextField from '../../components/UI/TextField'
import { useLocation } from 'react-router-dom';
import { Chart, LineController, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import useHttp from '../../hooks/http-hook';
import Modal from '../../components/UI/Modal'
import moment from 'moment';
import useCustomSnackbar from '../../hooks/useCustomSnackbar';

Chart.register(LineController, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const AdminDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminPosts, setAdminPosts] = useState([]);
  const [platformNames, setPlatformNames] = useState([]);
  const { SnackbarComponent, showSnackbar } = useCustomSnackbar();

  const location = useLocation();
  const { admin } = location.state;
  const platforms = admin.platforms;
  const chartRef = useRef(null);
  const { sendRequest } = useHttp();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const removeAdminHandler = () => {
    alert(`Removed ${admin.name}`)
  }

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await sendRequest({
          url: `/api/post/${admin.id}`
        });
        
        if (res.success) {
          const postsWithPlatformNames = res.posts.map((post) => {
            let platformNames = post.platforms;
            const names = platformNames.split(',').map(platform => {
              switch (platform.trim()) {
                case '1':
                  return 'Facebook';
                case '2':
                  return 'Instagram';
                case '3':
                  return 'TikTok';
                default:
                  return platform; // In case there's an unexpected value
              }
            });

            // Join the names array into a comma-separated string
            const platformString = names.join(', ');

            // Return the post with the updated platform names as a string
            return { ...post, platforms: platformString };
          });

          setAdminPosts(postsWithPlatformNames);
        } else {
          showSnackbar("Posts cannot be loaded", "error");
        }
      } catch (error) {
        console.error('Failed to fetch admin posts', error);
      }
    };

    loadPosts();
  }, [admin, sendRequest]);
  
  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'], // Monthly labels
        datasets: [
          {
            label: `${admin.name}'s Uploads`, // Admin's name in the label
            data: [10, 20, 15, 30, 25, 20], // Example data for the admin's uploads
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Month',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Uploads',
            },
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: ${context.parsed.y}`;
              },
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [admin.name]);

  return (
    <div>
      <Back to={'/profile/admins'} />
      <SnackbarComponent />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className='flex flex-col gap-5'>
          <h1 className='font-bold text-lg'>Are you sure?</h1>
          <p>Are you sure you want to remove {admin.name} as your admin?
          If so, please type '<span>{admin.name}</span>' confirm deletion.</p>
          <TextField />
          {admin.type !== 0 ? (
            <Button onClick={removeAdminHandler} variant='red'>Confirm Removal</Button>
          ) : null}
          
        </div>
      </Modal>
      <section className='mt-5'>
        <h1 className='font-bold text-lg'>{admin.name}</h1>
        <div className='flex w-full items-center gap-4'>
          <div>
            <p className='font-bold'>Last Accessed</p>
            <p>{admin.lastaccessed ? moment(admin.lastaccessed).format('MMM DD, YYYY | hh:mm A') : 'N/A'}</p>
          </div>
          <div className='flex-1'>
            <p className='font-bold'>Account Created</p>
            <p>{admin.dateadded ? moment(admin.dateadded).format('MMM DD, YYYY | hh:mm A') : 'N/A'}</p>
          </div>
          {admin.type !== 0 ? (
          <div className='phone:hidden desktop:inline'>
            <Button onClick={openModal} variant='red-outline'>Remove Admin</Button>
          </div>
          ) : null }
        </div>
      </section>

      <section className='mt-8'>
        <h2 className='font-bold text-md-lg'>Uploads Overview</h2>
        <div className="w-full h-64 phone:h-80 desktop:h-80">
          <canvas ref={chartRef}></canvas>
        </div>
      </section>

      {adminPosts.length > 0 ? (
        <section className='flex flex-col gap-5'>
        {adminPosts.map((post) => (
          <div key={post.id} className='flex items-center justify-between'>
             <div>
               <p className='font-bold'>{post.caption}...</p>
               <p>
                 {post.dateadded ? moment(post.dateadded).format('MMM DD, YYYY | hh:mm A') : 'N/A'}
               </p>
             </div>
             <div className='phone:w-1/4 '>
               {post.platforms}
             </div>
           </div>
        ))}
       </section>
      ) : (
        <h3 className='mt-4 text-center font-bold text-md-lg'>No Posts Yet</h3>
      )}


      <section className='mt-5'>
        <div className='phone:inline desktop:hidden'>
          <Button onClick={openModal} variant='red-outline'>Remove Admin</Button>
        </div>
      </section>
      
    </div>
  )
}

export default AdminDetails;
