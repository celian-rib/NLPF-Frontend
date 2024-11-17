// WebSocketContext.tsx
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
        const ws = new WebSocket('ws://localhost:8089');
        wsRef.current = ws;

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
            // Request the current date from the server
            ws.send('currentDate');
        };

        ws.onmessage = (event) => {
            const message = event.data;
            if (message.startsWith('Current Date:') || message.startsWith('Next Date:')) {
                const date = message.replace(/^(Current Date|Next Date): /, '').trim();
                setSimulationDate(date);
            }
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.close();
        };
    }, []);

    const requestNextDate = () => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send('simulate');
        } else {
            console.error('WebSocket is not open');
        }
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
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
