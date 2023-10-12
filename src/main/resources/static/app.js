const stompClient = new StompJs.Client({
    // Stomp.js 사용하여 웹소켓 연결을 설정
    // brokerURL -> 웹소켓 서버의 주소와 엔드포인트를 지정
    brokerURL: 'ws://localhost:8003/gs-guide-websocket'
});

stompClient.onConnect = (frame) => {
    // 연결 성공할 때 실행되는 함수
    setConnected(true);
    console.log('Connected: ' + frame);
    // /topic/greetings 주제를 구독하여 새로운 메시지를 받을 때 실행할 함수를 등록
    stompClient.subscribe('/topic/greetings', (greeting) => {
        showGreeting(JSON.parse(greeting.body).content);
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    } else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    // 웹소켓 연결 활성화
    stompClient.activate();
}

function disconnect() {
    // 웹소켓 연결 비활성화
    stompClient.deactivate().then(() => {
        setConnected(false);
        console.log("Disconnected");
    });
}

function sendName() {
    stompClient.publish({
        destination: "/hello",
        body: JSON.stringify({'name': $("#name").val()})
    });
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $("#connect").click(() => connect());
    $("#disconnect").click(() => disconnect());
    $("#send").click(() => sendName());
});