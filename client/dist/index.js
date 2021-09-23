"use strict";
getAndRender();
function getAndRender() {
    fetch('http://localhost:3001/reports')
        .then(response => response.json())
        .then(renderReports);
}
;
function renderReports(data) {
    console.log(data);
    var reports = document.getElementById('reports');
    while (reports === null || reports === void 0 ? void 0 : reports.hasChildNodes()) {
        reports.removeChild(reports.childNodes[0]);
    }
    ;
    for (let i = 0; i < data.elements.length; i++) {
        let element = data.elements[i];
        if (element.state !== 'OPEN') {
            continue;
        }
        ;
        let report = document.createElement('DIV');
        report.className = 'report';
        let details = document.createElement('DIV');
        details.className = 'details';
        let id = document.createElement('DIV');
        id.innerHTML = `Id: ${element.payload.reportId}`;
        let type = document.createElement('DIV');
        type.innerHTML = `Type: ${element.payload.reportType}`;
        let state = document.createElement('DIV');
        state.innerHTML = `State: ${element.state}`;
        let message = document.createElement('DIV');
        message.innerHTML = `Message: ${element.payload.message}`;
        details.appendChild(id);
        details.appendChild(type);
        details.appendChild(state);
        details.appendChild(message);
        let blockButton = document.createElement('BUTTON');
        blockButton.innerHTML = 'Block';
        blockButton.className = 'block';
        blockButton.addEventListener('click', handleClick);
        let resolveButton = document.createElement('BUTTON');
        resolveButton.innerHTML = 'Resolve';
        resolveButton.className = 'resolve';
        resolveButton.addEventListener('click', handleClick);
        report.appendChild(details);
        report.appendChild(blockButton);
        report.appendChild(resolveButton);
        reports === null || reports === void 0 ? void 0 : reports.appendChild(report);
    }
    ;
}
;
function handleClick(event) {
    event.preventDefault();
    let reportId = event.target.parentNode.childNodes[0].childNodes[0].innerText.slice(4);
    console.log(reportId);
    fetch(`http://localhost:3001/reports/${reportId}`, {
        method: 'put',
        headers: { newState: event.target.innerText }
    })
        .then(getAndRender);
}
