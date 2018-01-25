import React, {Component} from 'react'
import {browserHistory} from 'react-router'

import {FlatButton, MuiThemeProvider, Snackbar, TextField} from 'material-ui'

import ConfirmationDialog from '../Base/Dialogs/ConfirmationDialog'
import NextDialog from './Dialogs/NextDialog'

import KeyHandler from '../Base/KeyHandler'
import Themes from './../Base/Themes'

import './newwallet.css'

const bip39 = require('bip39')
const constants = require('../Constants')
const ethers = require('ethers')
const keyHandler = new KeyHandler()
const styles = require('../Base/styles').styles
const themes = new Themes()
const Wallet = ethers.Wallet

class NewWallet extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mnemonic: '',
            dialogs: {
                error: {
                    open: false,
                    title: '',
                    message: ''
                },
                next: {
                    open: false
                }
            },
            snackbar: {
                open: false
            }
        }
    }

    componentWillMount = () => {
        this.actions().generateMnemonic()
    }

    actions = () => {
        const self = this
        return {
            generateMnemonic: () => {
                let mnemonic = bip39.generateMnemonic()
                self.setState({
                    mnemonic: mnemonic
                })
            }
        }
    }

    views = () => {
        const self = this
        return {
            top: () => {
                return <div className="col-10 col-md-8 mx-auto top">
                    <p className="pt-3">Create New Wallet</p>
                </div>
            },
            mnemonic: () => {
                return <div className="col-10 col-md-8 mx-auto mnemonic">
                    <div className="row">
                        <div className="col-12">
                            <p><b>This is your Passphrase:</b></p>
                            <TextField
                                id="input-mnemonic"
                                type="text"
                                fullWidth={true}
                                multiLine={true}
                                hintStyle={styles.textField.hintStyle}
                                inputStyle={styles.textField.inputStyle}
                                floatingLabelStyle={styles.textField.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.textField.floatingLabelFocusStyle}
                                underlineStyle={styles.textField.underlineStyle}
                                underlineFocusStyle={styles.textField.underlineStyle}
                                value={self.state.mnemonic}
                            />
                            <p>
                                Write down your passphrase and store it in a safe place before clicking "Next"
                            </p>
                        </div>
                    </div>
                </div>
            },
            generate: () => {
                return <div className="col-10 col-md-8 mx-auto generate"
                            onClick={self.actions().generateMnemonic}>
                    <p>Generate New Passphrase</p>
                </div>
            },
            back: () => {
                return <div className="col-6 offset-0 col-md-1 offset-md-5">
                    <FlatButton
                        label="Back"
                        className="float-right"
                        onClick={() => {
                            browserHistory.push(constants.PAGE_WALLET_LOGIN)
                        }}
                    />
                </div>
            },
            next: () => {
                return <div className="col-6 col-md-1">
                    <FlatButton
                        label="Next"
                        disabled={self.state.mnemonic.length == 0}
                        onClick={() => {
                            self.helpers().toggleNextDialog(true)
                        }}
                    />
                </div>
            },
            snackbar: () => {
                return <MuiThemeProvider muiTheme={themes.getSnackbar()}>
                    <Snackbar
                        message="Copied passphrase to clipboard"
                        open={self.state.snackbar.open}
                        autoHideDuration={3000}
                    />
                </MuiThemeProvider>
            }
        }
    }

    dialogs = () => {
        const self = this
        return {
            error: () => {
                return <ConfirmationDialog
                    onClick={() => {
                        self.helpers().toggleErrorDialog(false)
                    }}
                    onClose={() => {
                        self.helpers().toggleErrorDialog(false)
                    }}
                    title={self.state.dialogs.error.title}
                    message={self.state.dialogs.error.message}
                    open={self.state.dialogs.error.open}
                />
            },
            next: () => {
                return <NextDialog
                    onNext={(password) => {
                        const wallet = Wallet.fromMnemonic(self.state.mnemonic)
                        keyHandler.set(wallet.privateKey, wallet.address, password)
                        browserHistory.push(constants.PAGE_WALLET)
                    }}
                    toggleDialog={(open) => {
                        self.helpers().toggleNextDialog(open)
                    }}
                    mnemonic={self.state.mnemonic}
                    open={self.state.dialogs.next.open}
                />
            }
        }
    }

    helpers = () => {
        const self = this
        return {
            toggleErrorDialog: (open, title, message) => {
                let dialogs = self.state.dialogs
                dialogs.error = {
                    open: open,
                    title: title,
                    message: message
                }
                self.setState({
                    dialogs: dialogs
                })
            },
            toggleNextDialog: (open) => {
                let dialogs = self.state.dialogs
                dialogs.next.open = open
                self.helpers().toggleSnackbar(false)
                self.setState({
                    dialogs: dialogs
                })
            },
            toggleSnackbar: (open) => {
                let snackbar = self.state.snackbar
                snackbar.open = open
                self.setState({
                    snackbar: snackbar
                })
            }
        }
    }

    render() {
        const self = this
        return (
            <MuiThemeProvider muiTheme={themes.getAppBar()}>
                <div className="new-wallet">
                    <div className="container h-100">
                        <div className="row h-100">
                            <div className="col my-auto">
                                <div className="row mb-4">
                                    { self.views().top() }
                                    { self.views().mnemonic() }
                                    { self.views().generate() }
                                    <div className="col-12">
                                        <div className="row mt-4">
                                            { self.views().back() }
                                            { self.views().next() }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    { self.dialogs().error() }
                    { self.dialogs().next() }
                    { self.views().snackbar() }
                </div>
            </MuiThemeProvider>
        )
    }

}

export default NewWallet