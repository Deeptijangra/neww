// Functional component for displaying packet latency 
import React, { useEffect, useState } from 'react';
import WebSocket from 'websocket';

const LatencyDisplay = () => {
  const [latency, setLatency] = useState(0);

  useEffect(() => {
    const client = new WebSocket.client();

    client.on('connect', (connection) => {
      console.log('WebSocket client connected');

      connection.on('message', (message) => {
        if (message.type === 'utf8') {
          const data = JSON.parse(message.utf8Data);
          const packetTimestamp = data.timestamp;
          const currentTimestamp = new Date().getTime();
          const packetLatency = currentTimestamp - packetTimestamp;
          setLatency(packetLatency);
        }
      });
    });

    client.connect('ws://localhost:55455', 'echo-protocol');
  }, []);

  return (
    <div>
      <h3>Packet Latency</h3>
      <p>{latency} ms</p>
    </div>
  );
};

export default LatencyDisplay;
//display the packet latency:
import React from 'react';
import Banner from './components/Banner';
import Exhibit from './components/Exhibit';
import IPDisplay from './components/IPDisplay';
import LatencyDisplay from './components/LatencyDisplay';

const App = () => {
  return (
    <div>
      <Banner />

      <Exhibit title="IPv4 Address">
        <IPDisplay version="ipv4" />
      </Exhibit>

      <Exhibit title="IPv6 Address">
        <IPDisplay version="ipv6" />
      </Exhibit>

      <Exhibit title="Packet Latency">
        <LatencyDisplay />
      </Exhibit>

      {/* You can add more Exhibit components for other data points in the future */}
    </div>
  );
};

export default App;
