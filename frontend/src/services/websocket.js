import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { toast } from 'react-toastify';

let stompClient = null;

// Dynamically determine WebSocket URL
const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:8080/ws';

export const connectWebSocket = (role, onOrderReceived) => {
  if (stompClient) return;

  const socket = new SockJS(WS_URL);
  stompClient = new Client({
    webSocketFactory: () => socket,
    onConnect: () => {
      console.log('Connected to WebSocket');
      if (role === 'ROLE_ADMIN') {
        stompClient.subscribe('/topic/orders', (message) => {
          const order = JSON.parse(message.body);
          toast.info(`New Order received! ID: ${order.id || 'New'}`, {
            autoClose: 10000,
          });
          if (onOrderReceived) onOrderReceived(order);
        });
      }
    },
    onStompError: (frame) => {
      console.error('STOMP error', frame);
    }
  });

  stompClient.activate();
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }
};
