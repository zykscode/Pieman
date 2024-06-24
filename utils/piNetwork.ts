// utils/piNetwork.ts

import PiNetwork from 'pi-backend';

const apiKey = 'tprjoipbmycfphacmeocljtu3pbwoghujrkqiifuim32ogjwiehy0w2pypy2efru'
const walletPrivateSeed = 'SCR6OLW5T5HUF6Y5Q52UZ7JH2LNJ4YQKNSHZZFS4WQXYYL22JG72LNET'

console.log(apiKey, walletPrivateSeed)
const pi = new PiNetwork(apiKey, walletPrivateSeed);

export default pi;
