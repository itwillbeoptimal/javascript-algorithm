function solution(n, money) {
    const dp = Array(n + 1).fill(0);
    dp[0] = 1;
    
    for (const m of money) {
        for (let i = 0; i <= n; i++) {
            if (i - m < 0) continue;
            dp[i] += dp[i - m];
        }
    }

    return dp[n] % 1_000_000_007;
}