import Home from '../pages/Home';
import Tabs from '../pages/Tabs';

const routes = [
    {
        path: '/',
        name: 'home',
        element: <Home />,
    },
    {
        name: 'tabs',
        path: '/tabs',
        element: <Tabs />,
    },
];

export default routes;
