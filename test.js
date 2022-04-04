
const vocabulary = [
    "それな笑",
    "すごーい！",
    "ウケる爆笑",
    "わかる〜"
];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
let res_message = vocabulary[Math.random(vocabulary.length)];

console.log(getRandomInt(vocabulary.length));
