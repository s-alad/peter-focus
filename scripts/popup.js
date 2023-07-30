function enableGriffin() {
    chrome.tabs.query({}, tabs => {
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, {peter: {enable: true}});
        });
    })
}
function disableGriffin() {
    chrome.tabs.query({}, tabs => {
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, {peter: {disable: true}});
        });
    });
}
function switchGriffin() {
    chrome.tabs.query({}, tabs => {
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, {peter: {switch: true}});
        });
    });
}

function switchGriffinToVideo(videoId) {
    chrome.tabs.query({}, tabs => {
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, {peter: {switchToVideo: true, videoId: videoId}});
        });
    });
}

document.getElementById("enableGriffinBtn").addEventListener("click", enableGriffin);
document.getElementById("disableGriffinBtn").addEventListener("click", disableGriffin);
document.getElementById("switchGriffinBtn").addEventListener("click", switchGriffin);

document.getElementById("tv").addEventListener("click", () => switchGriffinToVideo(6));
document.getElementById("subway").addEventListener("click", () => switchGriffinToVideo(2));
document.getElementById("sand").addEventListener("click", () => switchGriffinToVideo(3));
document.getElementById("minecraft").addEventListener("click", () => switchGriffinToVideo(5));
document.getElementById("hydraulic").addEventListener("click", () => switchGriffinToVideo(4));
document.getElementById("purple").addEventListener("click", () => switchGriffinToVideo(1));
