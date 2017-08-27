let arr = [
    {"id": 1},
    {"id": 2},
    {"id": 3},
    {"id": 4}
];

// id:2
// let newArr = arr.find((item) => {
//    return item.id === 4;
// });
// console.log(newArr);

// let newArr = arr.map((item) => {
//     if(item.id === 2) {
//         return {id:2, name: 'zhufeng'}
//     }
//     return item;
// });
// console.log(newArr);

let newArr = arr.filter((item) => {
    return  item.id > 2 
});
console.log(newArr);