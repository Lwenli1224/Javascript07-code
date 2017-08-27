let arr = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5}
    ];

// 2 移除

let newArr = arr.filter((item) => {
    return item.id !== 2; 
});
console.log(newArr);