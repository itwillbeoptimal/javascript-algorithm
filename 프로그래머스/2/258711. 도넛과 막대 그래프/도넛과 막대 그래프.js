function solution(edges) {
    let n = 0;

    for (const [from, to] of edges) {
        if (from > n) n = from;
        if (to > n) n = to;
    }

    const outDegrees = new Int32Array(n + 1);
    const inDegrees = new Int32Array(n + 1);

    for (const [from, to] of edges) {
        outDegrees[from] += 1;
        inDegrees[to] += 1;
    }

    const answer = [0, 0, 0, 0];

    for (let i = 1; i <= n; i++) {
        if (inDegrees[i] === 0 && outDegrees[i] >= 2) answer[0] = i;
        else if (inDegrees[i] > 0 && outDegrees[i] === 0) answer[2] += 1;
        else if (outDegrees[i] === 2) answer[3] += 1;
    }

    answer[1] = outDegrees[answer[0]] - answer[2] - answer[3];

    return answer;
}