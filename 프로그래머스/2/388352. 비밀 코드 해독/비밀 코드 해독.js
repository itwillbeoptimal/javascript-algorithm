function solution(n, q, ans) {
    let answer = 0;
    
    for (let a = 1; a <= n - 4; a++) {
        for (let b = a + 1; b <= n - 3; b++) {
            for (let c = b + 1; c <= n - 2; c++) {
                for(let d = c + 1; d <= n - 1; d++) {
                    for (let e = d + 1; e <= n; e++) {
                        for (let i = 0; i < q.length; i++) {
                            if (q[i].filter((x) => {
                                if (x === a || x === b || x === c || x === d || x === e) {
                                    return true;
                                }
                                return false;
                            }).length !== ans[i]) {
                                break;
                            }
                            if (i === q.length - 1) {
                                answer += 1;
                            }
                        }
                    }
                }
            }
        }
    }
    
    return answer;
}
