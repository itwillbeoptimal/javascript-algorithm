function convertToSeconds(time) {
    const [minutes, seconds] = time.split(":");
    return Number(minutes) * 60 + Number(seconds);
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function solution(video_len, pos, op_start, op_end, commands) {
    const videoLength = convertToSeconds(video_len);
    let currentPos = convertToSeconds(pos);
    const openingStart = convertToSeconds(op_start);
    const openingEnd = convertToSeconds(op_end);

    const skipOpening = () => {
        if (openingStart <= currentPos && currentPos <= openingEnd) {
            currentPos = openingEnd;
        }
    };

    for (const command of commands) {
        skipOpening();

        if (command === "next") {
            currentPos += 10;
        } else if (command === "prev") {
            currentPos -= 10;
        }

        currentPos = Math.max(0, Math.min(currentPos, videoLength));

        skipOpening();
    }

    return formatTime(currentPos);
}