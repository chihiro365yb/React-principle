import Home from '@/pages/Home';
import Notfound from '@/pages/Notfound';
import Tabs from '@/pages/Tabs';
import Speech from '@/pages/Speech';
import TictactoeGame from '@/pages/TictactoeGame';

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
    {
        name: 'speech',
        path: 'volume',
        element: <Speech />,
    },
    {
        name: 'tic-tac-toe',
        path: 'game',
        element: <TictactoeGame />,
    },
    {
        name: '404',
        path: '*',
        element: <Notfound />,
    },
];

export default routes;
