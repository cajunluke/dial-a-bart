const mapCanvasSize = { width: 700, height: 557 };
const stringlineCanvasSize = { width: 1000, height: 750 };

const waterColor = "#e4f1f7";
const landColor = "#ffffff";

const segments = {
  AL: {
    name: "Alameda/Livermore Interline",
    stations: ["lake", "ftvl", "cols", "sanl", "bayf"],
    connections: { K: "12th", M: "woak", A: "hayw", L: "cast" },
  },
  A: {
    name: "Alameda Line",
    stations: ["hayw", "shay", "ucty", "frmt"],
    connections: { AL: "bayf", S: "warm" },
  },
  C: {
    name: "Concord Line",
    stations: ["pitt", "ncon", "conc", "phil", "wcrk", "lafy", "orin", "rock"],
    connections: { K: "mcar", E: "pctr" },
  },
  K: {
    name: "Downtown Oakland Line (Oakland Wye)",
    stations: ["mcar", "19th", "12th"],
    connections: { R: "ashb", C: "rock", M: "woak", AL: "lake" },
  },
  L: {
    name: "Livermore Line",
    stations: ["cast", "wdub", "dubl"],
    connections: { AL: "bayf" },
  },
  M: {
    name: "Market/Mission Line",
    stations: ["woak", "embr", "mont", "powl", "civc", "16th", "24th", "glen", "balb", "daly"],
    connections: { K: "12th", AL: "lake", W: "colm" },
  },
  R: {
    name: "Richmond Line",
    stations: ["rich", "deln", "plza", "nbrk", "dbrk", "ashb"],
    connections: { K: "mcar" },
  },
  S: {
    name: "South Alameda/Santa Clara Line",
    stations: ["warm", "mlpt", "bery"],
    connections: { A: "frmt" },
  },
  W: {
    name: "San Mateo Line",
    stations: ["colm", "ssan", "sbrn", "mlbr"],
    connections: { M: "daly" },
  },
  Y: {
    name: "SFO Line",
    stations: ["sfia"],
    connections: { W: "sbrn", W: "mlbr" },
  },
  E: {
    name: "eBART Line",
    stations: ["antc", "pctr"],
    connections: { C: "pitt" },
  },
  H: {
    // not a mainline bart line, so it gets special handling
    name: "OAK Airtrain",
    stations: ["oakl", "cols"],
  },
};

const lines = [{
  name: "Orange",
  color: "#f8a51a",
  segments: ["R", "K", "AL", "A", "S"],
}, {
  name: "Yellow",
  color: "#ffe802",
  segments: ["C", "E", "K", "M", "W", "Y"],
}, {
  name: "Blue",
  color: "#01aced",
  segments: ["M", "AL", "L"],
}, {
  name: "Red",
  color: "#ec1c23",
  segments: ["R", "K", "M", "W"],
}, {
  name: "Green",
  color: "#4db947",
  segments: ["M", "AL", "A", "S"],
}, {
  name: "Beige",
  color: "#a8a280",
  segments: ["H"],
}];

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

/**
 * time is in minutes; distance is in kilometers
 */
