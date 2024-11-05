import React, { useState } from 'react';
import SubNavbar from '../../components/navbar/SubNavbar';
import { stockExchangeTabs } from '../../configs/tabConfig';
import Navbar from '../../components/navbar/Navbar';

const StockExchangeTractors: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<string>('');

    return (
        <>
            <Navbar />
            <SubNavbar tabs={stockExchangeTabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </>
    );
};

export default StockExchangeTractors;
