const waterColor = "#e4f1f7";
const landColor = "#ffffff";

/**
 * points and colors describing regions of the map to be drawn
 */
const landforms = [{
  name: "bay area",
  color: waterColor,
  path: [
    { x: .085, y: .000 },
    { x: .085, y: .111 },
    { x: .154, y: .201 },
    { x: .154, y: .233 },
    { x: .184, y: .278 },
    { x: .153, y: .325 },
    { x: .086, y: .325 },
    { x: .041, y: .272 },
    { x: .016, y: .272 },
    { x: .000, y: .251 },
    { x: .000, y: 1.00 },
    { x: .171, y: 1.00 },
    { x: .171, y: .946 },
    { x: .123, y: .887 },
    { x: .123, y: .817 },
    { x: .075, y: .757 },
    { x: .075, y: .521 },
    { x: .084, y: .503 },
    { x: .084, y: .415 },
    { x: .125, y: .369 },
    { x: .161, y: .369 },
    { x: .179, y: .378 },
    { x: .244, y: .378 },
    { x: .322, y: .482 },
    { x: .322, y: .599 },
    { x: .347, y: .633 },
    { x: .347, y: .767 },
    { x: .382, y: .767 },
    { x: .404, y: .797 },
    { x: .424, y: .797 },
    { x: .495, y: .880 },
    { x: .561, y: .880 },
    { x: .585, y: .854 },
    { x: .585, y: .826 },
    { x: .510, y: .731 },
    { x: .510, y: .650 },
    { x: .483, y: .617 },
    { x: .458, y: .638 },
    { x: .416, y: .587 },
    { x: .416, y: .526 },
    { x: .385, y: .487 },
    { x: .361, y: .487 },
    { x: .361, y: .411 },
    { x: .369, y: .398 },
    { x: .369, y: .354 },
    { x: .235, y: .186 },
    { x: .217, y: .186 },
    { x: .191, y: .146 },
    { x: .244, y: .074 },
    { x: .244, y: .000 },
  ],
}, {
  name: "alameda",
  color: landColor,
  path: [
    { x: .373, y: .495 },
    { x: .384, y: .495 },
    { x: .411, y: .527 },
    { x: .411, y: .542 },
    { x: .401, y: .542 },
    { x: .373, y: .507 },
  ],
}];