const stations = {
  ["12th"]: {
    name: "12th St. Oakland City Center",
    links: [
      { station: "19th", time: 2, distance: .661 },
      { station: "woak", time: 4, distance: 2.54 },
      { station: "lake", time: 3, distance: 1.10 },
    ],
    location: { x: .401, y: .400 },
  },
  ["16th"]: {
    name: "16th St. Mission",
    links: [
      { station: "civc", time: 2, distance: 1.78 },
      { station: "24th", time: 2, distance: 1.46 },
    ],
    location: { x: .218, y: .566 },
  },
  ["19th"]: {
    name: "19th St. Oakland",
    links: [
      { station: "12th", time: 2, distance: .661 },
      { station: "mcar", time: 4, distance: 2.41 },
    ],
    location: { x: .401, y: .369 },
  },
  ["24th"]: {
    name: "24th St. Mission",
    links: [
      { station: "16th", time: 2, distance: 1.46 },
      { station: "glen", time: 3, distance: 2.65 },
    ],
    location: { x: .218, y: .593 },
  },
  antc: {
    name: "Antioch",
    links: [
      { station: "pctr", time: 7, distance: 9.89 },
    ],
    location: { x: .764, y: .119 },
  },
  ashb: {
    name: "Ashby",
    links: [
      // orange line ashb -> mcar is 6 mins, probably for extra dwell time
      { station: "mcar", time: 3, distance: 2.80 },
      { station: "dbrk", time: 2, distance: 1.94 },
    ],
    location: { x: .371, y: .281 },
  },
  balb: {
    name: "Balboa Park",
    links: [
      { station: "glen", time: 4, distance: 1.83 },
      { station: "daly", time: 4, distance: 2.88 },
    ],
    location: { x: .218, y: .651 },
  },
  bayf: {
    name: "Bay Fair",
    links: [
      { station: "cast", time: 4, distance: 4.81 },
      { station: "sanl", time: 4, distance: 4.12 },
      { station: "hayw", time: 4, distance: 4.60 },
    ],
    location: { x: .520, y: .591 },
  },
  bery: {
    name: "Berryessa / North San José",
    links: [
      { station: "mlpt", time: 4, distance: 4.86 },
    ],
    location: { x: .689, y: .912 },
  },
  cast: {
    name: "Castro Valley",
    links: [
      { station: "bayf", time: 4, distance: 4.81 },
      { station: "wdub", time: 10, distance: 13.56 },
    ],
    location: { x: .620, y: .606 },
  },
  civc: {
    name: "Civic Center / UN Plaza",
    links: [
      { station: "powl", time: 2, distance: .749 },
      { station: "16th", time: 2, distance: 1.78 },
    ],
    location: { x: .235, y: .518 },
  },
  cols: {
    name: "Coliseum",
    links: [
      { station: "ftvl", time: 4, distance: 3.38 },
      { station: "sanl", time: 4, distance: 4.76 },
      { station: "oakl", time: 9, distance: 4.99 },
    ],
    location: { x: .473, y: .533 },
  },
  colm: {
    name: "Colma",
    links: [
      { station: "daly", time: 4, distance: 2.58 },
      { station: "ssan", time: 3, distance: 3.03 },
    ],
    location: { x: .257, y: .729 },
  },
  conc: {
    name: "Concord",
    links: [
      { station: "ncon", time: 3, distance: 3.61 },
      { station: "phil", time: 5, distance: 6.52 },
    ],
    location: { x: .542, y: .145 },
  },
  daly: {
    name: "Daly City",
    links: [
      { station: "balb", time: 4, distance: 2.88 },
      { station: "colm", time: 4, distance: 2.58 },
    ],
    location: { x: .235, y: .701 },
  },
  dbrk: {
    name: "Downtown Berkeley",
    links: [
      { station: "ashb", time: 3, distance: 1.94 },
      { station: "nbrk", time: 3, distance: 1.68 },
    ],
    location: { x: .351, y: .251 },
  },
  dubl: {
    name: "Dublin / Pleasanton",
    links: [
      { station: "wdub", time: 3, distance: 2.58 },
    ],
    location: { x: .769, y: .606 },
  },
  deln: {
    name: "El Cerrito del Norte",
    links: [
      { station: "rich", time: 7, distance: 3.72 },
      { station: "plza", time: 3, distance: 2.96 },
    ],
    location: { x: .288, y: .171 },
  },
  plza: {
    name: "El Cerrito Plaza",
    links: [
      { station: "deln", time: 3, distance: 2.96 },
      { station: "nbrk", time: 3, distance: 3.56 },
    ],
    location: { x: .310, y: .199 },
  },
  embr: {
    name: "Embarcadero",
    links: [
      { station: "woak", time: 7, distance: 9.49 },
      { station: "mont", time: 1, distance: .547 },
    ],
    location: { x: .280, y: .458 },
  },
  frmt: {
    name: "Fremont",
    links: [
      { station: "ucty", time: 5, distance: 5.16 },
      { station: "warm", time: 6, distance: 7.49 },
    ],
    location: { x: .665, y: .771 },
  },
  ftvl: {
    name: "Fruitvale",
    links: [
      { station: "lake", time: 4, distance: 4.40 },
      { station: "cols", time: 4, distance: 3.38 },
    ],
    location: { x: .449, y: .503 },
  },
  glen: {
    name: "Glen Park",
    links: [
      { station: "24th", time: 3, distance: 2.65 },
      { station: "balb", time: 3, distance: 1.83 },
    ],
    location: { x: .218, y: .622 },
  },
  hayw: {
    name: "Hayward",
    links: [
      { station: "bayf", time: 4, distance: 4.60 },
      { station: "shay", time: 4, distance: 4.74 },
    ],
    location: { x: .565, y: .647 },
  },
  lafy: {
    name: "Lafayette",
    links: [
      { station: "orin", time: 4, distance: 6.05 },
      { station: "wcrk", time: 5, distance: 5.56 },
    ],
    location: { x: .474, y: .224 },
  },
  lake: {
    name: "Lake Merritt",
    links: [
      { station: "12th", time: 3, distance: 1.10 },
      { station: "woak", time: 5, distance: 2.94 },
      { station: "ftvl", time: 4, distance: 4.40 },
    ],
    location: { x: .425, y: .472 },
  },
  mcar: {
    name: "MacArthur",
    links: [
      { station: "ashb", time: 4, distance: 2.80 },
      { station: "rock", time: 4, distance: 2.53 },
      { station: "19th", time: 3, distance: 2.41 },
    ],
    location: { x: .401, y: .338 },
  },
  mlbr: {
    name: "Millbrae",
    links: [
      { station: "sbrn", time: 4, distance: 4.93 },
      { station: "sfia", time: 5, distance: 2.70 },
    ],
    location: { x: .327, y: .822 },
  },
  mlpt: {
    name: "Milpitas",
    links: [
      { station: "warm", time: 8, distance: 11.10 },
      { station: "bery", time: 4, distance: 4.86 },
    ],
    location: { x: .689, y: .870 },
  },
  mont: {
    name: "Montgomery St.",
    links: [
      { station: "embr", time: 2, distance: .547 },
      { station: "powl", time: 2, distance: .804 },
    ],
    location: { x: .266, y: .478 },
  },
  nbrk: {
    name: "North Berkeley",
    links: [
      { station: "dbrk", time: 2, distance: 1.68 },
      { station: "plza", time: 3, distance: 3.56 },
    ],
    location: { x: .332, y: .225 },
  },
  ncon: {
    name: "North Concord / Martinez",
    links: [
      { station: "pitt", time: 7, distance: 7.81 },
      { station: "conc", time: 3, distance: 3.61 },
    ],
    location: { x: .585, y: .119 },
  },
  oakl: {
    name: "Oakland International Airport",
    links: [
      { station: "cols", time: 9, distance: 4.99 },
    ],
    location: { x: .457, y: .605 },
  },
  orin: {
    name: "Orinda",
    links: [
      { station: "rock", time: 6, distance: 7.07 },
      { station: "lafy", time: 4, distance: 6.05 },
    ],
    location: { x: .455, y: .249 },
  },
  pitt: {
    name: "Pittsburg / Bay Point",
    links: [
      { station: "pctr", time: 11, distance: 4.91 },
      { station: "ncon", time: 6, distance: 7.81 },
    ],
    location: { x: .648, y: .119 },
  },
  pctr: {
    name: "Pittsburg Center",
    links: [
      { station: "pitt", time: 11, distance: 4.91 },
      { station: "antc", time: 7, distance: 9.89 },
    ],
    location: { x: .713, y: .119 },
  },
  phil: {
    name: "Pleasant Hill / Contra Costa Centre",
    links: [
      { station: "conc", time: 5, distance: 6.52 },
      { station: "wcrk", time: 3, distance: 2.77 },
    ],
    location: { x: .518, y: .171 },
  },
  powl: {
    name: "Powell St.",
    links: [
      { station: "mont", time: 2, distance: .804 },
      { station: "civc", time: 1, distance: .749 },
    ],
    location: { x: .250, y: .496 },
  },
  rich: {
    name: "Richmond",
    links: [
      { station: "deln", time: 4, distance: 3.72 },
    ],
    location: { x: .269, y: .142 },
  },
  rock: {
    name: "Rockridge",
    links: [
      { station: "orin", time: 6, distance: 7.07 },
      { station: "mcar", time: 2, distance: 2.53 },
    ],
    location: { x: .432, y: .279 },
  },
  sbrn: {
    name: "San Bruno",
    links: [
      { station: "ssan", time: 3, distance: 3.92 },
      { station: "sfia", time: 3, distance: 3.55 },
      { station: "mlbr", time: 5, distance: 4.93 },
    ],
    location: { x: .297, y: .789 },
  },
  sfia: {
    name: "San Francisco International Airport",
    links: [
      { station: "mlbr", time: 4, distance: 2.70 },
      { station: "sbrn", time: 4, distance: 3.55 },
    ],
    location: { x: .362, y: .798 },
  },
  sanl: {
    name: "San Leandro",
    links: [
      { station: "bayf", time: 4, distance: 4.12 },
      { station: "cols", time: 4, distance: 4.76 },
    ],
    location: { x: .496, y: .561 },
  },
  shay: {
    name: "South Hayward",
    links: [
      { station: "hayw", time: 4, distance: 4.74 },
      { station: "ucty", time: 5, distance: 6.04 },
    ],
    location: { x: .598, y: .689 },
  },
  ssan: {
    name: "South San Francisco",
    links: [
      { station: "sbrn", time: 3, distance: 3.92 },
      { station: "colm", time: 3, distance: 3.03 },
    ],
    location: { x: .279, y: .755 },
  },
  ucty: {
    name: "Union City",
    links: [
      { station: "shay", time: 5, distance: 6.04 },
      { station: "frmt", time: 5, distance: 5.16 },
    ],
    location: { x: .631, y: .729 },
  },
  wcrk: {
    name: "Walnut Creek",
    links: [
      { station: "phil", time: 3, distance: 2.77 },
      { station: "lafy", time: 5, distance: 5.56 },
    ],
    location: { x: .497, y: .196 },
  },
  warm: {
    name: "Warm Springs",
    links: [
      { station: "mlpt", time: 8, distance: 11.10 },
      { station: "frmt", time: 6, distance: 7.49 },
    ],
    location: { x: .689, y: .831 },
  },
  wdub: {
    name: "West Dublin / Pleasanton",
    links: [
      { station: "dubl", time: 3, distance: 2.58 },
      { station: "cast", time: 10, distance: 13.56 },
    ],
    location: { x: .708, y: .606 },
  },
  woak: {
    name: "West Oakland",
    links: [
      { station: "12th", time: 4, distance: 2.54 },
      { station: "lake", time: 6, distance: 2.94 },
      { station: "embr", time: 7, distance: 9.49 },
    ],
    location: { x: .370, y: .439 },
  },
};

