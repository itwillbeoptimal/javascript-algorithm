function solution(n, lighthouse) {
    const graph = Array.from({ length: n + 1 },  () => []);
    lighthouse.forEach(([a, b]) => {
        graph[a].push(b);
        graph[b].push(a);
    });
    
    const parents = Array(n + 1).fill(0);
    const visited = Array(n + 1).fill(false);
    const queue = [1];
    visited[1] = true;
    let head = 0;
    
    while (queue.length > head) {
        const current = queue[head++];
        for (const node of graph[current]) {
            if (visited[node]) continue;
            visited[node] = true;
            parents[node] = current;
            queue.push(node);
        }
    }
    
    const dp = Array.from({ length: n + 1 }, () => [0, 1]);
    
    while (queue.length >= 1) {
        const v = queue.pop();
        const p = parents[v];
        
        dp[p][0] += dp[v][1];
        dp[p][1] += Math.min(dp[v][0], dp[v][1]);
    }
    
    return Math.min(dp[1][0], dp[1][1]);
}