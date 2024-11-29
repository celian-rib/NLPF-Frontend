import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface WebSocketContextProps {
    simulationDate?: string | null;
    messageBroadcasted?: boolean | null;
    requestNextDate?: () => void;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [simulationDate, setSimulationDate] = useState<string | null>(null);
    const [messageBroadcasted, setMessageBroadcasted] = useState<boolean | null>(false);
    const wsRef = useRef<WebSocket | null>(null);

    // Handle messages based on their type
    const handleMessage = (message: string) => {
        if (message.startsWith('Current Date:'))
        {
            const date = message.replace('Current Date:', '').trim();
            setSimulationDate(date);
        }
        else if (message.startsWith('Next Date:'))
        {
            const date = message.replace('Next Date:', '').trim();
            setSimulationDate(date);
        }
        else if (message.startsWith('Broadcast:'))
        {
            setMessageBroadcasted((prev) => {
                return !prev;
            });
        }
    };

    useEffect(() => {
        const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:8089');
        wsRef.current = ws;

        // Handle connection opening
        ws.onopen = () => {
            console.log('Connected to WebSocket server');
            ws.send('currentDate');
        };

        // Handle incoming messages
        ws.onmessage = (event) => {
            console.log('Message received:', event.data);
            handleMessage(event.data);
        };

        // Handle connection closing
        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // Handle errors
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Clean up
        return () => {
            ws.close();
        };
        // eslint-disable-next-line
    }, []);

    // Function to send a command to the server
    const sendMessage = (message: string) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN)
            wsRef.current.send(message);
        else
            console.error('WebSocket is not open');
    };

    // Function to request next date
    const requestNextDate = () => {
        sendMessage('simulate');
    };

    return (
        <WebSocketContext.Provider value={{
            simulationDate,
            messageBroadcasted,
            requestNextDate,
        }}>
            {children}
        </WebSocketContext.Provider>
    );
};

// Custom hook to use the WebSocket context
export const useWebSocket = (): WebSocketContextProps => {
    const context = useContext(WebSocketContext);
    if (!context)
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    return context;
};
