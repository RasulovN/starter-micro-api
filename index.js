const TelegramBot = require('node-telegram-bot-api');
// const dotenv = require('dotenv');
const { downLoaderMethod2 } = require('./request2')
const { storeDown } = require('./store')
// dotenv.config(); 

const token = '5546025702:AAHcJJd5opIqUggEpLAEWEmbyarhLuDEKxg'
const bot = new TelegramBot(token, {polling: true});
// const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

//Start
bot.on('message', async(msg) => {
  try {
    const chatId = msg.chat.id;
    let userMessage = msg.from.first_name
    if(msg.text == '/start'){
        await bot.sendMessage(chatId,  `Assalome alaykum ${userMessage} botimizga xush kelibsiz! \n Botga instagram video, rasm linkini yuboring `);
      } else if(msg.text == '/support'){
        await bot.sendMessage(chatId,  `Bot support @rasulov_n7 \n @the_rasulov1`);  
      } else if(msg.text == '/channel'){
        await bot.sendMessage(chatId,  `📢 Channel @rasulovdev \n https://t.me/general_ITblog`);
      }  
      // // Instagram 
      const getStoreUrl = await storeDown(msg.text)
      const getMediaUrl = await downLoaderMethod2(msg.text)
      if(getMediaUrl.data.Type == 'Post-Image'){
          await bot.sendMessage(chatId, 'link keldi')
          await bot.sendMessage(chatId, 'Media yuklanmoqda... ⬇️')
          await bot.sendPhoto(chatId, getMediaUrl.media, {
          caption: getMediaUrl.title  
        })
      }else if(getMediaUrl.data.Type == 'Post-Video'){
          await bot.sendMessage(chatId, 'link keldi')
          await bot.sendMessage(chatId, 'Video yuklanmoqda... ⬇️')
          await bot.sendVideo(chatId, getMediaUrl.media, {
          caption: getMediaUrl.title 
        })
      }else if(getMediaUrl.data.Type == 'Carousel'){
        await bot.sendMessage(chatId, 'link keldi')
        await bot.sendMessage(chatId, 'Media yuklanmoqda... ⬇️')
        for(i=0; i < getMediaUrl.data.media.length; i++){
          // console.log(getMediaUrl.data.media[i]);
          await bot.sendVideo(chatId, getMediaUrl.data.media[i])
          }
      } else if(getStoreUrl.data.Type === 'Story-Image'){
        await bot.sendMessage(chatId, 'Stories rasm yuklanmoqda... ⬇️')
        await bot.sendPhoto(chatId, getStoreUrl.media)
        // console.log(getStoreUrl.data);
      } else if(getStoreUrl.data.Type === 'Story-Video'){
        await bot.sendMessage(chatId, 'Stories video yuklanmoqda... ⬇️')
        await bot.sendVideo(chatId, getStoreUrl.media)
      }
      // console.log(getStoreUrl.data);

  } catch (error) {
    console.log(error+ '');
  }
});



// Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {

//   const chatId = msg.chat.id;
//   const resp = match[1]; 
//   bot.sendMessage(chatId, resp);
// });
console.log(`Running`);