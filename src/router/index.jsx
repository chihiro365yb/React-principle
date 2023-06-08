import routes from './routes';
import { Router, Route } from 'react-router';

const MyRouter = () => {
    return (
        <Router>
            {routes.map(item => {
                return <Route key={item.name} path={item.path} Component={item.component} />;
            })}
        </Router>
    );
};

export default MyRouter;