function dataCheck() {
  for (const [code, { name, links }] of Object.entries(stations)) {
    links.forEach(link => {
      const outbound = link.station;
      
      if(!stations[outbound]) {
        // bad outbound link
        console.log(`${name} (${code}) has invalid link to "${outbound}"`);
      } else {
        // verify inbound link
        const other = stations[outbound];
        
        let foundLink = false;
        other.links.forEach(inlink => {
          if(inlink.station === code) {
            foundLink |= true;
            
            if(link.time === 0) {
              console.log(`${name} has zero time to ${other.name} (${link.time})`);
            }
            
            if(link.distance === 0) {
              console.log(`${name} has zero distance to ${other.name} (${link.distance})`);
            }
            
            // can only check time and distance matching if we have both ends
            // times can vary depending on direction because of dwell times
            //if(inlink.time !== link.time) {
            //  console.log(`${name} and ${other.name} disagree on time: ${inlink.time} v ${link.time}`);
            //}
            
            if(inlink.distance !== link.distance) {
              console.log(`${name} and ${other.name} disagree on distance: ${inlink.distance} v ${link.distance}`);
            }
          }
        });
        
        if(!foundLink) {
          // didn't find inbound link
          console.log(`${other.name} has invalid backlink to ${code}`);
        }
      }
    });
  }
}

