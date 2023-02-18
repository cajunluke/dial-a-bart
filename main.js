const mapCanvasSize = { width: 700, height: 557 };

const stringlineCanvasSize = { width: 1250, height: 650 };
const stringlineYHours = 1;
const yAxisInMinutes = stringlineYHours * 60;

const convertPoint = ({ x, y }) => {
  return {
    x: Math.round(x * mapCanvasSize.width), 
    y: Math.round(y * mapCanvasSize.height),
  };
};

const getTangent = degrees => {
  // for horizontal and vertical cases, we want a convenient, round number to check against
  switch(degrees) {
    case 0:
    case 180:
      // horizontal
      return 0;
    case 90:
    case 270:
      // vertical
      return Infinity;
    default:
      // otherwise, just use normal math
      return -Math.tan(degrees * Math.PI/180);
  }
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
      const { location, visitingLines, angle } = STATIONS[station];
      
      const point = convertPoint(location);
      
      if(visitingLines === 1) {
        // one line visiting means no offset needed
        return {
          angle,
          ...point,
        };
      }
      
      // get and increment visitedLines for this station
      const alreadyVisited = visitedLines[station] ?? 0;
      visitedLines[station] = alreadyVisited + 1;
      
      // offset line by how many have already been here

      const lineWidth = 3;
            
      const offset = lineWidth * (alreadyVisited - ((visitingLines - 1) / 2.));
      
      const xOffset = offset * Math.sin(angle / 180 * Math.PI);
      const yOffset = offset * Math.cos(angle / 180 * Math.PI);
      
      return {
        angle,
        x: point.x + xOffset,
        y: point.y + yOffset,
      };
    });
        
    for(let i=0; i < points.length; i++) {
      const { angle, x, y } = points[i];
      
      if(i === 0) {
        // first point is a moveTo
        context.moveTo(x, y);
        
        // continue to next point
        continue;
      }
      
      // for non-first points, we want to check against the previous point
      const prevPoint = points[i-1];
      
      // first check the angle
      if(angle === prevPoint.angle) {
        // if the angles are the same, just draw the line
        context.lineTo(x, y);
        
        // and go to next point
        continue;
      }
      
      // if the angles are not the same, draw a nice curve between the lines
      const tangent = getTangent(angle);
      const prevTangent = getTangent(prevPoint.angle);
            
      // compute the intersection point of the lines
      let iy,ix;
      if(tangent === 0 || tangent === Infinity) {
        // current is horizontal or vertical
        if(prevTangent === 0 || prevTangent === Infinity) {
          // both are horiz/vert (but not the same)
          
          if(tangent === 0) {
            // was vert, is horiz
            iy = y;
            ix = prevPoint.x;
          } else {
            // was horiz, is vert
            iy = prevPoint.y;
            ix = x;
          }
        } else {
          // was slopey, is horiz/vert
          
          if(tangent === 0) {
            // was slopey, is horiz
            iy = y;
            ix = (y - prevPoint.y)/prevTangent + prevPoint.x;
          } else {
            // was slopey, is vert
            iy = prevTangent * (x - prevPoint.x) + prevPoint.y;
            ix = x;
          }
        }
      } else if (prevTangent === 0 || prevTangent === Infinity) {
        // previous is horizontal or vertical, current is slopey
        
        if(prevTangent === 0) {
          // was horiz, is slopey
          iy = prevPoint.y;
          ix = (prevPoint.y - y)/tangent + x;
        } else {
          // was vert, is slopey
          iy = tangent * (prevPoint.x - x) + y;
          ix = prevPoint.x;
        }
      } else {
        // both are slopey
        
        // y - y0 = m0 * (x - x0)
        const y0 = y;
        const x0 = x;
        const m0 = tangent;
        
        // y - y1 = m1 * (x - x1)
        const y1 = prevPoint.y;
        const x1 = prevPoint.x;
        const m1 = prevTangent;
        
        // two slope-intercept equations artisanally solved simultaneously for your pleasure
        ix = (m1*x1 - m0*x0 + y0 - y1) / (m1 - m0);
        iy = (x0 - x1 + y1/m1 - y0/m0) * (m0 * m1) / (m0 - m1);
      }
      
      // a cubic Bézier can model a quadratic Bézier by setting both control points
      // two-thirds of the way between the endpoint and the quadratic's single point
      
      // 2/3rd of the way between previous and intercept
      const cp1 = { x: (ix + ix + prevPoint.x)/3, y: (iy + iy + prevPoint.y)/3, };
      // 2/3rd of the way between current and intercept
      const cp2 = { x: (ix + ix + x)/3, y: (iy + iy + y)/3, };
      
      // Cubic Bézier curve
      context.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, x, y);
    }
    
    context.stroke();
    context.closePath();
  });
};

