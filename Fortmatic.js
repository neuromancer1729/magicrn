import Web3 from "web3";
import Fortmatic from "fortmatic/RN"

//Todo replace with your test key here
const fmPhantom = new Fortmatic.Phantom('YOUR_TEST_KEY', 'rinkeby');
const provider = fmPhantom.getProvider();
global.web3 = new Web3(provider);
global.fmProvider = provider;
global.fmPhantom = fmPhantom;
