/**
 * The standard (2022-current) configuration of BART's revenue track segments
 * 
 * This is an object; the keys are the segment code used for this application.
 * (These codes are loosely based on the BART control radio talkgroups.)
 * The values are objects with these keys:
 * • `name`: string
 *      The segment's display name
 * • `stations`: array of strings
 *      A list of the stations found on this segment (order is not actually relevant)
 * • `connections`: object { [name]: string }
 *      The other segments this segment connects to, with segment code as keys
 *      and connecting station as values.
 *
 * Note that the H line is the automated guideway airtrain, and is largely 
 * ancillary to the system as a whole; it is included here for completeness.
 */
const SEGMENTS = {
  AL: {
    // These stations are all A line stations, but I split them off for convenience
    name: "Alameda/Livermore Interline",
    stations: ["lake", "ftvl", "cols", "sanl", "bayf"],
    connections: { K: "12th", M: "woak", A: "hayw", L: "cast" },
  },
  A: {
    // The original BART segment (opened 11 Sept 1972 frmt - mcar)
    // I assume A stands for Alameda
    name: "Alameda Line",
    stations: ["hayw", "shay", "ucty", "frmt"],
    connections: { AL: "bayf", S: "warm" },
  },
  C: {
    // Originally terminated at Concord and subsequently extended
    name: "Concord Line",
    stations: ["pitt", "ncon", "conc", "phil", "wcrk", "lafy", "orin", "rock"],
    connections: { K: "mcar", E: "pctr" },
  },
  K: {
    // It's the K line because it points in four directions like the capital letter K
    name: "Downtown Oakland Line (Oakland Wye)",
    stations: ["mcar", "19th", "12th"],
    connections: { R: "ashb", C: "rock", M: "woak", AL: "lake" },
  },
  L: {
    // Doesn't actually go to Livermore
    // freeway stations suck, downtown Livermore or bust
    name: "Livermore Line",
    stations: ["cast", "wdub", "dubl"],
    connections: { AL: "bayf" },
  },
  M: {
    // This name is pretty clear; this is currently the core of the system
    name: "Market/Mission Line",
    stations: ["woak", "embr", "mont", "powl", "civc", "16th", "24th", "glen", "balb", "daly"],
    connections: { K: "12th", AL: "lake", W: "colm" },
  },
  R: {
    // The only outer leg to never be extended, sorry Hercules :(
    // (not that sorry, you get WestCAT)
    name: "Richmond Line",
    stations: ["rich", "deln", "plza", "nbrk", "dbrk", "ashb"],
    connections: { K: "mcar" },
  },
  S: {
    // Built by BART to the Santa Clara county line and VTA thereafter
    // mlpt is a ridiculously pretty station
    name: "South Alameda/Santa Clara Line",
    stations: ["warm", "mlpt", "bery"],
    connections: { A: "frmt" },
  },
  W: {
    // I assume W is just M upside down?
    name: "San Mateo Line",
    stations: ["colm", "ssan", "sbrn", "mlbr"],
    connections: { M: "daly" },
  },
  Y: {
    // Y didn't they just extend the SFO airtrain to mlbr?
    name: "SFO Line",
    stations: ["sfia"],
    connections: { W: "sbrn", W: "mlbr" },
  },
  E: {
    // BART pretends this is a C line extension to not scare people from Brentwood
    // There's actually a secret transfer station from standard-gauge to BART gauge near pitt
    // but they don't publish times for that, and I haven't bothered to go wander out there
    // with a stopwatch
    name: "eBART Line",
    stations: ["antc", "pctr"],
    connections: { C: "pitt" },
  },
  H: {
    // H for Hegenberger, the street it runs along to the airport
    // Save $3.50 and take the 73 bus and ride this for free from oakl
    name: "OAK Airtrain",
    stations: ["oakl", "cols"],
  },
};

