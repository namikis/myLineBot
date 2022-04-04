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
    new Promise(resolve => setTimeout(resolve, time));
    console.log("sleeping");
}

server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
    res.sendStatus(200);
    
    sleep(60000);

    let events_processed = [];

    req.body.events.forEach((event) => {
        if(event.type == "message" && event.message.type == "text"){
            if(event.message.text == "こんにちは"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "うるせえ！"
                }))
            }
        }
    })

    Promise.all(events_processed).then(
        (response) => {
            console.log(`${response.length} events processed`);
        }
    );
});
