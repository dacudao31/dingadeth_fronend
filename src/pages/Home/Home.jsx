import { useEffect, useState, useRef } from 'react'
import Button from '../../components/UI/Button'
import { AddCircleOutlineRounded } from '@mui/icons-material'
import { Chart, LineController, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import Link from '../../components/UI/Link';
import { useUser } from '../../context/userProvider';
import quickLinks from './SocialMediaQuickLinks.json';

Chart.register(LineController, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const Home = () => {
  const chartRef = useRef(null);
  const { user } = useUser();

  // console.log(user);
  

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Posts',
            data: [12, 19, 3, 5, 2, 3],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true, // Makes the chart responsive
        maintainAspectRatio: false, // Allows the chart to resize without maintaining the original aspect ratio
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  // const quickLinks = [
  //   {
  //     id: 1,
  //     img: "https://cdn.icon-icons.com/icons2/2429/PNG/512/facebook_logo_icon_147291.png",
  //     platform: "Facebook",
  //     link: "#"
  //   },
  //   {
  //     id: 2,
  //     img: "https://cdn.icon-icons.com/icons2/1753/PNG/512/iconfinder-social-media-applications-3instagram-4102579_113804.png",
  //     platform: "Instagram",
  //     link: "#"
  //   },
  //   {
  //     id: 3,
  //     img: "https://cdn.icon-icons.com/icons2/2037/PNG/512/media_social_tiktok_icon_124256.png",
  //     platform: "TikTok",
  //     link: "#"
  //   },
  // ]

  return (
    <main className='flex flex-col desktop:gap-16 phone:gap-5'>
      <section>
        <h3 className='text-md-lg font-bold'>
          Post
        </h3>
        <Link to={'addPost'}>
          <Button variant='secondary'>
            <div>
              <AddCircleOutlineRounded />
              <h3 className='font-normal'>Add / Schedule a post</h3>
            </div>
          </Button>
        </Link>
      </section>

      <section>
        <h3 className='text-md-lg font-bold'>
          Quick Links
        </h3>
        <div className='flex gap-2'>
          {quickLinks.map((link) => (
            <a key={link.id} href={link.link} className="block w-full h-14 no-underline">
              <div className='w-full h-full bg-grey flex justify-center items-center gap-2 cursor-pointer rounded-lg hover:bg-gray-300 transition ease-in-out focus:ring focus:outline-none focus:ring-secondary' tabIndex={0}>
                <img className='h-1/2' src={link.img} />
                <p className='phone:text-xs desktop:text-sm'>{link.platform}</p>
              </div>
            </a>          
          ))}
        </div>
      </section>

      <section className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <h3 className='text-md-lg font-bold'>
              Post Status
            </h3>
          </div>
          <div className='phone:hidden desktop:inline'>
            <Link>
              <span className='text-primary'>Save as PDF</span>
            </Link>
          </div>
        </div>
        <div className="w-full h-64 phone:h-80 desktop:h-80">
          <canvas ref={chartRef}></canvas>
        </div>
        <div className='phone:inline  mt-5 desktop:hidden'>
            <Button>Save as PDF</Button>  
        </div>
      </section>
    </main>
  )
}

export default Home
