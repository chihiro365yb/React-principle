import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './router/routes';

const router = createBrowserRouter(routes);

function App() {
    return <RouterProvider router={router} fallbackElement={<p>loading...</p>} />;
}

export default App;
