export default [
  {
    id: "3294a",
    name: "haha",
    mail: "blabla@bla.com",
    rule: { hour: 9, minute: 15 },
    bus: 126,
    station: 3359,
    paused: true,
  },
  {
    id: "925bamba28",
    name: "arbuz23",
    mail: "blablaaa@bla.com",
    rule: { hour: 15, minute: 0 },
    bus: 171,
    station: 1000,
    scheduleTrigger: 12,
  },
  {
    id: "k0edCov0L",
    name: "arbuz",
    mail: "blablaaa@bla.com",
    rule: { hour: 15, minute: 22 },
    bus: 171,
    station: 1000,
  },
  {
    id: "UV2TWMXak",
    name: "arbuz",
    mail: "blablaaa@bla.com",
    rule: { hour: 15, minute: 22 },
    bus: 171,
    station: 1000,
    webPushSub: false
  },
  {
    id: "xGEzN-iNG",
    name: "arbuz",
    mail: "blablaaa@bla.com",
    rule: { hour: 15, minute: 22 },
    bus: 171,
    station: 1000,
    scheduleTrigger: {max: 10, min: 9},
    webPushSub: {token: "ksadksadkasd", something: true}
  },
];