/**
 * The standard (2022-current) configuration of BART's revenue lines.
 * 
 * Each element of this array is an object with the following elements.
 * The first set of elements are statically configured:
 * • `name`: string
 *      The line's display name
 * • `color`: string
 *      The color used to draw and identify the line
 * • `segments`: array of strings
 *      The BART track segments this line operates on
 * • `headway`: number
 *      The line departs from its terminal every "headway" minutes
 * • `offset`: array of numbers
 *      The number of minutes past the hour the first line departs the terminals
 *      (The first element is the "normal" line direction, the second is the reverse run)
 * • `mcarDelay`: boolean
 *      Whether this line has to wait at mcar for the K line southbound tunnel to clear
 * 
 * These other elements are computed based on the first set:
 * • `stations`: array of strings
 *      The stations this line runs through in the "normal" direction
 * • `stationAxisLabels`: array of { label: string, milepoint: number }
 *      The x axis station names and their distance along the line
 * • `runs`: array of arrays of { station: string, milepoint: number, minute: number }
 *      A set of line runs to be charted; each inner array is a single run containing
 *      a set of points containing the station name, line distance, and total run duration so far
 * • `lineLength`: number
 *      Precomputed full line length in kilometers
 * • `lineDuration`: number
 *      Precomputed full line runtime in minutes
 *
 * And these match the other computed keys but in reverse
 * • `istations`: array of strings
 *      The stations this line runs through in the "reverse" direction
 * • `iruns`: array of arrays of { station: string, milepoint: number, minute: number }
 *      The same thing as `runs`, but in the reverse direction
 */
const LINES = [{
  name: "Yellow",
  color: "#ffe802",
  segments: ["C", "E", "K", "M", "W", "Y"],
  headway: 15,
  offset: [1, 11], // antc, sfia
  mcarDelay: false,
}, {
  name: "Red",
  color: "#ec1c23",
  segments: ["R", "K", "M", "W"],
  headway: 15,
  offset: [12, 3], // rich, mlbr
  mcarDelay: false,
}, {
  name: "Green",
  color: "#4db947",
  segments: ["M", "AL", "A", "S"],
  headway: 15,
  offset: [13, 3], // daly, bery
  mcarDelay: false,
}, {
  name: "Orange",
  color: "#f8a51a",
  segments: ["R", "K", "AL", "A", "S"],
  headway: 15,
  offset: [4, 0], // rich, bery
  mcarDelay: true,
}, {
  name: "Blue",
  color: "#01aced",
  segments: ["M", "AL", "L"],
  headway: 15,
  offset: [6, 14], // daly, dubl
  mcarDelay: false,
}, {
  name: "Beige",
  color: "#a8a280",
  segments: ["H"],
  headway: 9,
  offset: [0, 0],
  mcarDelay: false,
}];

const buildStations = (line) => {
  const lineStations = line.segments
                           .map(segment => SEGMENTS[segment])
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
    const { links = [] } = STATIONS[station];
    
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
  
  if(endpoint === undefined) {
    throw `A line endpoint was not found for ${line.name}! You may have tried to declare a short-turn line.`;
  }
  
  // output data structure
  const stations = [];
  
  // the endpoint comes first
  stations.push(endpoint);
  
  // declare it to be our initial node
  let currentNode = nodes[endpoint];
  // and remove it from the nodes collection
  delete nodes[endpoint];
  
  // while nodes reamin, find the next node and travel there
  while(Object.keys(nodes).length > 0) {
    const availables = currentNode.adjacent.filter(link => Object.keys(nodes).includes(link));
    const nextStation = availables[0];
    
    // put this as the next station in the list
    stations.push(nextStation);
    
    // set it as next node
    currentNode = nodes[nextStation];
    // and remove it from the nodes collection
    delete nodes[nextStation];
  }
  
  // normalize line direction
  const [firstStation, ] = stations;
  if(firstStation === "dubl" || firstStation === "bery") {
    // blue and green should start at daly even if they don't want to
    stations.reverse();
  }
  
  return stations;
};

/**
 * compute a baseline run based on the provided station list
 */
