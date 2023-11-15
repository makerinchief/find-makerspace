const SPACE_LIST_JSON = 'https://raw.githubusercontent.com/makerinchief/jsons/main/makerspace_list.json';

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
  // const usMapSvg = document.getElementById('us-map');
  // const svgPaths = usMapSvg.children;

  const svgPaths = document.getElementById('us-map').children;

  for (let i = 0; i < svgPaths.length; i++) {
    addStateSvgMouseEvents(svgPaths[i]);
  }
}

function addStateSvgMouseEvents(state) {
  // Get state svg.
  const stateSvg = document.getElementById(state.id);

  // Show name on mouse hover.
  stateSvg.addEventListener('mouseover', function () {
    document.getElementById('header-title').textContent = state.id.replace('-', ' ').toUpperCase();
  });

  // Reset title if not.
  stateSvg.addEventListener('mouseout', function () {
    document.getElementById('header-title').textContent = 'PICK A STATE!';
  });

  // If clicked, show the state's makerspace list.
  stateSvg.addEventListener('click', function () {
    updateSpaceList(state.id);
    document.getElementById('list-title').scrollIntoView();
  });
}

// Re-renders the list of makerspaces for given state.
function updateSpaceList(stateId) {
  // Get the spaces.
  const stateSpaces = spaceList[stateId];

  const spaceListDiv = document.getElementById('space-list-div');
  if (!spaceListDiv.classList.contains('active')) {
    spaceListDiv.classList.add('active');
  }

  // Get the list div and make a new title.
  const listTitle = document.getElementById('list-title');
  listTitle.textContent = `${stateId.toUpperCase()} Makerspaces`;

  // Get the div to display makerspace list.
  const listContentDiv = document.getElementById('list-content');

  // Clear any lists currently being shown.
  while (listContentDiv.firstChild) {
    listContentDiv.removeChild(listContentDiv.firstChild);
  }

  // Create a list for the spaces.
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

//Show list of states on button click
function showStateList() {
  const stateListDiv = document.getElementById('state-list-div');
  // Make sure to clear out anything in the div before adding to it.
  while (stateListDiv.firstChild) {
    stateListDiv.removeChild(stateListDiv.lastChild);
  }
  stateListDiv.classList.toggle('active');

  for (let state in spaceList) {
    const stateNameButton = document.createElement('button');
    stateNameButton.classList = 'state-list-button';
    stateNameButton.textContent = state;

    stateNameButton.onclick = (event) => {
      event.preventDefault();
      stateListDiv.classList.remove('active');
      updateSpaceList(state);
      document.getElementById('list-title').scrollIntoView();
      console.log(state);
    };

    stateListDiv.append(stateNameButton);
  }
}

// When page first loads.
window.addEventListener(
  'load',
  function (event) {
    getStateList();
    addEventsToUsMap();
  },
  false
);
