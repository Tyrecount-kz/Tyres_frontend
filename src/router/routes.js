// import NotFound from '../components/NotFound';
import AddNewCar from '../views/AddNewCar';
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
        name: 'profile',
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
        name: 'add_new_car',
        component: AddNewCar,
    },
    {
        path: '/car_detail',
        name: 'car_detail',
        component: CarDetails,
    },
    {
        path: '/market',
        name: 'market',
        component: Market,
    },
]