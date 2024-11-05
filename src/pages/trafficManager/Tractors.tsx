import React, { useState } from 'react';
import SubNavbar from '../../components/navbar/SubNavbar';
import { trafficManagerTabs } from '../../configs/tabConfig';
import Navbar from '../../components/navbar/Navbar';

const TrafficManagerTractors: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<string>('');

    return (
        <>
            <Navbar />
            <SubNavbar tabs={trafficManagerTabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </>
    );
};

export default TrafficManagerTractors;