function precomputeStations() {
  lines.forEach(line => {
    const lineStations = line.segments
                             .map(segment => segments[segment])
                             .flatMap(segment => segment.stations);
    
    // need to find an endpoint and sort stations along line
    
    // pre-populate `nodes` with objects for each station
    const nodes = {};
    lineStations.forEach(station => {
      nodes[station] = {
        adjacent: [],
      };
    });
    
    // bart doesn't have cycles, so I didn't bother checking for that
    // also *one* of the ends has to be a terminal station, so no trying to simulate short-turns like 24th-pctr
    
    // this will be the first endpoint we find
    let endpoint = undefined;
    lineStations.forEach(station => {
      const { links = [] } = stations[station];
      
      if(links.length === 0) {
        // not sure how we got here; go to next
        return;
      }
      
      if(links.length === 1 && endpoint === undefined) {
        // this is a terminal station and we haven't found an endpoint yet; this is our end
        endpoint = station;
      }
      
      links.forEach(link => {
        // if this link is in the station list
        if(nodes[link.station]) {
          nodes[station].adjacent.push(link.station);
        }
      });
    });
    
    // our output data structure
    line.stations = [];
    
    // the endpoint comes first
    line.stations.push(endpoint);
    
    // declare it to be our initial node
    let currentNode = nodes[endpoint];
    // and remove it from the nodes collection
    delete nodes[endpoint];
    
    // while nodes reamin, find the next node and travel there
    while(Object.keys(nodes).length > 0) {
      const availables = currentNode.adjacent.filter(link => Object.keys(nodes).includes(link));
      const nextStation = availables[0];
      
      // put this as the next station in the list
      line.stations.push(nextStation);
      
      // set it as next node
      currentNode = nodes[nextStation];
      // and remove it from the nodes collection
      delete nodes[nextStation];
    }
  });
  
  lines.forEach(line => {
    line.stations.forEach(station => {
      const { visitingLines = 0 } = stations[station];
      
      stations[station].visitingLines = visitingLines + 1;
    });
  });
}

