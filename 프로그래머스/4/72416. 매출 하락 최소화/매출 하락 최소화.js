function solution(sales, links) {
    const n = sales.length;
    const childrens = Array.from({ length: n + 1 }, () => []);
    
    links.forEach(([a, b]) => {
        childrens[a].push(b);
    });
    
    const queue = [1];
    let head = 0;
    
    while (queue.length > head) {
        const current = queue[head++];
        for (const child of childrens[current]) {
            queue.push(child);
        }
    }
    
    const dp = Array.from({ length: n + 1 }, (_, i) => [Infinity, Infinity]);
    
    while (queue.length >= 1) {
        const v = queue.pop();
        if (!childrens[v].length) {
            dp[v][0] = 0;
            dp[v][1] = sales[v - 1];
            continue;
        }
        
        let sum = 0;
        let min = Infinity;
        
        for (const child of childrens[v]) {
            sum += Math.min(dp[child][0], dp[child][1]);
            min = Math.min(min, dp[child][1] - dp[child][0]);
        }
        
        dp[v][0] = sum + Math.max(0, min);
        dp[v][1] = sales[v - 1] + sum;
    }
    
    return Math.min(dp[1][0], dp[1][1]);
}