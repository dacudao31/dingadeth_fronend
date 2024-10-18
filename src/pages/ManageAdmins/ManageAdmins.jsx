import {useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Chart, LineController, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { AddCircleOutlineRounded } from '@mui/icons-material'
import { useHttp } from '../../hooks/http-hook';
import moment from 'moment';

import Button from '../../components/UI/Button'
import Back from '../../components/UI/Back'
import Link from '../../components/UI/Link';

Chart.register(LineController, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const ManageAdmins = () => {
  const chartRef = useRef(null);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const { sendRequest } = useHttp();

  const navigateAdmin = (admin) => {
    navigate('/profile/a', {state: { admin }})
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await sendRequest({
          url: '/api/u/all',
        });
  
        setUsers(res);
      } catch (error) {
        console.error('Failed to fetch admins:', error);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'], // Monthly labels
        datasets: [
          {
            label: 'Admin A',
            data: [10, 20, 15, 30, 25, 20], // Admin A's upload data
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
            tension: 0.4,
          },
          {
            label: 'Admin B',
            data: [5, 15, 10, 20, 15, 25], // Admin B's upload data
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: false,
            tension: 0.4,
          },
          {
            label: 'Admin C',
            data: [20, 25, 30, 15, 10, 5], // Admin C's upload data
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 2,
            fill: false,
            tension: 0.4,
          },
          {
            label: 'Admin D',
            data: [12, 18, 22, 24, 30, 28], // Admin D's upload data
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 2,
            fill: false,
            tension: 0.4,
          },
          {
            label: 'Admin E',
            data: [8, 12, 16, 20, 24, 30], // Admin E's upload data
            borderColor: 'rgba(255, 159, 64, 1)',
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
  }, []);

  return (
    <main>
      <Back to={'/profile/more'}/>
      <h1 className='font-bold desktop:text-xl phone:text-lg'>Manage Admins</h1>
      <section className='flex flex-col gap-3'>
        <p className='font-bold'>Posted per Admin</p>
        <div className="w-full h-64 phone:h-80 desktop:h-80">
          <canvas ref={chartRef}></canvas>
        </div>
      </section>
      <section className='flex flex-col gap-3'>
        <div className='flex phone:flex-col desktop:flex-row desktop:items-center desktop:justify-between'>
          <h3 className='font-bold'>Admins</h3>
          <Link to={'/profile/addAdmin'}>
            <Button variant='grey'>
              <div className='flex item-center gap-2'>
                <AddCircleOutlineRounded />
                <span>Create an Admin</span>
              </div>
            </Button>
          </Link>

        </div>
        
        <div className='flex items-center justify-end'>
          <span className='font-bold'>Last Accessed</span>
        </div>
        <div className='flex flex-col gap-5'>
          {users.map((item) => (
            <div key={item.id} onClick={() => navigateAdmin(item)} className='flex hover:bg-grey transition ease-ou p-1 rounded-md cursor-pointer items-center justify-between'>
              <p>{item.name}</p>
              <p>
                {item.lastaccessed ? moment(item.lastaccessed).format('MMM DD, YYYY | hh:mm A') : 'N/A'}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default ManageAdmins
