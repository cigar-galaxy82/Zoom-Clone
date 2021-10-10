const socket = io('/')
const videoGrid = document.getElementById('video-grid')

const myPeer = new Peer(undefined, {
    host: '/',
})

const myVideo = document.createElement('video')
myVideo.muted = true

navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream => {
    addVideoStream(myVideo, stream)

    socket.on("user-connected" , userId => {
        connectToNewUser(userId, stream)
    })
})

function connectToNewUser(userId, stream) {
    //const call = 
}

socket.emit("join-room", ROOM_ID, 10)

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener("loadedmetadata", () => {
        video.play()
    })
    videoGrid.append(video)
}