function solution(n) {
    const dp = Array(n + 1).fill(0);
    dp[0] = 1;
    dp[2] = 3;
    let sum = dp[0];
    
    for (let i = 4; i <= n; i += 2) {
        dp[i] = (dp[i - 2] * 3 + sum * 2) % 1_000_000_007;
        sum = (sum + dp[i - 2]) % 1_000_000_007;
    }
    
    return dp[n];
}