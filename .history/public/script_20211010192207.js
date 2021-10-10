const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
    host:'/',
    port :'443'
})

const myVideo = document.createElement('video')
myVideo.muted

socket.emit("join-room", ROOM_ID, 10)

socket.on("user-connected", (userId) => {
    console.log(userId + " joined")
})