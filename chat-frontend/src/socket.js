import { io } from "socket.io-client";

const socket = io("http://localhost:1337"); // Your Strapi backend's WebSocket server
export default socket;
