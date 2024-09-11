import { connect, StringCodec } from "nats";

// Create a codec to encode/decode string messages
const sc = StringCodec();

(async () => {
  // Connect to the NATS server
  const nc = await connect({ servers: "nats://localhost:4222" });
  console.log("Subscriber connected to NATS");

  // Subscribe to the "updates" subject
  const sub = nc.subscribe("updates");
  console.log('Subscribed to "updates" subject');

  // Listen for messages
  for await (const msg of sub) {
    console.log(`Received message: ${sc.decode(msg.data)}`);
  }
})();
