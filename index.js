const SlackBot = require('slackbots');
const mtg = require('mtgsdk');


//token and name would be for your app/bot
const bot = new SlackBot({
  token: 'xoxb-299068034276-435357646869-YwbAoRd45uMbGwVGtn5st1hl',
  name: 'biggatherer'


});

//Start Handler// you need to change the room name in the post to channel
bot.on('start', ()=>{
    const params = {
      incon_emoji: ':smiley:'
    };

    bot.postMessageToChannel('biggatherer-noise', 'Magic is Coming', params);
});


//error Handler
bot.on('error', (err) => console.log(err));

//Message Handler, finds the data.type message passes that to a handle message function
bot.on('message', (data) => {
    if (data.type !== 'message') {
        return;
    }


    handleMessage(data.text);

});
// function looks to see if the message contains the word card and if so starts the split string function
function handleMessage(message) {
    if(message.includes(' card'))
    splitString(message);{



    }

}
// this splits string at the word card and then creates a new substring
function splitString(message) {
    let i = message.indexOf("card")+5;
    let res = message.substring(i);
// passes res to card return function
 cardReturn(res);

    console.log(i);
    console.log(message);
    console.log(res);


}

// you need to change the room name in the post to channel, res is received and sent to gatherer, json response is in console log under result
function cardReturn(res) {
    mtg.card.where({name: res})
        .then(results => {
            console.log(results);
            bot.postMessageToChannel('biggatherer-noise', results[0].imageUrl)
        })
}
















