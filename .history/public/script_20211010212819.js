const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
  path: '/',
  port: 443,
  pingInterval: 5000,
})

//this is my video window
const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}

//The Navigator.mediaDevices read-only property returns a MediaDevices object, 
//which provides access to connected media input devices like cameras 
//and microphones, as well as screen sharing.
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  console.log(stream)
  addVideoStream(myVideo, stream)
  //Set listeners for peer events
  myPeer.on('call', call => {
    console.log("WOEJTY")
    //Answer the call, providing our mediaStream
    call.answer(stream)
    const video = document.createElement('video')
    // `stream` is the MediaStream of the remote peer.
    // Here you'd add it to an HTML video/canvas element.
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })

  socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)
  })
})

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  //create a window of video when a new user joins
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}

function addVideoStream(video, stream) {
  console.log(peers)
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}

//TO SETUP PEERJS READ THE BLOG https://blog.logrocket.com/getting-started-peerjs/