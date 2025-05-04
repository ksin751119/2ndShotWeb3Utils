import React from 'react';
// import { TimeConverters } from '@/components/TimeConverters';
import { TimeConverters } from '../components/TimeConverters'; // Use relative path

const TimeTools: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <TimeConverters />
        </div>
    );
};

export default TimeTools;
