import {isMetaMaskInstalled} from '../helpers/meta-mask.helper';

export class EthereumService {
    static instance;

    constructor(metaMaskProvider) {
        this.web3 = new Web3(metaMaskProvider);
        this.ethereum = metaMaskProvider;
    }

    static getInstance() {
        if (isMetaMaskInstalled()) {
            if (!EthereumService.instance) {
                EthereumService.instance = new EthereumService(ethereum);
            }
            return EthereumService.instance;
        } else {
            throw new Error('Meta Mask is not installed');
        }
    }

    requestAccounts() {
        return this.ethereum.request({method: 'eth_requestAccounts'});
    }

    contractFactory(contractConstructor) {
        return new contractConstructor(this.web3);
    };
}
