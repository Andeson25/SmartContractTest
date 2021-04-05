import {useEffect, useMemo, useState} from 'react';

import {BankContract} from '../contracts/bank.contract';
import {EthereumService} from '../services/ehtreum.service';
import {isMetaMaskInstalled} from '../helpers/meta-mask.helper';

export function App() {
    const [account, setAccount] = useState();
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState(0);
    const hasMetaMask = useMemo(() => isMetaMaskInstalled(), []);
    const ethereumService = useMemo(
        () => {
            try {
                return EthereumService.getInstance();
            } catch (e) {
                console.error(e);
                return null;
            }
        },
        []
    );
    const bankContract = useMemo(
        () => {
            try {
                return ethereumService.contractFactory(BankContract);
            } catch (e) {
                console.error(e);
                return null;
            }
        },
        [ethereumService]
    );

    useEffect(() => {
        if (hasMetaMask) {
            ethereumService.requestAccounts()
                .then(([account]) => setAccount(account))
                .then(bankContract.getBalance().call)
                .then(balance => setBalance(balance))
                .then(() => setLoading(false))
                .catch(error => console.error(error));
        }
    }, []);

    const onWithDraw = () => {
        if (!amount) {
            return;
        }

        setLoading(true);

        bankContract.withdraw(amount)
            .send({from: account})
            .then(bankContract.getBalance().call)
            .then(balance => {
                setBalance(balance);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };

    const onDeposit = () => {
        if (!amount) {
            return;
        }

        setLoading(true);

        bankContract.deposit(amount)
            .send({from: account})
            .then(bankContract.getBalance().call)
            .then(balance => {
                setBalance(balance);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };

    if (!hasMetaMask) {
        return (
            <div className="container bg-light my-5 px-5 py-3 text-center">
                Please Install MetaMask
            </div>
        );
    }

    if (loading) {
        return (
            <div className="container bg-light my-5 px-5 py-3 text-center">
                Loading...
            </div>
        );
    }

    return (
        <form className="container bg-light my-5 px-5 py-3">
            <div className="row">
                <p className="m-0 col-12 text-center">Account address: {account}</p>
                <p className="m-0 col-12 text-center">Bank Balance: {balance}</p>
            </div>
            <div className="row">
                <div className="col form-group">
                    <label>Amount</label>
                    <input onChange={e => setAmount(Number(e.target.value))}
                           name="amount"
                           type="number"
                           className="form-control"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col form-group text-center">
                    <button
                        onClick={onWithDraw}
                        type="button"
                        className="btn btn-secondary mx-2">
                        WITHDRAW
                    </button>
                    <button
                        onClick={onDeposit}
                        type="button"
                        className="btn btn-secondary mx-2">
                        DEPOSIT
                    </button>
                </div>
            </div>
        </form>
    );
}
