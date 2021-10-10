const socket = io('/')
const videoGrid = document.getElementById('video-grid')

const myVideo = document.createElement('video')
myVideo.muted = true

navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream => {

})

socket.emit("join-room", ROOM_ID, 10)

socket.on("user-connected", (userId) => {
    console.log(userId + " joined")
})