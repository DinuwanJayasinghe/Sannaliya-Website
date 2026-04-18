import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { toast } from 'react-toastify';

let stompClient = null;

export const connectWebSocket = (role) => {
  if (stompClient) return;

  const socket = new SockJS('http://localhost:8080/ws');
  stompClient = new Client({
    webSocketFactory: () => socket,
    onConnect: () => {
      console.log('Connected to WebSocket');
      if (role === 'ROLE_ADMIN') {
        stompClient.subscribe('/topic/orders', (message) => {
          const order = JSON.parse(message.body);
          toast.info(`New Order received! ID: ${order.id || 'New'}`, {
            autoClose: 10000,
            onClick: () => window.location.href = '/admin/orders'
          });
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
