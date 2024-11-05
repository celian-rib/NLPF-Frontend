import React, { useState } from 'react';
import SubNavbar from '../../components/navbar/SubNavbar';
import { traderTabs } from '../../configs/tabConfig';
import Navbar from '../../components/navbar/Navbar';

const TraderLots: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<string>('');

    return (
        <>
            <Navbar />
            <SubNavbar tabs={traderTabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </>
    );
};

export default TraderLots;
