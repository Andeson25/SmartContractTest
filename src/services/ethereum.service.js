import {ReplaySubject} from 'rxjs';

import {isMetaMaskInstalled} from '../helpers/meta-mask.helper';

export class EthereumService {
    static TEST_VERSION = '0x3';
    static instance;
    onChainChanged = new ReplaySubject(1);

    constructor() {
        this.web3 = new Web3(ethereum);
        this.ethereum = ethereum;
        this.ethereum.on('chainChanged', chainId => {
            this.onChainChanged.next(chainId);
        });
        this.ethereum.request({method: 'eth_chainId'})
            .then(chainId => {
                this.onChainChanged.next(chainId);
            });
    }

    get isTestNetwork() {
        return this.ethereum.chainId === EthereumService.TEST_VERSION;
    }

    static getInstance() {
        if (isMetaMaskInstalled()) {
            if (!EthereumService.instance) {
                EthereumService.instance = new EthereumService();
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
