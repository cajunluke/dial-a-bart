const segments = ["R", "C", "K", "AL", "A", "L", "M", "O"]

const lines = [{
  color: "Orange",
  segments: ["R", "K", "AL", "A"],
}, {
  color: "Yellow",
  segments: ["C", "K", "M"],
}, {
  color: "Blue",
  segments: ["M", "K", "AL", "L"],
}, {
  color: "Red",
  segments: ["R", "K", "M"],
}, {
  color: "Green",
  segments: ["M", "K", "AL", "A"],
}, {
  color: "Beige",
  segments: ["O"],
}];

const stations = {
  ["12th"]: {
    name: "12th St. Oakland City Center",
    segment: "K",
    links: [
      { station: "19th", time: 0, distance: 0 },
      { station: "woak", time: 0, distance: 0 },
      { station: "lake", time: 0, distance: 0 },
    ],
    location: { x: .401, y: .400 },
  },
  ["16th"]: {
    name: "16th St. Mission",
    segment: "M",
    links: [
      { station: "civc", time: 0, distance: 0 },
      { station: "24th", time: 0, distance: 0 },
    ],
    location: { x: .218, y: .568 },
  },
  ["19th"]: {
    name: "19th St. Oakland",
    segment: "K",
    links: [
      { station: "12th", time: 0, distance: 0 },
      { station: "mcar", time: 0, distance: 0 },
    ],
    location: { x: .401, y: .369 },
  },
  ["24th"]: {
    name: "24th St. Mission",
    segment: "M",
    links: [
      { station: "16th", time: 0, distance: 0 },
      { station: "glen", time: 0, distance: 0 },
    ],
    location: { x: .218, y: .594 },
  },
  antc: {
    name: "Antioch",
    segment: "C",
    links: [
      { station: "pctr", time: 0, distance: 0 },
    ],
    location: { x: .764, y: .119 },
  },
  ashb: {
    name: "Ashby",
    segment: "R",
    links: [
      { station: "mcar", time: 0, distance: 0 },
      { station: "dbrk", time: 0, distance: 0 },
    ],
    location: { x: .371, y: .281 },
  },
  balb: {
    name: "Balboa Park",
    segment: "M",
    links: [
      { station: "glen", time: 0, distance: 0 },
      { station: "daly", time: 0, distance: 0 },
    ],
    location: { x: .218, y: .649 },
  },
  bayf: {
    name: "Bay Fair",
    segment: "AL",
    links: [
      { station: "cast", time: 0, distance: 0 },
      { station: "sanl", time: 0, distance: 0 },
      { station: "hayw", time: 0, distance: 0 },
    ],
    location: { x: .520, y: .591 },
  },
  bery: {
    name: "Berryessa / North San José",
    segment: "A",
    links: [
      { station: "mlpt", time: 0, distance: 0 },
    ],
    location: { x: .689, y: .912 },
  },
  cast: {
    name: "Castro Valley",
    segment: "L",
    links: [
      { station: "bayf", time: 0, distance: 0 },
      { station: "wdub", time: 0, distance: 0 },
    ],
    location: { x: .620, y: .606 },
  },
  civc: {
    name: "Civic Center / UN Plaza",
    segment: "M",
    links: [
      { station: "powl", time: 0, distance: 0 },
      { station: "16th", time: 0, distance: 0 },
    ],
    location: { x: .235, y: .518 },
  },
  cols: {
    name: "Coliseum",
    segment: "AL",
    links: [
      { station: "ftvl", time: 0, distance: 0 },
      { station: "sanl", time: 0, distance: 0 },
      { station: "oakl", time: 0, distance: 0 },
    ],
    location: { x: .473, y: .531 },
  },
  colm: {
    name: "Colma",
    segment: "M",
    links: [
      { station: "daly", time: 0, distance: 0 },
      { station: "ssan", time: 0, distance: 0 },
    ],
    location: { x: .257, y: .729 },
  },
  conc: {
    name: "Concord",
    segment: "C",
    links: [
      { station: "ncon", time: 0, distance: 0 },
      { station: "phil", time: 0, distance: 0 },
    ],
    location: { x: .542, y: .145 },
  },
  daly: {
    name: "Daly City",
    segment: "M",
    links: [
      { station: "balb", time: 0, distance: 0 },
      { station: "colm", time: 0, distance: 0 },
    ],
    location: { x: .235, y: .701 },
  },
  dbrk: {
    name: "Downtown Berkeley",
    segment: "R",
    links: [
      { station: "ashb", time: 0, distance: 0 },
      { station: "nbrk", time: 0, distance: 0 },
    ],
    location: { x: .351, y: .251 },
  },
  dubl: {
    name: "Dublin / Pleasanton",
    segment: "L",
    links: [
      { station: "wdub", time: 0, distance: 0 },
    ],
    location: { x: .769, y: .606 },
  },
  deln: {
    name: "El Cerrito del Norte",
    segment: "R",
    links: [
      { station: "rich", time: 0, distance: 0 },
      { station: "plza", time: 0, distance: 0 },
    ],
    location: { x: .285, y: .174 },
  },
  plza: {
    name: "El Cerrito Plaza",
    segment: "R",
    links: [
      { station: "deln", time: 0, distance: 0 },
      { station: "nbrk", time: 0, distance: 0 },
    ],
    location: { x: .308, y: .201 },
  },
  embr: {
    name: "Embarcadero",
    segment: "M",
    links: [
      { station: "woak", time: 0, distance: 0 },
      { station: "mont", time: 0, distance: 0 },
    ],
    location: { x: .280, y: .458 },
  },
  frmt: {
    name: "Fremont",
    segment: "A",
    links: [
      { station: "ucty", time: 0, distance: 0 },
      { station: "warm", time: 0, distance: 0 },
    ],
    location: { x: .665, y: .771 },
  },
  ftvl: {
    name: "Fruitvale",
    segment: "AL",
    links: [
      { station: "lake", time: 0, distance: 0 },
      { station: "cols", time: 0, distance: 0 },
    ],
    location: { x: .449, y: .503 },
  },
  glen: {
    name: "Glen Park",
    segment: "M",
    links: [
      { station: "24th", time: 0, distance: 0 },
      { station: "balb", time: 0, distance: 0 },
    ],
    location: { x: .218, y: .623 },
  },
  hayw: {
    name: "Hayward",
    segment: "A",
    links: [
      { station: "bayf", time: 0, distance: 0 },
      { station: "shay", time: 0, distance: 0 },
    ],
    location: { x: .565, y: .647 },
  },
  lafy: {
    name: "Lafayette",
    segment: "C",
    links: [
      { station: "orin", time: 0, distance: 0 },
      { station: "wcrk", time: 0, distance: 0 },
    ],
    location: { x: .476, y: .226 },
  },
  lake: {
    name: "Lake Merritt",
    segment: "AL",
    links: [
      { station: "12th", time: 0, distance: 0 },
      { station: "woak", time: 0, distance: 0 },
      { station: "ftvl", time: 0, distance: 0 },
    ],
    location: { x: .425, y: .472 },
  },
  mcar: {
    name: "MacArthur",
    segment: "K",
    links: [
      { station: "ashb", time: 0, distance: 0 },
      { station: "rock", time: 0, distance: 0 },
      { station: "19th", time: 0, distance: 0 },
    ],
    location: { x: .401, y: .338 },
  },
  mlbr: {
    name: "Millbrae",
    segment: "M",
    links: [
      { station: "sbrn", time: 0, distance: 0 },
      { station: "sfia", time: 0, distance: 0 },
    ],
    location: { x: .327, y: .822 },
  },
  mlpt: {
    name: "Milpitas",
    segment: "A",
    links: [
      { station: "warm", time: 0, distance: 0 },
      { station: "bery", time: 0, distance: 0 },
    ],
    location: { x: .689, y: .870 },
  },
  mont: {
    name: "Montgomery St.",
    segment: "M",
    links: [
      { station: "embr", time: 0, distance: 0 },
      { station: "powl", time: 0, distance: 0 },
    ],
    location: { x: .266, y: .478 },
  },
  nbrk: {
    name: "North Berkeley",
    segment: "R",
    links: [
      { station: "dbrk", time: 0, distance: 0 },
      { station: "plza", time: 0, distance: 0 },
    ],
    location: { x: .332, y: .225 },
  },
  ncon: {
    name: "North Concord / Martinez",
    segment: "C",
    links: [
      { station: "pitt", time: 0, distance: 0 },
      { station: "conc", time: 0, distance: 0 },
    ],
    location: { x: .585, y: .119 },
  },
  oakl: {
    name: "Oakland International Airport",
    segment: "O",
    links: [
      { station: "cols", time: 0, distance: 0 },
    ],
    location: { x: .457, y: .605 },
  },
  orin: {
    name: "Orinda",
    segment: "C",
    links: [
      { station: "rock", time: 0, distance: 0 },
      { station: "lafy", time: 0, distance: 0 },
    ],
    location: { x: .455, y: .249 },
  },
  pitt: {
    name: "Pittsburg / Bay Point",
    segment: "C",
    links: [
      { station: "pctr", time: 0, distance: 0 },
      { station: "ncon", time: 0, distance: 0 },
    ],
    location: { x: .648, y: .119 },
  },
  pctr: {
    name: "Pittsburg Center",
    segment: "C",
    links: [
      { station: "pitt", time: 0, distance: 0 },
      { station: "antc", time: 0, distance: 0 },
    ],
    location: { x: .713, y: .119 },
  },
  phil: {
    name: "Pleasant Hill / Contra Costa Centre",
    segment: "C",
    links: [
      { station: "conc", time: 0, distance: 0 },
      { station: "wcrk", time: 0, distance: 0 },
    ],
    location: { x: .520, y: .171 },
  },
  powl: {
    name: "Powell St.",
    segment: "M",
    links: [
      { station: "mont", time: 0, distance: 0 },
      { station: "civc", time: 0, distance: 0 },
    ],
    location: { x: .250, y: .496 },
  },
  rich: {
    name: "Richmond",
    segment: "R",
    links: [
      { station: "deln", time: 0, distance: 0 },
    ],
    location: { x: .269, y: .142 },
  },
  rock: {
    name: "Rockridge",
    segment: "C",
    links: [
      { station: "orin", time: 0, distance: 0 },
      { station: "mcar", time: 0, distance: 0 },
    ],
    location: { x: .432, y: .279 },
  },
  sbrn: {
    name: "San Bruno",
    segment: "M",
    links: [
      { station: "ssan", time: 0, distance: 0 },
      { station: "sfia", time: 0, distance: 0 },
      { station: "mlbr", time: 0, distance: 0 },
    ],
    location: { x: .297, y: .789 },
  },
  sfia: {
    name: "San Francisco International Airport",
    segment: "M",
    links: [
      { station: "mlbr", time: 0, distance: 0 },
      { station: "sbrn", time: 0, distance: 0 },
    ],
    location: { x: .362, y: .798 },
  },
  sanl: {
    name: "San Leandro",
    segment: "AL",
    links: [
      { station: "bayf", time: 0, distance: 0 },
      { station: "cols", time: 0, distance: 0 },
    ],
    location: { x: .496, y: .561 },
  },
  shay: {
    name: "South Hayward",
    segment: "A",
    links: [
      { station: "hayw", time: 0, distance: 0 },
      { station: "ucty", time: 0, distance: 0 },
    ],
    location: { x: .596, y: .689 },
  },
  ssan: {
    name: "South San Francisco",
    segment: "M",
    links: [
      { station: "sbrn", time: 0, distance: 0 },
      { station: "colm", time: 0, distance: 0 },
    ],
    location: { x: .279, y: .755 },
  },
  ucty: {
    name: "Union City",
    segment: "A",
    links: [
      { station: "shay", time: 0, distance: 0 },
      { station: "frmt", time: 0, distance: 0 },
    ],
    location: { x: .631, y: .729 },
  },
  wcrk: {
    name: "Walnut Creek",
    segment: "C",
    links: [
      { station: "phil", time: 0, distance: 0 },
      { station: "lafy", time: 0, distance: 0 },
    ],
    location: { x: .496, y: .199 },
  },
  warm: {
    name: "Warm Springs",
    segment: "A",
    links: [
      { station: "mlpt", time: 0, distance: 0 },
      { station: "frmt", time: 0, distance: 0 },
    ],
    location: { x: .689, y: .831 },
  },
  wdub: {
    name: "West Dublin / Pleasanton",
    segment: "L",
    links: [
      { station: "dubl", time: 0, distance: 0 },
      { station: "cast", time: 0, distance: 0 },
    ],
    location: { x: .708, y: .606 },
  },
  woak: {
    name: "West Oakland",
    segment: "M",
    links: [
      { station: "12th", time: 0, distance: 0 },
      { station: "lake", time: 0, distance: 0 },
      { station: "embr", time: 0, distance: 0 },
    ],
    location: { x: .370, y: .439 },
  },
}

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
            
            // can only check time and distance matching if we have both ends
            if(inlink.time !== link.time) {
              console.log(`${name} and ${other.name} disagree on time: ${inlink.time} v ${link.time}`);
            }
            
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

const drawMap = map => {
  const context = map.getContext("2d");
  
  // draw station circles
  Object.values(stations).forEach(station => {
    const {x, y} = station.location;
    
    context.beginPath();
    context.fillStyle = "white";
    context.strokeStyle = "black";
    context.ellipse(x * 628, y * 500, 5, 5, 0, 0, 2 * Math.PI);
    context.stroke();
  });
}

function main() {
  // fill table
  const tableBody = document.getElementById("lines")
                            .getElementsByTagName("tbody")[0];
  
  lines.forEach((line, index) => {    
    const row = document.createElement("tr");
    
    const sequence = document.createElement("td");
    sequence.append(`${index+1}`);
    row.append(sequence);
    
    const color = document.createElement("td");
    color.append(line.color);
    row.append(color);
    
    segments.forEach(segment => {
      const hasSegment = document.createElement("td");
      
      if(line.segments.includes(segment)) {
        hasSegment.append("Y");
      }
      
      row.append(hasSegment);
    });
    
    tableBody.append(row);
  });
  
  // draw in canvas
  const map = document.getElementById("bartmap");
  drawMap(map);
}

dataCheck();
main();
