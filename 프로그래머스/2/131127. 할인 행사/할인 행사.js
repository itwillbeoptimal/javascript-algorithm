function solution(want, number, discount) {
    let result = 0;
    
    const cart = Array(want.length).fill(0);
    const wantMap = new Map();
    
    want.forEach((item, i) => wantMap.set(item, i));
    
    for (let i = 0; i < 10; i++) {
        let item = discount[i];
        if (wantMap.has(item)) {
            cart[wantMap.get(item)]++;
        }
    }

    if (cart.every((count, i) => count >= number[i])) {
        result++;
    }
    
    
    for (let i = 1; i <= discount.length - 10; i++) {
        if (wantMap.has(discount[i - 1])) {
            cart[wantMap.get(discount[i - 1])]--;
        }
        if (wantMap.has(discount[i + 9])) {
            cart[wantMap.get(discount[i + 9])]++;
        }
        if (cart.every((count, i) => count >= number[i])) {
            result++;
        }
    }

    return result;
}