let requestURL = 'https://raw.githubusercontent.com/intern-jck/findMakerspace/main/assets/spaceList.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

var makerList = {};

request.onload = function () {
    makerList = request.response;
    console.log(makerList);
}

function getMakerList() {

}

function getStateElements() {
    let states = document.getElementsByClassName("state");
    return states;
}

var stateIdArr = [];

function addEvents() {

    let stateElements = getStateElements();

    for (let s in stateElements) {
        let stateId = stateElements[s].id;
        stateIdArr.push(stateId);

        if (stateId != undefined) {

            stateElements[s].addEventListener("mouseover", function () {
                document.getElementById("state-id").textContent = stateId.toUpperCase();
            });

            stateElements[s].addEventListener("mouseout", function () {
                document.getElementById("state-id").textContent = "PICK A STATE!";
            });

            stateElements[s].addEventListener("click", function () {
                console.log("Getting", stateId, "from", makerList);
                clearList();
                updateMakerList(stateId);
            });
        }
    }
    stateIdArr.sort();
}

function clearList() {
    let spaceList = document.getElementById("space-list");
    // console.log(spaceList.children.length, spaceList.children);

    if (spaceList.children.length >= 1) {
        // console.log("TOO MANY KIDS!");
        spaceList.removeChild(spaceList.children[0]);
    }

    // console.log(spaceList.children.length, spaceList.children);
}

function updateMakerList(id) {

    console.log(id);
    if (id.indexOf('-') >= 0) {
        arr = id.split("-");
        id = arr.join(" ");
    }

    console.log(id);
    document.getElementById("list-title").innerHTML = id.toUpperCase() + " Makerspaces";

    let table = document.createElement('table');
    table.setAttribute("class", "table table-responsive border border-4 border-primary");
    table.setAttribute("id", "link-table")

    let tableHead = document.createElement('thead');
    table.setAttribute("id", "link-head");
    tableHead.setAttribute("class", "justify-content-center");

    let tableBody = document.createElement('tbody');
    table.setAttribute("id", "link-body");
    tableHead.setAttribute("class", "justify-content-center");

    table.appendChild(tableHead);
    table.appendChild(tableBody);

    let tableRow = document.createElement('tr');

    let nameHeading = document.createElement('th');
    nameHeading.innerHTML = "NAME";
    nameHeading.setAttribute("class", "text-center");
    let linkHeading = document.createElement('th');
    linkHeading.innerHTML = "LINK";
    linkHeading.setAttribute("class", "text-center");

    tableRow.appendChild(nameHeading);
    tableRow.appendChild(linkHeading);
    tableHead.appendChild(tableRow);


    for (let link in makerList[id]) {
        // console.log(makerList[id][link][1]);

        var linkRow = document.createElement('tr');
        var linkName = document.createElement('td');
        linkName.innerHTML = makerList[id][link][0];

        var linkRowData = document.createElement('td');
        var linkAnchor = document.createElement('a');

        linkAnchor.innerHTML = makerList[id][link][1];
        linkAnchor.setAttribute("href", makerList[id][link]);
        linkAnchor.setAttribute("target", "_blank");
        // linkRowData.setAttribute("class", "text-center");

        linkRowData.appendChild(linkAnchor);
        linkRow.appendChild(linkName);
        linkRow.appendChild(linkRowData);
        tableBody.appendChild(linkRow);
    }

    document.getElementById("space-list").appendChild(table);


}


var statesSvg = document.getElementById("us-states");
statesSvg.onload = addEvents();


// Contact Form

function validateForm() {
    // var name = document.getElementById('name').value;
    // if (name == "") {
    //     document.querySelector('.status').innerHTML = "Name cannot be empty";
    //     return false;
    // }
    // var email = document.getElementById('email').value;
    // if (email == "") {
    //     document.querySelector('.status').innerHTML = "Email cannot be empty";
    //     return false;
    // } else {
    //     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     if (!re.test(email)) {
    //         document.querySelector('.status').innerHTML = "Email format invalid";
    //         return false;
    //     }
    // }
    // var subject = document.getElementById('subject').value;
    // if (subject == "") {
    //     document.querySelector('.status').innerHTML = "Subject cannot be empty";
    //     return false;
    // }
    // var message = document.getElementById('message').value;
    // if (message == "") {
    //     document.querySelector('.status').innerHTML = "Message cannot be empty";
    //     return false;
    // }
    // document.querySelector('.status').innerHTML = "Sending...";

    document.getElementById('status').innerHTML = "Sending...";
    formData = {
        'name': $('input[name=name]').val(),
        'email': $('input[name=email]').val(),
        'subject': $('input[name=subject]').val(),
        'message': $('textarea[name=message]').val()
    };


    $.ajax({
        url: "mail.php",
        type: "POST",
        data: formData,
        success: function (data, textStatus, jqXHR) {

            $('#status').text(data.message);
            if (data.code) //If mail was sent successfully, reset the form.
                $('#contact-form').closest('form').find("input[type=text], textarea").val("");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#status').text(jqXHR);
        }
    });
}