/**
 * The (2022-current) list of BART's stations
 * 
 * This is an object; the keys are the station codes used by BART and extensively in this application.
 * The values are objects with these statically configured attributes:
 * • `name`: string
 *      The station's full display name
 * • `links`: array of { station: string, time: number, distance: number }
 *      The other stations this station is linked to:
 *      ⁃ `station`: the code of the other station
 *      ⁃ `time`: the time it takes to travel from this station to that station in minutes
 *      ⁃ `distance`: the distance from this station to that station in km (measured on Google Maps Nov 2022)
 * • `location`: object { x: number, y: number }
 *      The location of the station on the map (measured off the official BART map Nov 2022)
 * • `angle`: number
 *      The angle the line to the station name should be at; this also affects the track line adjacency
 *
 * These other attributes are computed based on the lines that visit these stations:
 * • `lines`: array of numbers
 •      Each number is the index of a line that visits this station
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
    angle: 90,
  },
  ["16th"]: {
    name: "16th St. Mission",
    links: [
      { station: "civc", time: 2, distance: 1.78 },
      { station: "24th", time: 2, distance: 1.46 },
    ],
    location: { x: .218, y: .566 },
    angle: 90,
  },
  ["19th"]: {
    name: "19th St. Oakland",
    links: [
      { station: "12th", time: 2, distance: .661 },
      { station: "mcar", time: 4, distance: 2.41 },
    ],
    location: { x: .401, y: .368 },
    angle: 90,
  },
  ["24th"]: {
    name: "24th St. Mission",
    links: [
      { station: "16th", time: 2, distance: 1.46 },
      { station: "glen", time: 3, distance: 2.65 },
    ],
    location: { x: .218, y: .594 },
    angle: 90,
  },
  antc: {
    name: "Antioch",
    links: [
      { station: "pctr", time: 7, distance: 9.89 },
    ],
    location: { x: .764, y: .119 },
    angle: 180,
  },
  ashb: {
    name: "Ashby",
    links: [
      { station: "mcar", time: 6, distance: 2.80 },
      { station: "dbrk", time: 2, distance: 1.94 },
    ],
    location: { x: .374, y: .280 },
    angle: 135,
  },
  balb: {
    name: "Balboa Park",
    links: [
      { station: "glen", time: 4, distance: 1.83 },
      { station: "daly", time: 4, distance: 2.88 },
    ],
    location: { x: .218, y: .651 },
    angle: 90,
  },
  bayf: {
    name: "Bay Fair",
    links: [
      { station: "cast", time: 4, distance: 4.81 },
      { station: "sanl", time: 4, distance: 4.12 },
      { station: "hayw", time: 4, distance: 4.60 },
    ],
    location: { x: .521, y: .594 },
    angle: 135,
  },
  bery: {
    name: "Berryessa / North San José",
    links: [
      { station: "mlpt", time: 4, distance: 4.86 },
    ],
    location: { x: .689, y: .912 },
    angle: 90,
  },
  cast: {
    name: "Castro Valley",
    links: [
      { station: "bayf", time: 4, distance: 4.81 },
      { station: "wdub", time: 10, distance: 13.56 },
    ],
    location: { x: .620, y: .606 },
    angle: 180,
  },
  civc: {
    name: "Civic Center / UN Plaza",
    links: [
      { station: "powl", time: 2, distance: .749 },
      { station: "16th", time: 2, distance: 1.78 },
    ],
    location: { x: .232, y: .518 },
    angle: 45,
  },
  cols: {
    name: "Coliseum",
    links: [
      { station: "ftvl", time: 4, distance: 3.38 },
      { station: "sanl", time: 4, distance: 4.76 },
      { station: "oakl", time: 9, distance: 4.99 },
    ],
    location: { x: .473, y: .533 },
    angle: 135,
  },
  colm: {
    name: "Colma",
    links: [
      { station: "daly", time: 4, distance: 2.58 },
      { station: "ssan", time: 3, distance: 3.03 },
    ],
    location: { x: .253, y: .732 },
    angle: 135,
  },
  conc: {
    name: "Concord",
    links: [
      { station: "ncon", time: 3, distance: 3.61 },
      { station: "phil", time: 5, distance: 6.52 },
    ],
    location: { x: .538, y: .144 },
    angle: 45,
  },
  daly: {
    name: "Daly City",
    links: [
      { station: "balb", time: 4, distance: 2.88 },
      { station: "colm", time: 4, distance: 2.58 },
    ],
    location: { x: .230, y: .703 },
    angle: 135,
  },
  dbrk: {
    name: "Downtown Berkeley",
    links: [
      { station: "ashb", time: 3, distance: 1.94 },
      { station: "nbrk", time: 3, distance: 1.68 },
    ],
    location: { x: .351, y: .251 },
    angle: 135,
  },
  dubl: {
    name: "Dublin / Pleasanton",
    links: [
      { station: "wdub", time: 3, distance: 2.58 },
    ],
    location: { x: .769, y: .606 },
    angle: 180,
  },
  deln: {
    name: "El Cerrito del Norte",
    links: [
      { station: "rich", time: 7, distance: 3.72 },
      { station: "plza", time: 3, distance: 2.96 },
    ],
    location: { x: .287, y: .171 },
    angle: 135,
  },
  plza: {
    name: "El Cerrito Plaza",
    links: [
      { station: "deln", time: 3, distance: 2.96 },
      { station: "nbrk", time: 3, distance: 3.56 },
    ],
    location: { x: .310, y: .199 },
    angle: 135,
  },
  embr: {
    name: "Embarcadero",
    links: [
      { station: "woak", time: 7, distance: 9.49 },
      { station: "mont", time: 1, distance: .547 },
    ],
    location: { x: .280, y: .458 },
    angle: 45,
  },
  frmt: {
    name: "Fremont",
    links: [
      { station: "ucty", time: 5, distance: 5.16 },
      { station: "warm", time: 6, distance: 7.49 },
    ],
    location: { x: .662, y: .771 },
    angle: 135,
  },
  ftvl: {
    name: "Fruitvale",
    links: [
      { station: "lake", time: 4, distance: 4.40 },
      { station: "cols", time: 4, distance: 3.38 },
    ],
    location: { x: .449, y: .503 },
    angle: 135,
  },
  glen: {
    name: "Glen Park",
    links: [
      { station: "24th", time: 3, distance: 2.65 },
      { station: "balb", time: 3, distance: 1.83 },
    ],
    location: { x: .218, y: .623 },
    angle: 90,
  },
  hayw: {
    name: "Hayward",
    links: [
      { station: "bayf", time: 4, distance: 4.60 },
      { station: "shay", time: 4, distance: 4.74 },
    ],
    location: { x: .565, y: .648 },
    angle: 135,
  },
  lafy: {
    name: "Lafayette",
    links: [
      { station: "orin", time: 4, distance: 6.05 },
      { station: "wcrk", time: 5, distance: 5.56 },
    ],
    location: { x: .477, y: .221 },
    angle: 45,
  },
  lake: {
    name: "Lake Merritt",
    links: [
      { station: "12th", time: 3, distance: 1.10 },
      { station: "woak", time: 5, distance: 2.94 },
      { station: "ftvl", time: 4, distance: 4.40 },
    ],
    location: { x: .424, y: .472 },
    angle: 135,
  },
  mcar: {
    name: "MacArthur",
    links: [
      { station: "ashb", time: 4, distance: 2.80 },
      { station: "rock", time: 4, distance: 2.53 },
      { station: "19th", time: 3, distance: 2.41 },
    ],
    location: { x: .401, y: .338 },
    angle: 90,
  },
  mlbr: {
    name: "Millbrae",
    links: [
      { station: "sbrn", time: 4, distance: 4.93 },
      { station: "sfia", time: 5, distance: 2.70 },
    ],
    location: { x: .328, y: .827 },
    angle: 0,
  },
  mlpt: {
    name: "Milpitas",
    links: [
      { station: "warm", time: 8, distance: 11.10 },
      { station: "bery", time: 4, distance: 4.86 },
    ],
    location: { x: .689, y: .871 },
    angle: 90,
  },
  mont: {
    name: "Montgomery St.",
    links: [
      { station: "embr", time: 2, distance: .547 },
      { station: "powl", time: 2, distance: .804 },
    ],
    location: { x: .264, y: .477 },
    angle: 45,
  },
  nbrk: {
    name: "North Berkeley",
    links: [
      { station: "dbrk", time: 2, distance: 1.68 },
      { station: "plza", time: 3, distance: 3.56 },
    ],
    location: { x: .332, y: .226 },
    angle: 135,
  },
  ncon: {
    name: "North Concord / Martinez",
    links: [
      { station: "pitt", time: 7, distance: 7.81 },
      { station: "conc", time: 3, distance: 3.61 },
    ],
    location: { x: .585, y: .119 },
    angle: 180,
  },
  oakl: {
    name: "Oakland International Airport",
    links: [
      { station: "cols", time: 9, distance: 4.99 },
    ],
    location: { x: .457, y: .605 },
    angle: 45,
  },
  orin: {
    name: "Orinda",
    links: [
      { station: "rock", time: 6, distance: 7.07 },
      { station: "lafy", time: 4, distance: 6.05 },
    ],
    location: { x: .457, y: .246 },
    angle: 45,
  },
  pitt: {
    name: "Pittsburg / Bay Point",
    links: [
      { station: "pctr", time: 11, distance: 4.91 },
      { station: "ncon", time: 6, distance: 7.81 },
    ],
    location: { x: .648, y: .119 },
    angle: 180,
  },
  pctr: {
    name: "Pittsburg Center",
    links: [
      { station: "pitt", time: 11, distance: 4.91 },
      { station: "antc", time: 7, distance: 9.89 },
    ],
    location: { x: .713, y: .119 },
    angle: 180,
  },
  phil: {
    name: "Pleasant Hill / Contra Costa Centre",
    links: [
      { station: "conc", time: 5, distance: 6.52 },
      { station: "wcrk", time: 3, distance: 2.77 },
    ],
    location: { x: .517, y: .171 },
    angle: 45,
  },
  powl: {
    name: "Powell St.",
    links: [
      { station: "mont", time: 2, distance: .804 },
      { station: "civc", time: 1, distance: .749 },
    ],
    location: { x: .249, y: .497 },
    angle: 45,
  },
  rich: {
    name: "Richmond",
    links: [
      { station: "deln", time: 4, distance: 3.72 },
    ],
    location: { x: .266, y: .143 },
    angle: 135,
  },
  rock: {
    name: "Rockridge",
    links: [
      { station: "orin", time: 6, distance: 7.07 },
      { station: "mcar", time: 5, distance: 2.53 },
    ],
    location: { x: .432, y: .279 },
    angle: 45,
  },
  sbrn: {
    name: "San Bruno",
    links: [
      { station: "ssan", time: 3, distance: 3.92 },
      { station: "sfia", time: 3, distance: 3.55 },
      { station: "mlbr", time: 5, distance: 4.93 },
    ],
    location: { x: .297, y: .789 },
    angle: 135,
  },
  sfia: {
    name: "San Francisco International Airport",
    links: [
      { station: "mlbr", time: 4, distance: 2.70 },
      { station: "sbrn", time: 4, distance: 3.55 },
    ],
    location: { x: .364, y: .792 },
    angle: 180,
  },
  sanl: {
    name: "San Leandro",
    links: [
      { station: "bayf", time: 4, distance: 4.12 },
      { station: "cols", time: 4, distance: 4.76 },
    ],
    location: { x: .497, y: .563 },
    angle: 135,
  },
  shay: {
    name: "South Hayward",
    links: [
      { station: "hayw", time: 4, distance: 4.74 },
      { station: "ucty", time: 5, distance: 6.04 },
    ],
    location: { x: .596, y: .688 },
    angle: 135,
  },
  ssan: {
    name: "South San Francisco",
    links: [
      { station: "sbrn", time: 3, distance: 3.92 },
      { station: "colm", time: 3, distance: 3.03 },
    ],
    location: { x: .274, y: .759 },
    angle: 135,
  },
  ucty: {
    name: "Union City",
    links: [
      { station: "shay", time: 5, distance: 6.04 },
      { station: "frmt", time: 5, distance: 5.16 },
    ],
    location: { x: .629, y: .729 },
    angle: 135,
  },
  wcrk: {
    name: "Walnut Creek",
    links: [
      { station: "phil", time: 3, distance: 2.77 },
      { station: "lafy", time: 5, distance: 5.56 },
    ],
    location: { x: .497, y: .196 },
    angle: 45,
  },
  warm: {
    name: "Warm Springs",
    links: [
      { station: "mlpt", time: 8, distance: 11.10 },
      { station: "frmt", time: 6, distance: 7.49 },
    ],
    location: { x: .689, y: .831 },
    angle: 90,
  },
  wdub: {
    name: "West Dublin / Pleasanton",
    links: [
      { station: "dubl", time: 3, distance: 2.58 },
      { station: "cast", time: 10, distance: 13.56 },
    ],
    location: { x: .708, y: .606 },
    angle: 180,
  },
  woak: {
    name: "West Oakland",
    links: [
      { station: "12th", time: 4, distance: 2.54 },
      { station: "lake", time: 6, distance: 2.94 },
      { station: "embr", time: 7, distance: 9.49 },
    ],
    location: { x: .370, y: .439 },
    angle: 0,
  },
};

function verifyStations() {
  for (const [code, { name, links, angle }] of Object.entries(stations)) {
    if(angle % 45 !== 0) {
      console.log(`${name} (${code}) has invalid angle "${angle}"`);
    }
    
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

// verify station data consistency
verifyStations();
