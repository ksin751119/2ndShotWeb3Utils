import React from 'react';
import { AddressChecksumFormatter } from '../components/AddressChecksumFormatter';
import { PublicKeyToAddressConverter } from '../components/PublicKeyToAddressConverter';
import { AddressGenerator } from '../components/AddressGenerator';
import '../styles/tools.css';

const AddressTools: React.FC = () => {
    return (
        <div className="page-container">
            <div className="tools-grid">
                <AddressChecksumFormatter />
                <PublicKeyToAddressConverter />
                <AddressGenerator />
            </div>
        </div>
    );
};

export default AddressTools;
