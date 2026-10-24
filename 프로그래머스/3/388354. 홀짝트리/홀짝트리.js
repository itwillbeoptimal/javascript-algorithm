function solution(nodes, edges) {
    const answer = [0, 0];
    
    const maxNode = nodes.reduce((a, b) => Math.max(a, b));
    const graph = Array.from({ length: maxNode + 1 }, () => []);
    const trees = [];
    
    for (const edge of edges) {
        const [a, b] = edge;
        
        graph[a].push(b);
        graph[b].push(a);
    }
    
    const visited = Array(maxNode + 1).fill(false);
    
    for (const node of nodes) {
        if (visited[node]) continue;
        
        const queue = [node];
        visited[node] = true;
        let head = 0;
        
        while (queue.length > head) {
            const current = queue[head++];
            for (const next of graph[current]) {
                if (!visited[next]) {
                    queue.push(next);
                    visited[next] = true;
                }
            }
        }
        
        trees.push(queue);
    }
    
    for (const tree of trees) {
        if (tree.length === 1) {
            answer[0]++;
            continue;
        }
        
        const isOddEven = Array(tree.length).fill(false);
        
        tree.forEach((node, i) => {
           if (node % 2 === (graph[node].length - 1) % 2) {
               isOddEven[i] = true;
           }
        });
        
        
        if (isOddEven.filter(e => !e).length === 1) {
            answer[0]++;
        } 
        if (isOddEven.filter(e => e).length === 1) {
            answer[1]++;
        }
    }
    
    return answer;
}