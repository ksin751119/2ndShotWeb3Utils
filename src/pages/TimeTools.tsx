import React from 'react';
// import { TimeConverters } from '@/components/TimeConverters';
// We will replace TimeConverters with the new specific components later
// import { TimeConverters } from '../components/TimeConverters'; // Use relative path
import TimestampToDateConverter from '../components/TimestampToDateConverter'; // Import new component
import BlockToTimeConverter from '../components/BlockToTimeConverter'; // Import new component
import '../styles/tools.css'; // Add this line to import common styles

const TimeTools: React.FC = () => {
    return (
        <div className="page-container">  {/* Change container and class */}
            <h1>時間工具</h1> {/* Add H1 title */}
            <div className="tools-grid"> {/* Re-add inner grid div */}
                <TimestampToDateConverter /> {/* Render new component */}
                <BlockToTimeConverter /> {/* Render new component */}
            </div>
        </div>
    );
};

export default TimeTools;
