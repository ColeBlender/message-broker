import { connect, StringCodec } from "nats";

const sc = StringCodec();

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
