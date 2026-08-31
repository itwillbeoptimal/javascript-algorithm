function solution(schedules, timelogs, startday) {
    let answer = 0;
    for (let i = 0; i < schedules.length; i++) {
        let deadline = schedules[i] + 10;
        if (deadline % 100 > 59) {
            deadline += 40;
        }
        const isLate = timelogs[i].some((time, index) => {
            const day = startday + index;
            if (day % 7 === 6 || day % 7 === 0) {
                return false;
            }
            return time > deadline;
        });
        if (!isLate) answer++;
    }
    return answer;
}