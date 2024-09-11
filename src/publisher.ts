import { connect, StringCodec } from "nats";

// Create a codec to encode/decode string messages
const sc = StringCodec();

(async () => {
  // Connect to the NATS server
  const nc = await connect({ servers: "nats://localhost:4222" });
  console.log("Publisher connected to NATS");

  // Publish a message to the "updates" subject
  nc.publish("updates", sc.encode("Hello from TypeScript Publisher!"));
  console.log('Message published to "updates" subject');

  // Close the connection after sending
  await nc.drain();
})();
