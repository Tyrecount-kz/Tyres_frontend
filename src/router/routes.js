// import NotFound from '../components/NotFound';
import add_new_car from '../views/add_new_car';
import CarDetails from '../views/CarDetails';

// import App from '../App';

export default [{
        path: '*',
        component: add_new_car
    },
    {
        path: '/car_detail',
        component: CarDetails,
    },
    {
        path: '/lol',
        component: add_new_car,
    },
]