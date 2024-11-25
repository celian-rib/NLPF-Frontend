import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Tab {
    name: string;
    path: string;
}

interface SubNavbarProps {
    tabs: Tab[];
    currentTab: string;
    setCurrentTab: (tab: string) => void;
}

const SubNavbar: React.FC<SubNavbarProps> = ({ tabs, currentTab, setCurrentTab }) => {
    const location = useLocation();

    // Set the active tab based on the URL
    useEffect(() => {
        const activeTab = tabs.find((tab) => location.pathname.includes(tab.path));
        if (activeTab)
            setCurrentTab(activeTab.name);
        else
            setCurrentTab('');
    }, [location.pathname, tabs, setCurrentTab]);

    return (
        <nav className="bg-gray-200 px-10 py-4 text-gray-800 fixed top-24 mt-6 left-0 w-full z-40">
            <ul className="flex space-x-16">
                {tabs.map((tab) => (
                    <li key={tab.name}>
                        <Link
                            to={tab.path}
                            onClick={() => setCurrentTab(tab.name)}
                            className={`${
                                currentTab === tab.name ? 'font-bold bg-gray-800 text-gray-200 rounded-md px-4 py-2' : ''
                            } hover:text-blue-400 transition-colors duration-200`}
                        >
                            {tab.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default SubNavbar;
