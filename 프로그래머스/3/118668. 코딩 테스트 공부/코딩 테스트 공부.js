function solution(alp, cop, problems) {
    let alpMax = alp;
    let copMax = cop;
    problems.forEach((p) => {
        alpMax = Math.max(p[0], alpMax);
        copMax = Math.max(p[1], copMax)
    });
    
    const dp = Array.from({ length: alpMax + 1 }, () => Array(copMax + 1).fill(Infinity));
    dp[alp][cop] = 0;
    
    for (let i = alp; i <= alpMax; i++) {
        for (let j = cop; j <= copMax; j++) {
            if (i < alpMax) {
                dp[i + 1][j] = Math.min(dp[i + 1][j], dp[i][j] + 1);
            }
            if (j < copMax) {
                dp[i][j + 1] = Math.min(dp[i][j + 1], dp[i][j] + 1);
            }
            problems.forEach((problem) => {
                const [alpReq, copReq, alpRwd, copRwd, cost] = problem;
                if (i >= alpReq && j >= copReq) {
                    if (i + alpRwd > alpMax && j + copRwd > copMax) {
                        dp[alpMax][copMax] = Math.min(dp[alpMax][copMax], dp[i][j] + cost);  
                    } else if (i + alpRwd > alpMax) {
                        dp[alpMax][j + copRwd] = Math.min(dp[alpMax][j + copRwd], dp[i][j] + cost);
                    } else if (j + copRwd > copMax) {
                        dp[i + alpRwd][copMax] = Math.min(dp[i + alpRwd][copMax], dp[i][j] + cost);
                    } else {
                        dp[i + alpRwd][j + copRwd] = Math.min(dp[i + alpRwd][j + copRwd], dp[i][j] + cost);
                    }
                }
            });
        }
    }
    
    return dp[alpMax][copMax];
}