function solution(e, starts) {
    const counts = Array(e + 1).fill(0);
    const best = Array(e + 1).fill(0);
    
    for (let i = 1; i <= e; i++) {
        for (let j = i; j <= e; j += i) {
            counts[j]++;
        }
    }
    
    best[e] = e;
    
    for (let i = e - 1; i >= 1; i--) {
        if (counts[i] >= counts[best[i + 1]]) {
            best[i] = i;
        } else {
            best[i] = best[i + 1];
        }
    }
    
    return starts.map(start => best[start]);
}