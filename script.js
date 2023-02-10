"use strict";

const docBody = document.querySelector("body");
const reportTable = document.getElementById("report");
const dbCapacity = document.getElementById("db-capacity");
const onSince = document.getElementById("on-since");
const usersLogged = document.getElementById("users-logged");
const main = document.getElementById("main");
let intervalID;

const response_time = 50;


function renderReportTable(arr) {
    // reportTable.innerHTML = "";
    let temp = "";
    for (let index = 0; index < arr.length; index++) {
        //
        const element = arr[index];
        //
        temp += `
        <tr>
            <td>${index + 1}</td>
            <td>${element.date}</td>
            <td>${element.description}</td>
            <td>${element["measurement-value"]}</td>
        </tr>`;
        // temp += `
        // <tr>
        //     <td>${index + 1}</td>
        //     <td>${element.released}</td>
        //     <td>${element.name}</td>
        //     <td>${element.country}</td>
        // </tr>`;
    }
    if (arr.length < 6) {
        for (let index = 6 - arr.length; index < 6; index++) {
            temp += `<tr><td></td><td></td><td></td><td></td></tr>`;
        }
    }

    reportTable.innerHTML = temp;
}



async function fetchGetJSON(url) {
    try {
        const response = await fetch(url);
        if (response.status >= 400 && response.status < 600) {
            throw new Error("Bad response from server");
        }
        const data = await response.json();
        // console.log(data);

        if (data.length > 0) {
            renderReportTable(data);
        }
        if (response_time === 0) {
            fetchGetJSON("http://localhost:80/api/test");
        }

        //
    } catch (err) {
        console.log(err);
        //
    }
}
// ***** UNCOMMENT BEFORE DEPLOY
//
// if (response_time > 0){
//     intervalID = setInterval(fetchGetJSON, response_time, 'http://localhost:80/api/test');
// }
//
// *****************************

// fetchGetJSON("http://localhost:80/api/test");
// fetchGetJSON("https://www.anapioficeandfire.com/api/books");


// theme/colors switch

function colorSwitch(color) {
    main.className = "";
    main.classList.add(color);
}
function themeSwitch() {
    docBody.classList.toggle("dark-mode");
}

document.querySelector(".night").onclick = () => themeSwitch();
document.querySelector(".red-btn").onclick = () => colorSwitch("red");
document.querySelector(".blue-btn").onclick = () => colorSwitch("blue");
document.querySelector(".black-btn").onclick = () => colorSwitch("black");