const drawMap = (map, state) => {
  const context = map.getContext("2d");
  
  // clear all previous drawing
  context.clearRect(0, 0, mapCanvasSize.width, mapCanvasSize.height);
  
  // draw background
  LANDFORMS.forEach(({ color, path }) => {
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
  drawLines(context, LINES, state);
  
  // draw station circles
  // if no selected segment, highlight nothing
  const highlightStations = SEGMENTS[state.selectedSegment]?.stations ?? [];
  
  Object.entries(STATIONS).forEach(([code, { location, angle }]) => {
    const { x, y } = convertPoint(location);
    
    // draw line to station text along station angle
        
    context.beginPath();
    
    let lineLength = 10;
    
    context.strokeStyle = "#7d7d7d";
    context.lineWidth = 2;
    
    context.moveTo(x, y);
    
    let xOffset = lineLength * Math.sin(angle / 180 * Math.PI);
    let yOffset = lineLength * Math.cos(angle / 180 * Math.PI);
    
    context.lineTo(x + xOffset, y + yOffset);
    
    context.stroke();
    context.closePath();
    
    context.beginPath();
    
    // draw station circle (blue if highlighted)
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
    
    // draw station name
    context.beginPath();
    
    // extend "line" to reach text
    lineLength += 3;
    xOffset = lineLength * Math.sin(angle / 180 * Math.PI);
    yOffset = lineLength * Math.cos(angle / 180 * Math.PI);
    
    context.fillStyle = "black";
    context.lineWidth = 1;
    context.font = "11px sans-serif";
    context.fillText(code, x + xOffset, y + yOffset + 2);
    
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
  Object.keys(SEGMENTS).forEach(key => {
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
    header.colSpan = Object.keys(SEGMENTS).length;
    header.style = "background: white;";
    header.textContent = "Line Segments";
    topHeader.append(header);
  }
  thead.append(topHeader);

  // subheader, one for each segment
  const subheader = document.createElement("tr");
  
  Object.entries(SEGMENTS).forEach(([key, { name }]) => {
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
  
  LINES.forEach((line, index) => {
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
    
    Object.keys(SEGMENTS).forEach(segment => {
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

const drawStringline = (timings, stringlineHeader, stringline, state) => {
  const currentLineIndex = state.editingLine;
  
  if(currentLineIndex === undefined) {
    timings.style = "display: none;";
    
    return;
  }
  
  timings.style = "";
  
  const context = stringline.getContext("2d");
  
  context.clearRect(0, 0, stringlineCanvasSize.width, stringlineCanvasSize.height);
  
  const line = LINES[currentLineIndex];
    
  const terminals = [line.stations.at(0), line.stations.at(-1)]
    .map(station => STATIONS[station])
    .map(station => station.name)
    .sort()
    .join(" – ");
  
  console.table(terminals);
  
  const header = stringlineHeader.querySelectorAll("#lineID")[0];
  header.innerText = `${line.name} Line   (${terminals})`;
  stringlineHeader.style = `background: ${line.color}50;`;
  
  const minorGridColor = "#00000033";
  
  stringline.style = "";
  
  const chartTop = 20;
  const chartBottom = stringlineCanvasSize.height - 50;
  const chartLeft = 50;
  const chartRight = stringlineCanvasSize.width - 20;
  
  // y axis labels and grid lines
  const yAxisHeight = chartBottom - chartTop;
  const yAxisLabels = ["×:00"];
  for(let i = 0; i < stringlineYHours; i++) {
    ["×:45", "×:30", "×:15", "×:00"].forEach(label => yAxisLabels.push(label));
  }
  
  yAxisLabels.forEach((label, index) => {
    const yLoc = ((index/(yAxisLabels.length-1)) * yAxisHeight) + chartTop;
    
    // draw label
    context.beginPath();
    
    context.lineWidth = 1;
    context.font = "12px sans-serif";
    context.textAlign = "end";
    
    // get text height to shift text down to vertically center on point
    const textSize = context.measureText(label);
    const yOffset = Math.round(textSize.actualBoundingBoxAscent/2);
    
    context.fillText(label, Math.round(chartLeft - 5), Math.round(yLoc + yOffset));
    
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
  
  // x axis labels and grid lines
  const xAxisLength = chartRight - chartLeft;
  
  // pixels per kilometer
  const xResolution = xAxisLength / line.lineLength;
  // pixels per minute
  const yResolution = yAxisHeight / yAxisInMinutes;
  
  const visitedStationsByOtherLineIndex = [];
  for(let i = 0; i < LINES.length; i++) {
    // pre-fill array with objects
    visitedStationsByOtherLineIndex.push({});
  }
  
  line.runs[0].forEach(({ station, milepoint }) => {
    STATIONS[station].lines.forEach(lineIndex => {
      if(lineIndex !== currentLineIndex) {
        visitedStationsByOtherLineIndex[lineIndex][station] = milepoint;
      }
    });
  });
  
  visitedStationsByOtherLineIndex.forEach((otherStations, lineIndex) => {
    if(Object.keys(otherStations).length === 0) {
      // no stations to draw, skip
      return;
    }
    
    // draw other line's stringline
    const otherLine = LINES[lineIndex];
    
    context.beginPath();
    
    context.strokeStyle = otherLine.color;
    context.lineWidth = 2;
    
    otherLine.runs.forEach(waypoints => {
      // draw only waypoints that are on the same segment as the edited line
      const cowaypoints = waypoints.filter(({ station }) => otherStations.hasOwnProperty(station));
      
      // convert waypoints to coordinates
      const points = cowaypoints.map(({ station, minute }) => {
        // use editing line's milepoints
        const milepoint = otherStations[station];
        
        // convert milepoint to x
        const x = (milepoint * xResolution) + chartLeft;
        
        // convert minute to y
        // time goes up, but the origin is top-left
        const y = chartBottom - (minute * yResolution);
        
        return { x, y };
      });
      
      const [firstPoint, ...otherPoints] = points;
      
      context.moveTo(firstPoint.x, firstPoint.y);
      
      otherPoints.forEach(({ x, y }) => {
        context.lineTo(x, y);
      });
    });
    
    context.stroke();
    context.closePath();
  });
  
  // draw primary line's stringline
  context.beginPath();
  
  context.strokeStyle = line.color;
  context.lineWidth = 4;
  
  line.runs.forEach(waypoints => {
    // convert waypoints to coordinates
    const points = waypoints.map(({ milepoint, minute }) => {
      // convert milepoint to x
      const x = (milepoint * xResolution) + chartLeft;
      
      // convert minute to y
      // time goes up, but the origin is top-left
      const y = chartBottom - (minute * yResolution);
      
      return { x, y };
    });
    
    const [firstPoint, ...otherPoints] = points;
    
    context.moveTo(firstPoint.x, firstPoint.y);
    
    otherPoints.forEach(({ x, y }) => {
      context.lineTo(x, y);
    });
  });
  
  context.stroke();
  context.closePath();
  
  // we draw the stringlines outside the chart area, so cover that with white
  context.beginPath();
  context.fillStyle = "#ffffff";  
  context.fillRect(chartLeft - 1, 0, xAxisLength + 2, chartTop);
  context.fillRect(chartLeft - 1, chartBottom, xAxisLength + 2, stringlineCanvasSize.height - chartBottom);
  context.closePath();
  
  // draw x axis labels after we cover the chart overlap
  line.stationAxisLabels.forEach(({ label, milepoint }) => {
    const xLoc = (milepoint * xResolution) + chartLeft;
        
    // draw label
    context.beginPath();
        
    context.lineWidth = 1;
    context.fillStyle = "#000000";
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
  
  const timings = document.getElementById("timings");
  const stringlineHeader = document.getElementById("stringlineHeader");
  stringlineHeader.style = `width: ${stringlineCanvasSize.width}px;`;
  
  const stringline = document.getElementById("stringline");
  stringline.width = stringlineCanvasSize.width;
  stringline.height = stringlineCanvasSize.height;
  
  const editingLineChanged = () => {
    drawStringline(timings, stringlineHeader, stringline, state);
  };
  
  const linesArea = document.getElementById("lines");
  buildTable(linesArea, state, repaint, editingLineChanged);
  
  editingLineChanged();
  
  // draw in canvas
  repaint();
}

// examine the lines and build reasonable station lists
// NOTE: this won't work for DIY lines later, but it'll be fine now
precomputeStations();

// build the page and run!
main();