const convertPoint = ({ x, y }) => {
  return {
    x: Math.round(x * mapCanvasSize.width), 
    y: Math.round(y * mapCanvasSize.height),
  };
};

const drawLines = (context, lines, state) => {
  // map<string, int> counting lines currently visited
  const visitedLines = {};
  
  lines.forEach((line, index) => {
    const isSelected = state.selectedLine === index;
    
    context.beginPath();
    context.strokeStyle = line.color;
    context.lineWidth = isSelected ? 5 : 3;
    
    const points = line.stations.map(station => {
      const { location, visitingLines } = stations[station];
      
      const point = convertPoint(location);
      
      if(visitingLines === 1) {
        // one line visiting means no offset needed
        return point;
      }
      
      // get and increment visitedLines for this station
      const alreadyVisited = visitedLines[station] ?? 0;
      visitedLines[station] = alreadyVisited + 1;
      
      // offset line by how many have already been here
      // TODO fancy algorithm
      
      // also TODO slanted lines should be offset by pythagoras
      
      const increment = 3 * alreadyVisited;
      
      if(visitingLines === 2) {
        // offset by half a linewidth
        // hard-coded because it's shit anyway
        
        return {
          x: (point.x - 1.5) + increment,
          y: point.y,
        };
      }
      
      if(visitingLines === 3) {
        // offset by whole linewidth
        // hard-coded because it's shit anyway
        
        return {
          x: (point.x - 3) + increment,
          y: point.y,
        };
      }
      
      if(visitingLines === 4) {
        // offset by half again linewidth
        // hard-coded because it's shit anyway
        
        return {
          x: (point.x - 4.5) + increment,
          y: point.y,
        };
      }
    });
    
    const startPoint = points[0];
    context.moveTo(startPoint.x, startPoint.y);
    
    points.forEach(({x, y}) => {
      context.lineTo(x, y);
    });
    
    context.stroke();
    context.closePath();
  });
};

