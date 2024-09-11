import { connect, StringCodec } from "nats";

const sc = StringCodec();

(async () => {
  const nc = await connect({ servers: "nats://localhost:4222" });
  console.log("Subscriber connected to NATS");

  const sub = nc.subscribe("updates");
  console.log('Subscribed to "updates" subject');

  for await (const msg of sub) {
    console.log(`Received message: ${sc.decode(msg.data)}`);
  }
})();