const computeBaselineRun = (stations, mcarDelay) => {
  const stationAxisLabels = [];
  const waypoints = [];
  
  let lineLength = 0;
  let lineDuration = 0;
  
  let prevStation = stations[0];
  
  // start at origin
  waypoints.push({
    station: prevStation,
    milepoint: 0,
    minute: 0,
  });
  
  stationAxisLabels.push({
    label: prevStation,
    milepoint: 0,
  });
  
  for(let i = 1; i < stations.length; i++) {
    const currentStation = stations[i];
    
    const { links } = STATIONS[prevStation];
    
    // get the link from the previous station to the current station
    const [{ time, distance }, ] = links.filter(({ station }) => station === currentStation);
    
    lineLength += distance;
    lineDuration += time;
    
    stationAxisLabels.push({
      label: currentStation,
      milepoint: lineLength,
    });
    
    // station arrival (for non-terminal stations)
    if(i < stations.length - 1) {
      // if this isn't the last station, subtract dwell time and add another point for that
      
      let dwell = .5;
      if(prevStation !== "19th" && currentStation === "mcar" && mcarDelay) {
        // this is the orange line, delay it by 3 minutes
        // (only valid southbound)
        
        // K line fourth bore _when_
        dwell = 3;
      }
    
      waypoints.push({
        station: currentStation,
        milepoint: lineLength,
        minute: lineDuration - dwell,
      });
    }
    
    // station departure (on schedule)
    // (or arrival for terminal stations)
    waypoints.push({
      station: currentStation,
      milepoint: lineLength,
      minute: lineDuration,
    });
    
    prevStation = currentStation;
  }
  
  return {
    waypoints,
    stationAxisLabels,
    lineLength,
    lineDuration,
  };
};

/**
 * find all the runs that show in the chart area
 * the lower bound is the earliest run that ends in the chart area
 *   • this is the run that starts after T-(lineDuration) minutes
 * the upper bound is the latest run that starts in the chart area
 *   • this is the run that starts before T+yAxisInMinutes minutes
 */
const computeRunStarts = (baseOffset, lineDuration, headway) => {
  const runStarts = [];
  
  // find the runs between T+0 and T+yAxisInMinutes
  for(let s = baseOffset; s < yAxisInMinutes; s += headway) {
    runStarts.push(s);
  }
  // find the runs between T+0 and T-(lineDuration)
  for(let s = baseOffset - headway; s > -lineDuration; s -= headway) {
    runStarts.push(s);
  }
  
  // for neatness, keep them in order
  runStarts.sort((a, b) => a - b);
  
  return runStarts;
};

const computeLine = line => {
  // build station list
  line.stations = buildStations(line);
  
  // clone stations and reverse
  line.istations = [...line.stations];
  line.istations.reverse();
  
  // compute "standard" direction data
  
  const {
    waypoints,
    stationAxisLabels,
    lineLength,
    lineDuration,
  } = computeBaselineRun(line.stations, line.mcarDelay);
  
  // stick computed labels, length, and duration in line data
  line.stationAxisLabels = stationAxisLabels;
  line.lineLength = lineLength;
  line.lineDuration = lineDuration;
  
  const runStarts = computeRunStarts(line.offset[0], lineDuration, line.headway);
  
  line.runs = runStarts.map(startPoint => {
    return waypoints.map(({ station, milepoint, minute }) => {
      return { station, milepoint, minute: minute + startPoint };
    });
  });
  
  // compute "reverse" direction data
  
  const {
    waypoints: iwaypoints,
    ...otherData
  } = computeBaselineRun(line.istations, line.mcarDelay);
  
  // verify that the line is the same length in each direction
  if(lineLength - otherData.lineLength > .01) {
    throw `Line lengths are inconsistent between baseline run directions; they differ by ${lineLength - otherData.lineLength} km`;
  }
  
  const irunStarts = computeRunStarts(line.offset[1], lineDuration, line.headway);

  line.iruns = irunStarts.map(startPoint => {
    return iwaypoints.map(({ station, milepoint, minute }) => {
      return { station, milepoint, minute: minute + startPoint };
    });
  });
};

function precomputeStations() {
  LINES.forEach(computeLine);
  
  Object.values(STATIONS).forEach(station => {
    station.lines = [];
  });
  
  LINES.forEach((line, index) => {
    line.stations.forEach(station => {
      const { visitingLines = 0 } = STATIONS[station];
      
      const visitedStation = STATIONS[station];
      visitedStation.visitingLines = visitingLines + 1;
      visitedStation.lines.push(index);
    });
  });
}
