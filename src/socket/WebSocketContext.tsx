import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface WebSocketContextProps {
    simulationDate: string | null;
    requestNextDate: () => void;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [simulationDate, setSimulationDate] = useState<string | null>(null);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:8089');
        wsRef.current = ws;

        // Send a message to the server to get the current date
        ws.onopen = () => {
            console.log('Connected to WebSocket server');
            ws.send('currentDate');
        };

        // Listen for messages from the server
        ws.onmessage = (event) => {
            const message = event.data;
            if (message.startsWith('Current Date:') || message.startsWith('Next Date:'))
            {
                const date = message.replace(/^(Current Date|Next Date): /, '').trim();
                setSimulationDate(date);
            }
        };

        // Log connection status changes
        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // Log errors
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.close();
        };
    }, []);

    // Function to request the next date from the server
    const requestNextDate = () => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN)
            wsRef.current.send('simulate');
        else
            console.error('WebSocket is not open');
    };

    return (
        <WebSocketContext.Provider value={{ simulationDate, requestNextDate }}>
            {children}
        </WebSocketContext.Provider>
    );
};

// Custom hook to use WebSocket context
export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context)
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    return context;
};
