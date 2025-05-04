import React from 'react';
import { AddressChecksumFormatter } from '../components/AddressChecksumFormatter'; // Use relative path

const AddressTools: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            {/* 後續可以加入更多地址相關工具 */}
            <AddressChecksumFormatter />
        </div>
    );
};

export default AddressTools;
