// const socket = io('http://192.168.0.105:3000');
const socket = io(`${window.location.host}`);

socket.on('welcome', (dataFromServer) => {
    console.log(dataFromServer);
});

if (
    window.location.href ===
    `${window.location.protocol}//${window.location.host}/monitoring`
) {
    socket.on('ping', (dataFromServer) => {
        console.log(dataFromServer);
        window.location.reload();
    });
}
