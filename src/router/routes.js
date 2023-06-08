import Home from '../pages/Home';
import Tabs from '../pages/Tabs';

const routes = [
    {
        path: '/',
        name: 'app',
        component: Home,
    },
    {
        name: 'tabs',
        path: '/tabs',
        component: Tabs,
    },
];

export default routes;
