import Bot from 'slackbots';
import _ from 'underscore';

export default class EliasBot {

    constructor(settings) {
        this.settings = settings;

        this.morningMessages = [
        'BOM DIA SENHORES! COMO ESTAMOS?',
        'BOM DIA! HOJE É DIA DE FAZER O CAFÉ PINGAR!',
        'BOM DIA? OTIMO DIA! HOJE EU SINTO QUE O CAFÉ VAI PINGAR!',
        'BOM DIA! JÁ FIZ TRÊS VENDAS HOJE! PAAAH!',
        'BOM DIA! HOJE É DIA DE ABRAÇAR UM DEV!'
        ]

        this.howAreYouMessages = [
        'SE VOCÊ ESTÁ BEM EU TAMBÉM ESTOU!',
        ]

        this.howAreWeMessages = [
        'SE VOCÊS ESTÃO BEM EU TAMBÉM ESTOU!',
        ]

        this.triggers = {
        'bom dia': this.morningMessages,
        'estou otimo': this.howAreYouMessages,
        'estou ótimo': this.howAreYouMessages,
        'estamos otimos': this.howAreWeMessages,
        'estamos ótimos': this.howAreWeMessages
        };
        this.bot = new Bot(this.settings);
    }

    run() {
        this.bot.on('start', this._onStart)
        this.bot.on('onMessage', this._onMessage);
    }

    _onStart() {
        this.postMessage(this.getRandomMessage(this.startMessages), 'random')
        console.log('> Elias has been started!')
    }

    _onMessage(data) {
        const eliasId = 'U10NFSVN3'
        if (data.type === 'message' && data.user !== eliasId) {
            if (this.isTriggerMessage(sanitize(data.text))) {
                this.postMessage(this.getRandomMessage(this.triggers[this.sanitize(data.text)]), 'random');
            }
        }
    }

    postMessage(message, channel) {
        this.bot.postMessageToChannel(channel, message, {
            as_user: '@eliascecon'
        });
    }

    isTriggerMessage(data) {
        return _.contains(_.keys(triggers), this.sanitize(data));
    }

    getRandomMessage(messages) {
        console.log('getrnam')
        return messages[parseInt(Math.random() * messages.length)];
    }

    sanitize(message) {
        return message.replace(new RegExp('[?.!]+'), '').toLowerCase();
    }
}