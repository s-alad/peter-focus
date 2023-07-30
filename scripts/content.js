
const videos = [
    "https://tiktokextension.s3.amazonaws.com/peter.mp4",
    "https://tiktokextension.s3.amazonaws.com/subway.mp4",
    "https://tiktokextension.s3.amazonaws.com/sand.mp4",
    "https://tiktokextension.s3.amazonaws.com/press.mp4",
    "https://peter-focus.nyc3.cdn.digitaloceanspaces.com/minecraft.mp4",
    "https://peter-focus.nyc3.cdn.digitaloceanspaces.com/peter.mp4",
]

let selectedVideo = videos[Math.floor(Math.random() * videos.length)]

let distractionAlive = false

function randomVideo() {
    console.log("random video")
    //select new video but not the same as the current one
    videosWithoutCurrent = videos.filter(video => video !== selectedVideo)
    selectedVideo = videosWithoutCurrent[Math.floor(Math.random() * videosWithoutCurrent.length)]
}

setTimeout(randomVideo, 3*60*1000)
//document.getElementById("switchVideo").addEventListener("click", randomVideo);

function createDistraction () {
    const main = document.querySelector('body')
    // create a big loading indicator in the player space that can be toggled visible/invisible
    const loading = document.createElement('div')
    loading.id = "loading-indicator"
    loading.style.height = "100vh"
    loading.style.width = "30%"
    loading.style.position = "fixed"
    loading.style.bottom = "0"
    loading.style.right = "0"
    loading.style.zIndex = "1"
    loading.style.backgroundColor = "black"
    loading.style.color = "white"
    loading.style.display = "flex"
    loading.style.justifyContent = "center"
    loading.style.alignItems = "center"
    loading.style.fontSize = "3rem"
    loading.innerText = "Loading..."
    main.appendChild(loading)

    if (main) {
        const player = document.createElement('video')
        player.id = "ay-yo-mama"
        player.autoplay = true
        player.muted = true
        player.style.height = "100vh"
        player.style.width = "30%"
        player.style.objectFit = "cover"
        player.style.position = "fixed"
        player.style.bottom = "0"
        player.style.right = "0"
        player.style.zIndex = "99999999999"

        // get body and add 30% padding to the right
        const body = document.querySelector('body')
        body.style.paddingRight = "30%"
        body.style.overflowX = "scroll"

        let source = document.createElement('source')
        source.src = selectedVideo
        player.appendChild(source)
        main.appendChild(player)
        distractionAlive = true;
        setTimeout(() => {
            randomVideo()
        }, 720000)
    }

}

function disableDistraction () {
    document.getElementById('ay-yo-mama').remove()
    distractionAlive = false;
    
    const loading = document.getElementById('loading-indicator')
    loading.remove()

    const body = document.querySelector('body')
    body.style.paddingRight = "0%"
    body.style.overflowX = "scroll"
}

function isCSPHeader(head) {
    return (head === "CONTENT-SECURITY-POLICY") || (head === "X-WEBKIT-CSP")
}

// Danger: removes CSP from all pages
// chrome.webRequest.onHeadersReceived.addListener((details) => {
//     for (let i = 0; i < details.responseHeaders.length; i++) {
//         if (isCSPHeader(details.responseHeaders[i].name.toUpperCase())) {
//             const csp = "default-src * 'unsafe-inline' 'unsafe-eval' data: blowb:; "
//             details.responseHeaders[i].value = csp
//         }
//     }
// })

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.peter.enable) {
            // createDistraction();
            if (distractionAlive === false) {
                createDistraction();
            }
        } else if (request.peter.disable) {
            // disableDistraction();
            if (distractionAlive === true) {
                disableDistraction();
            }
        } else if (request.peter.switch) {
            // randomVideo();
            console.log("random video")
            randomVideo()
            disableDistraction();
            createDistraction();

        } else if (request.peter.switchToVideo) {
            // selectedVideo = videos[request.peter.videoId - 1]
            // disableDistraction();
            // createDistraction();
            console.log("switch to video")
            selectedVideo = videos[request.peter.videoId - 1]
            console.log(selectedVideo)
            if (distractionAlive === true) {
                disableDistraction();
                createDistraction();
            }
            if (distractionAlive === false) {
                console.log("!!!")
                createDistraction();
            }
        }
    } 
)

createDistraction()