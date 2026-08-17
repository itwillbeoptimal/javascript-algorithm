function solution(schedules, timelogs, startday) {
    let answer = 0;
    let n = schedules.length;
    
    for (let i = 0; i < n; i++) {
        const schedule = schedules[i];
        let deadline = schedule + 10;
        if (Number(String(deadline).slice(-2)) > 59) {
            deadline = deadline + 40;
        }
        let lateLogs = timelogs[i].filter((time, index) => {
            let today = startday + index;
            if (today % 7 === 6 || today % 7 === 0) return false;
            if (time <= deadline) return false;
            return true;
        });
        if (!lateLogs.length) answer += 1;
    }
    
    return answer;
}