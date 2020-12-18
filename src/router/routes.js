// import NotFound from '../components/NotFound';
import add_new_car from '../views/add_new_car';
import CarDetails from '../views/CarDetails';
import profile from '../views/profile';
import Market from '../views/Market';
import cars from '../components/cars';
import wishlist from '../components/wishlist';

// import App from '../App';

export default [{
        path: '*',
        component: Market
    },
    {
        path: '/',
        component: profile,
    },
    {
        path: '/profile',
        component: profile,
        children: [{
                name: 'my_cars',
                path: 'my_cars',
                props: true,
                component: cars
            },
            {
                name: 'wishlist',
                path: 'wishlist',
                component: wishlist
            },
        ],
    },
    {
        path: '/add_new_car',
        component: add_new_car,
    },
    {
        path: '/car_detail',
        component: CarDetails,
    },
    {
        path: '/market',
        component: Market,
    },
]