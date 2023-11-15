const SPACE_LIST_JSON = '../assets/json/space_list.json';

/*
  Object to store all the states and their makerspaces
  Looks like:
  {
    [state_name]: [
      [
        [MAKERSPACE_NAME],
        [MAKERSPACE_URL]
      ],
    ],
  }
*/
let spaceList = {};

function getStateList() {
  fetch(SPACE_LIST_JSON)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      spaceList = data;
    })
    .catch((error) => console.log('fetching state list json', error));
}

function addEventsToUsMap() {
  const mySvg = document.getElementById('us-map');

  let svgPaths = mySvg.children;

  for (let i = 0; i < svgPaths.length; i++) {
    addStateMouseEvents(svgPaths[i]);
  }
}

function addStateMouseEvents(state) {
  // Get state svg.
  element = document.getElementById(state.id);

  // Show name on mouse hover.
  element.addEventListener('mouseover', function () {
    document.getElementById('page-header').textContent = state.id.replace('-', ' ').toUpperCase();
  });

  // Reset title if not.
  element.addEventListener('mouseout', function () {
    document.getElementById('page-header').textContent = 'PICK A STATE!';
  });

  // If clicked, show that state's makerspace list.
  element.addEventListener('click', function () {
    updateSpaceList(state.id);
    document.getElementById('list-title').scrollIntoView({ behavior: 'smooth' });
  });
}

function updateSpaceList(stateId) {
  const stateSpaces = spaceList[stateId];

  const listTitle = document.getElementById('list-title');
  listTitle.textContent = `${stateId.toUpperCase()} Makerspaces`;

  // Get the div to display makerspace list.
  const listContentDiv = document.getElementById('list-content');

  // Clear any lists currently being shown.
  while (listContentDiv.firstChild) {
    listContentDiv.removeChild(listContentDiv.firstChild);
  }

  // Create a table displaying all the makerspaces for the selected state.
  for (let i = 0; i < stateSpaces.length; i++) {
    const spaceName = stateSpaces[i][0];
    const spaceUrl = stateSpaces[i][1];

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('list-row');

    const colName = document.createElement('span');
    colName.classList.add('col-name');
    colName.textContent = spaceName;

    const colLink = document.createElement('a');
    colLink.classList.add('col-link');
    colLink.textContent = spaceUrl;
    colLink.setAttribute('href', spaceUrl);
    colLink.setAttribute('target', '_blank');

    rowDiv.appendChild(colName);
    rowDiv.appendChild(colLink);

    listContentDiv.appendChild(rowDiv);
  }
}

// Get the kits when the page loads.
window.addEventListener(
  'load',
  function (event) {
    getStateList();
    addEventsToUsMap();
  },
  false
);
