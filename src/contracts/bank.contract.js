import {isMetaMaskInstalled} from '../helpers/meta-mask.helper';

export class BankContract {
    ADDRESS = '0x63E232aB0a6592819B8a7d6d2A8De3A785Dc2953';
    ABI = [
        {
            'inputs':          [],
            'stateMutability': 'nonpayable',
            'type':            'constructor'
        },
        {
            'inputs':          [
                {
                    'internalType': 'int256',
                    'name':         'amount',
                    'type':         'int256'
                }
            ],
            'name':            'deposit',
            'outputs':         [
                {
                    'internalType': 'int256',
                    'name':         '',
                    'type':         'int256'
                }
            ],
            'stateMutability': 'nonpayable',
            'type':            'function'
        },
        {
            'inputs':          [],
            'name':            'doubleBalance',
            'outputs':         [
                {
                    'internalType': 'int256',
                    'name':         '',
                    'type':         'int256'
                }
            ],
            'stateMutability': 'nonpayable',
            'type':            'function'
        },
        {
            'inputs':          [],
            'name':            'getBalance',
            'outputs':         [
                {
                    'internalType': 'int256',
                    'name':         '',
                    'type':         'int256'
                }
            ],
            'stateMutability': 'view',
            'type':            'function'
        },
        {
            'inputs':          [
                {
                    'internalType': 'int256',
                    'name':         'amount',
                    'type':         'int256'
                }
            ],
            'name':            'withdraw',
            'outputs':         [
                {
                    'internalType': 'int256',
                    'name':         '',
                    'type':         'int256'
                }
            ],
            'stateMutability': 'nonpayable',
            'type':            'function'
        }
    ];

    constructor(web3) {
        if (isMetaMaskInstalled()) {
            this.web3Contract = new web3.eth.Contract(this.ABI, this.ADDRESS);
            this.ABI
                .reduce((result, abi) => {
                    return abi.name ? result.concat(abi.name) : result;
                }, [])
                .forEach(methodName => {
                    Object.defineProperty(this, methodName, {
                        writable:     false,
                        configurable: false,
                        value:        (...args) => this.web3Contract.methods[methodName](...args)
                    });
                });
        } else {
            throw new Error('Meta Mask is not installed');
        }
    }
}
