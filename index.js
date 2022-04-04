const server = require("express")();
const line = require("@line/bot-sdk");

const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET
};

server.listen(process.env.PORT || 3000, () => {
    console.log("server listening...");
});

const bot = new line.Client(line_config);

function sleep(time){
    const startTime = new Date();
    console.log("sleeping");

    while(new Date - startTime < time);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const vocabulary = [
    "それな笑",
    "すごーい！",
    "ウケる爆笑",
    "わかる〜"
];


server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
    res.sendStatus(200);
    
    sleep(20000);

    let events_processed = [];

    req.body.events.forEach((event) => {
        if(event.type == "message" && event.message.type == "text"){
            // if(event.message.text == "こんにちは"){
            //     events_processed.push(bot.replyMessage(event.replyToken, {
            //         type: "text",
            //         text: "うるせえ！"
            //     }))
            // }
            let res_message = vocabulary[getRandomInt(vocabulary.length)];
            events_processed.push(bot.replyMessage(event.replyToken, {
                type: "text",
                text: res_message
            }))
        }
    })

    Promise.all(events_processed).then(
        (response) => {
            console.log(`${response.length} events processed`);
        }
    );
});