const drawMap = (map, state) => {
  const context = map.getContext("2d");
  
  // clear all previous drawing
  context.clearRect(0, 0, mapCanvasSize.width, mapCanvasSize.height);
  
  // draw background
  landforms.forEach(({ color, path }) => {
    context.beginPath();
    context.fillStyle = color;
    context.lineWidth = 0;
    
    // start at the last point
    const startPoint = convertPoint(path[path.length-1]);
    context.moveTo(startPoint.x, startPoint.y);
    
    path.forEach(point => {
      const {x, y} = convertPoint(point);
      
      context.lineTo(x, y);
    });
    
    context.fill();
    context.closePath();
  });
  
  // draw lines
  drawLines(context, lines, state);
  
  // draw station circles
  // if no selected segment, highlight nothing
  const highlightStations = segments[state.selectedSegment]?.stations ?? [];
  
  Object.entries(stations).forEach(([code, station]) => {
    const {x, y} = convertPoint(station.location);
    
    context.beginPath();
    
    if(highlightStations.includes(code)) {
      context.fillStyle = "cornflowerblue";
    } else {
      context.fillStyle = "white";
    }
    
    context.strokeStyle = "black";
    context.lineWidth = 1;
    
    context.ellipse(x, y, 5, 5, 0, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
    context.closePath();
    
    context.beginPath();
    
    context.fillStyle = "black";
    context.lineWidth = 1;
    context.font = "11px sans-serif";
    context.fillText(code, x + 10, y + 4);
    
    context.closePath();
  });
};

const buildTable = (linesArea, state, repaint, editingLineChanged) => {
  // build column groups
  const colgroup = linesArea.querySelectorAll("table colgroup")[0];
  
  // two unused header groups to start (these are the index and line color)
  colgroup.append(document.createElement("col"));
  colgroup.append(document.createElement("col"));
  
  // and one group for each of the segments
  // keep a reference to these for later lookup
  const colgroups = {};
  Object.keys(segments).forEach(key => {
    const column = document.createElement("col");
    column.id = key;
    colgroup.append(column);
    
    colgroups[key] = column;
  });
  
  // build headers
  const thead = linesArea.querySelectorAll("table thead")[0];
  
  // top header; mostly static, but with the "line segments" colspan
  const topHeader = document.createElement("tr");
  {
    // in a block for scoping convenience
    
    let header = document.createElement("th");
    header.rowSpan = 2;
    header.style = "width: 4rem";
    topHeader.append(header);
    
    header = document.createElement("th");
    header.rowSpan = 2;
    header.textContent = "Line Color";
    header.style = "width: 6rem";
    topHeader.append(header);
    
    header = document.createElement("th");
    header.colSpan = Object.keys(segments).length;
    header.style = "background: white;";
    header.textContent = "Line Segments";
    topHeader.append(header);
  }
  thead.append(topHeader);

  // subheader, one for each segment
  const subheader = document.createElement("tr");
  
  Object.entries(segments).forEach(([key, { name }]) => {
    const anchor = document.createElement("a");
    anchor.textContent = key;
    anchor.title = name;
    
    const header = document.createElement("th");
    header.style = "font-size: .7em; width: 30px;";
    header.append(anchor);
    
    const colgroup = colgroups[key];
    
    header.onmouseover = event => {
      colgroup.className = "selectedColumn";
      header.className = "selectedColumn";
      
      state.selectedSegment = key;
      
      repaint();
    };
    
    header.onmouseout = event => {
      colgroup.className = "";
      header.className = "";
      
      state.selectedSegment = undefined;
      
      repaint();
    };
    
    subheader.append(header);
  });
  
  thead.append(subheader);
  
  // lines in table body
  const tableBody = linesArea.querySelectorAll("table tbody")[0];
  
  lines.forEach((line, index) => {
    const row = document.createElement("tr");
    
    const sequence = document.createElement("td");
    sequence.textContent = `${index+1}  📈`;
    sequence.style = "cursor: pointer;";
    
    sequence.onclick = event => {
      if(state.editingLine === index) {
        // if we're already selected, unselect
        state.editingLine = undefined;
      } else {
        state.editingLine = index;
      }
      
      editingLineChanged();
    };
    
    row.append(sequence);
    
    const color = document.createElement("td");
    color.textContent = line.name;
    color.style = `background: ${line.color}30;`;
    row.append(color);
    
    Object.keys(segments).forEach(segment => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.disabled = true;
      checkbox.checked = line.segments.includes(segment);
      
      const hasSegment = document.createElement("td");
      hasSegment.append(checkbox);
      
      row.append(hasSegment);
    });
    
    const mouseover = event => {
      row.style = `background: ${line.color}50;`;
      
      state.selectedLine = index;
      
      repaint();
    };
    
    sequence.onmouseover = mouseover;
    color.onmouseover = mouseover;
    
    const mouseout = event => {
      row.style = `background: unset;`;
      
      state.selectedLine = undefined;
      
      repaint();
    };
    
    sequence.onmouseout = mouseout;
    color.onmouseout = mouseout;
    
    tableBody.append(row);
  });
};

