import { connect, StringCodec } from "nats";

const sc = StringCodec();

// Publisher
(async () => {
  const nc = await connect({
    servers:
      process.env.NODE_ENV === "development"
        ? "nats://localhost:4222"
        : process.env.NATS_URL,
  });
  console.log("Publisher connected to NATS");

  nc.publish("updates", sc.encode("Hello from TypeScript Publisher!"));
  console.log('Message published to "updates" subject');

  await nc.drain();
})();

// Subscriber
(async () => {
  const nc = await connect({
    servers:
      process.env.NODE_ENV === "development"
        ? "nats://localhost:4222"
        : process.env.NATS_URL,
  });
  console.log("Subscriber connected to NATS");

  const sub = nc.subscribe("updates");
  console.log('Subscribed to "updates" subject');

  for await (const msg of sub) {
    console.log(`Received message: ${sc.decode(msg.data)}`);
  }
})();
