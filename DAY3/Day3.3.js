function fibonacci(n) {
    let a = 0, b = 1;
    console.log("Fibonacci series:");
    for (let i = 0; i < n; i++) {
        console.log(a);
        let temp = a + b;
        a = b;
        b = temp;
    }
}
fibonacci(5);