const buildStringline = (timings, stringline, state) => {
  const header = timings.querySelectorAll("h2")[0];
  
  const context = stringline.getContext("2d");
  
  context.clearRect(0, 0, stringlineCanvasSize.width, stringlineCanvasSize.height);
  
  if(state.editingLine === undefined) {
    header.textContext = "Select a line to edit";
    header.style = "background: unset;";
    
    stringline.style = "display: none;";
    
    return;
  }
  
  const line = lines[state.editingLine];
  
  header.textContext = `Currently editing ${line.name} Line`;
  header.style = `background: ${line.color}40;`;
  
  const minorGridColor = "#00000066";
  
  stringline.style = "";
  
  const chartTop = 20;
  const chartBottom = stringlineCanvasSize.height - 50;
  const chartLeft = 50;
  const chartRight = stringlineCanvasSize.width - 20;
  
  // y axis labels and grid lines
  const yAxisHeight = chartBottom - chartTop;
  ["×:00", "×:45", "×:30", "×:15", "×:00", "×:45", "×:30", "×:15", "×:00"].forEach((label, index) => {
    const yLoc = ((index/8) * yAxisHeight) + chartTop;
    
    // draw label
    context.beginPath();
    
    context.lineWidth = 1;
    context.font = "12px sans-serif";
    context.textAlign = "end";
    
    // get text height to shift text down to vertically center on point
    const textSize = context.measureText(label);
    const yOffset = Math.round(textSize.actualBoundingBoxAscent/2);
    
    context.fillText(label, chartLeft - 5, yLoc + yOffset);
    
    context.stroke();
    context.closePath();
    
    // draw gridline
    context.beginPath();
    
    context.lineWidth = 1;
    context.strokeStyle = minorGridColor;
    
    context.moveTo(chartLeft, yLoc);
    context.lineTo(chartRight, yLoc);
    
    context.stroke();
    context.closePath();
  });
  
  let lineLength = 0;
  let lineDuration = 0;
  
  const xAxisLabels = [];
  const waypoints = [];
  
  let prevStation = line.stations[0];
  
  // start at origin
  waypoints.push({ milepoint: 0, minute: 0 });
  
  xAxisLabels.push({
    label: prevStation,
    milepoint: 0,
  });
  
  for(let i = 1; i < line.stations.length; i++) {
    const currentStation = line.stations[i];
    
    const { links } = stations[currentStation];
    
    const [{ time, distance }, ] = links.filter(({ station }) => station === prevStation);
    
    lineLength += distance;
    lineDuration += time;
    
    xAxisLabels.push({
      label: currentStation,
      milepoint: lineLength,
    });
    
    // station arrival
    waypoints.push({
      milepoint: lineLength,
      minute: lineDuration,
    });
    
    if(i === line.stations.length - 1) {
      // if this isn't the last station, add dwell time and another point for that
      
      // assume 30s dwell time
      lineDuration += .5;
      
      // station departure
      waypoints.push({
        milepoint: lineLength,
        minute: lineDuration,
      });
    }
    
    prevStation = currentStation;
  };
  
  // x axis labels and grid lines
  const xAxisLength = chartRight - chartLeft;
  
  // pixels per kilometer
  const xResolution = xAxisLength / lineLength;
  // pixels per minute
  const yResolution = yAxisHeight / 120;
  
  xAxisLabels.forEach(({ label, milepoint }) => {
    const xLoc = (milepoint * xResolution) + chartLeft;
        
    // draw label
    context.beginPath();
        
    context.lineWidth = 1;
    context.font = "12px sans-serif";
    context.textAlign = "start";
    
    // get text height to shift text down to vertically center on point
    const textSize = context.measureText(label);
    const xOffset = Math.round(textSize.width/2);
    
    const yLoc = chartBottom + 5 + Math.round(textSize.actualBoundingBoxAscent);
    context.fillText(label, xLoc - xOffset, yLoc);
    
    context.stroke();
    context.closePath();
        
    // draw gridline
    context.beginPath();
    
    context.lineWidth = 1;
    context.strokeStyle = minorGridColor;
    
    context.moveTo(xLoc, chartTop);
    context.lineTo(xLoc, chartBottom);
    
    context.stroke();
    context.closePath();
  });
  
  // draw stringline
  
  // convert waypoints to coordinates
  const points = waypoints.map(({ milepoint, minute }) => {
    // convert milepoint to x
    const x = (milepoint * xResolution) + chartLeft;
    
    // convert minute to y
    // time goes up, but the origin is top-left
    const y = chartBottom - (minute * yResolution);
    
    return { x, y };
  });
  
  context.beginPath();
  
  context.strokeStyle = line.color;
  context.lineWidth = 2;
  
  const [firstPoint, ...otherPoints] = points;
  
  context.moveTo(firstPoint.x, firstPoint.y);
  
  otherPoints.forEach(({ x, y }) => {
    context.lineTo(x, y);
  });
  
  context.stroke();
  context.closePath();
  
  // draw axes
  // this is last so they show up on top
  context.beginPath();
  
  context.strokeStyle = "black";
  context.lineWidth = 2;
  
  context.moveTo(chartLeft, chartTop);
  context.lineTo(chartLeft, chartBottom);
  context.lineTo(chartRight, chartBottom);
  
  context.stroke();
  context.closePath();
};

function main() {
  const state = {
    selectedSegment: undefined,
    selectedLine: undefined,
    editingLine: undefined,
  };
  
  const map = document.getElementById("bartmap");
  map.width = mapCanvasSize.width;
  map.height = mapCanvasSize.height;
  
  const repaint = () => {
    drawMap(map, state);
  };
  
  const timings = document.getElementById("stringlineHeader");
  const stringline = document.getElementById("stringline");
  stringline.width = stringlineCanvasSize.width;
  stringline.height = stringlineCanvasSize.height;
  
  const editingLineChanged = () => {
    buildStringline(timings, stringline, state);
  };
  
  const linesArea = document.getElementById("lines");
  buildTable(linesArea, state, repaint, editingLineChanged);
  
  editingLineChanged();
  
  // draw in canvas
  repaint();
}

// verify data consistency
dataCheck();

// examine the lines and build reasonable station lists
// NOTE: this won't work for DIY lines later, but it'll be fine now
precomputeStations();

// build the page and run!
main();
