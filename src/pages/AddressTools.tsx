import React from 'react';
import { AddressChecksumFormatter } from '../components/AddressChecksumFormatter';
import { PublicKeyToAddressConverter } from '../components/PublicKeyToAddressConverter';

const AddressTools: React.FC = () => {
    return (
        <div className="container mx-auto p-4 space-y-6">
            {/* 後續可以加入更多地址相關工具 */}
            <AddressChecksumFormatter />
            <PublicKeyToAddressConverter />
        </div>
    );
};

export default AddressTools;
