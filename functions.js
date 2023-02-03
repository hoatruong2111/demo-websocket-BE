now = new Date(1997, 9, 3);
oneDay = 24 * 3600 * 1000;
value = Math.random() * 1000; 

function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 20 - 10;
    return {
      name: now.toString(),
      value: [
        [
          now.getFullYear(),
          now.getMonth() + 1,
          now.getDate(),
        ].join("/"),
        Math.round(value),
      ],
    };
  }

module.exports = { randomData };