import React, { Component } from 'react'
import {
    Card,
    CardText,
    MuiThemeProvider,
    CardActions,
    RaisedButton,
    CardHeader
} from 'material-ui'

import LoginInner from './LoginInner.jsx'

import ConfirmationDialog from '../Base/Dialogs/ConfirmationDialog'
import KeyHandler from '../Base/KeyHandler'
import Themes from './../Base/Themes'

import './login.css'

const constants = require('../Constants')
const ethers = require('ethers')
const Wallet = ethers.Wallet

const keyHandler = new KeyHandler()
const styles = require('../Base/styles').styles
const themes = new Themes()

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: constants.LOGIN_MNEMONIC,
            key: '',
            mnemonic: '',
            password: '',
            confirmPassword: '',
            dialogs: {
                error: {
                    open: false,
                    title: '',
                    message: ''
                }
            }
        }
    }

    signUp = () => {
        if (this.state.login === constants.LOGIN_PRIVATE_KEY)
            this.signUpPrivateKey()
        else if (this.state.login === constants.LOGIN_MNEMONIC)
            this.signUpMnemonic()
    }

    signUpPrivateKey = () => {
        try {
            const wallet = new Wallet(this.state.key)
            keyHandler.set(
                wallet.privateKey,
                wallet.address,
                this.state.password
            )
            this.props.history.push('/')
        } catch (e) {
            let text =
                "Invalid private key. Please make sure you're entering a valid private key"
            this.toggleErrorDialog(true, 'Error', text)
        }
    }

    signUpMnemonic = () => {
        try {
            const wallet = Wallet.fromMnemonic(this.state.mnemonic)
            keyHandler.set(
                wallet.privateKey,
                wallet.address,
                this.state.password
            )
            this.props.history.push('/')
        } catch (e) {
            let text =
                "Invalid mnemonic. Please make sure you're entering a valid mnemonic"
            this.toggleErrorDialog(true, 'Error', text)
        }
    }

    toggleErrorDialog = (open, title, message) => {
        let dialogs = this.state.dialogs
        dialogs.error = {
            open: open,
            title: title,
            message: message
        }
        this.setState({
            dialogs: dialogs
        })
    }

    isValidCredentials = () => {
        let isMnemonicCorrect =
            this.state.login === constants.LOGIN_MNEMONIC &&
            this.state.mnemonic.length > 0
        let isLoginCorrect =
            this.state.login === constants.LOGIN_PRIVATE_KEY &&
            this.state.key.length > 0
        let isPasswordCorrect =
            this.state.password.length >= 8 &&
            this.state.password === this.state.confirmPassword

        return (isLoginCorrect || isMnemonicCorrect) && isPasswordCorrect
    }

    onCloseErrorDialogListener = () => {
        this.toggleErrorDialog(false)
    }

    onKeyPressedListener = event => {
        if (event.key === 'Enter') {
            event.preventDefault()
            this.onSignUpListener()
        }
    }

    onLoginListener = () => {
        if (this.isValidCredentials()) {
            this.signUp()
        }
    }

    onLoginTypeChangedListener = (event, value) => {
        let key = this.state.key
        let mnemonic = this.state.mnemonic
        if (value === constants.LOGIN_MNEMONIC) {
            mnemonic = ''
        } else {
            key = ''
        }
        this.setState({
            key: key,
            mnemonic: mnemonic,
            login: value
        })
    }

    onSignUpListener = () => this.props.history.push('/new_wallet')

    onMnemonicChangedListener = (event, value) => {
        let state = this.state
        if (state.login === constants.LOGIN_PRIVATE_KEY) {
            state.key = value
        } else if (state.login === constants.LOGIN_MNEMONIC) {
            state.mnemonic = value
        }
        this.setState(state)
    }

    onPasswordChangedListener = (event, value) => {
        this.setState({ password: value })
    }

    onPasswordConfirmationChangedListener = (event, value) => {
        this.setState({ confirmPassword: value })
    }

    renderLoginButton = () => {
        return (
            <RaisedButton
                disabled={!this.isValidCredentials()}
                onClick={this.onLoginListener}
                label="Login"
                primary={true}
                className="button"
            />
        )
    }

    renderErrorDialog = () => {
        return (
            <ConfirmationDialog
                onClick={this.onCloseErrorDialogListener}
                onClose={this.onCloseErrorDialogListener}
                title={this.state.dialogs.error.title}
                message={this.state.dialogs.error.message}
                open={this.state.dialogs.error.open}
            />
        )
    }

    renderCreateAccount = () => {
        return (
            <div className="create-account">
                <RaisedButton
                    primary={true}
                    onClick={this.onSignUpListener}
                    label="Create a New Wallet"
                />
            </div>
        )
    }

    renderInnerLoginDialog = () => {
        return (
            <LoginInner
                mnemonic={this.state.mnemonic}
                key={this.state.key}
                loginType={this.state.login}
                password={this.state.password}
                confirmPassword={this.state.confirmPassword}
                onLoginTypeChangedListener={this.onLoginTypeChangedListener}
                onMnemonicChangedListener={this.onMnemonicChangedListener}
                onPasswordChangedListener={this.onPasswordChangedListener}
                onPasswordConfirmationChangedListener={
                    this.onPasswordConfirmationChangedListener
                }
                onKeyPressListener={this.onKeyPressedListener}
            />
        )
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={themes.getMainTheme()}>
                <main className="login">
                    <div className="login-wrapper">
                        {this.renderCreateAccount()}
                        <Card>
                            <CardHeader
                                className="login-title"
                                title="Already have a wallet?"
                            />
                            <CardText>{this.renderInnerLoginDialog()}</CardText>
                            <CardActions className="login-actions">
                                {this.renderLoginButton()}
                            </CardActions>
                            {this.renderErrorDialog()}
                        </Card>
                    </div>
                </main>
            </MuiThemeProvider>
        )
    }
}

export default Login