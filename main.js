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
    location: { x: 0, y:0 },
  },
  ["16th"]: {
    name: "16th St. Mission",
    segment: "M",
    links: [
      { station: "civc", time: 0, distance: 0 },
      { station: "24th", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  ["19th"]: {
    name: "19th St. Oakland",
    segment: "K",
    links: [
      { station: "12th", time: 0, distance: 0 },
      { station: "mcar", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  ["24th"]: {
    name: "24th St. Mission",
    segment: "M",
    links: [
      { station: "16th", time: 0, distance: 0 },
      { station: "glen", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  antc: {
    name: "Antioch",
    segment: "C",
    links: [
      { station: "pctr", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  ashb: {
    name: "Ashby",
    segment: "R",
    links: [
      { station: "mcar", time: 0, distance: 0 },
      { station: "dbrk", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  balb: {
    name: "Balboa Park",
    segment: "M",
    links: [
      { station: "glen", time: 0, distance: 0 },
      { station: "daly", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  bayf: {
    name: "Bay Fair",
    segment: "AL",
    links: [
      { station: "cast", time: 0, distance: 0 },
      { station: "sanl", time: 0, distance: 0 },
      { station: "hayw", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  bery: {
    name: "Berryessa / North San José",
    segment: "A",
    links: [
      { station: "mlpt", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  cast: {
    name: "Castro Valley",
    segment: "L",
    links: [
      { station: "bayf", time: 0, distance: 0 },
      { station: "wdub", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  civc: {
    name: "Civic Center / UN Plaza",
    segment: "M",
    links: [
      { station: "powl", time: 0, distance: 0 },
      { station: "16th", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  cols: {
    name: "Coliseum",
    segment: "AL",
    links: [
      { station: "ftvl", time: 0, distance: 0 },
      { station: "sanl", time: 0, distance: 0 },
      { station: "oakl", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  colm: {
    name: "Colma",
    segment: "M",
    links: [
      { station: "daly", time: 0, distance: 0 },
      { station: "ssan", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  conc: {
    name: "Concord",
    segment: "C",
    links: [
      { station: "ncon", time: 0, distance: 0 },
      { station: "phil", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  daly: {
    name: "Daly City",
    segment: "M",
    links: [
      { station: "balb", time: 0, distance: 0 },
      { station: "colm", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  dbrk: {
    name: "Downtown Berkeley",
    segment: "R",
    links: [
      { station: "ashb", time: 0, distance: 0 },
      { station: "nbrk", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  dubl: {
    name: "Dublin / Pleasanton",
    segment: "L",
    links: [
      { station: "wdub", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  deln: {
    name: "El Cerrito del Norte",
    segment: "R",
    links: [
      { station: "rich", time: 0, distance: 0 },
      { station: "plza", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  plza: {
    name: "El Cerrito Plaza",
    segment: "R",
    links: [
      { station: "deln", time: 0, distance: 0 },
      { station: "nbrk", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  embr: {
    name: "Embarcadero",
    segment: "M",
    links: [
      { station: "woak", time: 0, distance: 0 },
      { station: "mont", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  frmt: {
    name: "Fremont",
    segment: "A",
    links: [
      { station: "ucty", time: 0, distance: 0 },
      { station: "warm", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  ftvl: {
    name: "Fruitvale",
    segment: "AL",
    links: [
      { station: "lake", time: 0, distance: 0 },
      { station: "cols", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  glen: {
    name: "Glen Park",
    segment: "M",
    links: [
      { station: "24th", time: 0, distance: 0 },
      { station: "balb", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  hayw: {
    name: "Hayward",
    segment: "A",
    links: [
      { station: "bayf", time: 0, distance: 0 },
      { station: "shay", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  lafy: {
    name: "Lafayette",
    segment: "C",
    links: [
      { station: "orin", time: 0, distance: 0 },
      { station: "wcrk", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  lake: {
    name: "Lake Merritt",
    segment: "AL",
    links: [
      { station: "12th", time: 0, distance: 0 },
      { station: "woak", time: 0, distance: 0 },
      { station: "ftvl", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  mcar: {
    name: "MacArthur",
    segment: "K",
    links: [
      { station: "ashb", time: 0, distance: 0 },
      { station: "rock", time: 0, distance: 0 },
      { station: "19th", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  mlbr: {
    name: "Millbrae",
    segment: "M",
    links: [
      { station: "sbrn", time: 0, distance: 0 },
      { station: "sfia", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  mlpt: {
    name: "Milpitas",
    segment: "A",
    links: [
      { station: "warm", time: 0, distance: 0 },
      { station: "bery", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  mont: {
    name: "Montgomery St.",
    segment: "M",
    links: [
      { station: "embr", time: 0, distance: 0 },
      { station: "powl", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  nbrk: {
    name: "North Berkeley",
    segment: "R",
    links: [
      { station: "dbrk", time: 0, distance: 0 },
      { station: "plza", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  ncon: {
    name: "North Concord / Martinez",
    segment: "C",
    links: [
      { station: "pitt", time: 0, distance: 0 },
      { station: "conc", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  oakl: {
    name: "Oakland International Airport",
    segment: "O",
    links: [
      { station: "cols", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  orin: {
    name: "Orinda",
    segment: "C",
    links: [
      { station: "rock", time: 0, distance: 0 },
      { station: "lafy", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  pitt: {
    name: "Pittsburg / Bay Point",
    segment: "C",
    links: [
      { station: "pctr", time: 0, distance: 0 },
      { station: "ncon", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  pctr: {
    name: "Pittsburg Center",
    segment: "C",
    links: [
      { station: "pitt", time: 0, distance: 0 },
      { station: "antc", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  phil: {
    name: "Pleasant Hill / Contra Costa Centre",
    segment: "C",
    links: [
      { station: "conc", time: 0, distance: 0 },
      { station: "wcrk", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  powl: {
    name: "Powell St.",
    segment: "M",
    links: [
      { station: "mont", time: 0, distance: 0 },
      { station: "civc", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  rich: {
    name: "Richmond",
    segment: "R",
    links: [
      { station: "deln", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  rock: {
    name: "Rockridge",
    segment: "C",
    links: [
      { station: "orin", time: 0, distance: 0 },
      { station: "mcar", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  sbrn: {
    name: "San Bruno",
    segment: "M",
    links: [
      { station: "ssan", time: 0, distance: 0 },
      { station: "sfia", time: 0, distance: 0 },
      { station: "mlbr", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  sfia: {
    name: "San Francisco International Airport",
    segment: "M",
    links: [
      { station: "mlbr", time: 0, distance: 0 },
      { station: "sbrn", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  sanl: {
    name: "San Leandro",
    segment: "AL",
    links: [
      { station: "bayf", time: 0, distance: 0 },
      { station: "cols", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  shay: {
    name: "South Hayward",
    segment: "A",
    links: [
      { station: "hayw", time: 0, distance: 0 },
      { station: "ucty", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  ssan: {
    name: "South San Francisco",
    segment: "M",
    links: [
      { station: "sbrn", time: 0, distance: 0 },
      { station: "colm", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  ucty: {
    name: "Union City",
    segment: "A",
    links: [
      { station: "shay", time: 0, distance: 0 },
      { station: "frmt", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  wcrk: {
    name: "Walnut Creek",
    segment: "C",
    links: [
      { station: "phil", time: 0, distance: 0 },
      { station: "lafy", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  warm: {
    name: "Warm Springs",
    segment: "A",
    links: [
      { station: "mlpt", time: 0, distance: 0 },
      { station: "frmt", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  wdub: {
    name: "West Dublin / Pleasanton",
    segment: "L",
    links: [
      { station: "dubl", time: 0, distance: 0 },
      { station: "cast", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
  },
  woak: {
    name: "West Oakland",
    segment: "M",
    links: [
      { station: "12th", time: 0, distance: 0 },
      { station: "lake", time: 0, distance: 0 },
      { station: "embr", time: 0, distance: 0 },
    ],
    location: { x: 0, y:0 },
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
  const context = map.getContext("2d");
  
  context.fillStyle = "green";
  context.fillRect(10, 10, 150, 100);
}

dataCheck();
main();
