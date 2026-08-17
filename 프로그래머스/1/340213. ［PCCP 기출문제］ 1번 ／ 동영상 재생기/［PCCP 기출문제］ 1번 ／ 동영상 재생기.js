function convertToSeconds(time) {
    let [minutes, seconds] = time.split(":");
    return Number(minutes) * 60 + Number(seconds);
}

function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
}

function solution(video_len, pos, op_start, op_end, commands) {
    let videoLength = convertToSeconds(video_len);
    let currentPos = convertToSeconds(pos);
    let openingStart = convertToSeconds(op_start);
    let openingEnd = convertToSeconds(op_end);
    
    const skipOpening = () => {
        if (openingStart <= currentPos && currentPos <= openingEnd) {
            currentPos = openingEnd;
        }
    }
        
    for (const command of commands) {
        skipOpening();
        if (command === "next") {
            currentPos += 10;
        }
        if (command === "prev") {
            currentPos -= 10;
        }
        if (currentPos < 0) {
            currentPos = 0;
        }
        if (currentPos > videoLength) {
            currentPos = videoLength;
        }
        skipOpening();
    }
    return formatTime(currentPos);
}