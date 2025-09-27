
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the GT Library</h1>
            <p>This is the homepage.</p>
            <Link to="/map">
                <button>Go to Interactive Map</button>
            </Link>
        </div>
    );
};

export default HomePage;
