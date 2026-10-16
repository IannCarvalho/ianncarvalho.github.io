import React from 'react';
import ReactDOM from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import App from './App';
import DATA from './TEMPLATE.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* "user": honor the OS "reduce motion" setting — transform animations
            (the tab switch scale) are skipped, opacity fades remain. */}
        <MotionConfig reducedMotion="user">
            <App data={DATA} />
        </MotionConfig>
    </React.StrictMode>
);
