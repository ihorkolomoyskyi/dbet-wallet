/**
 * Created by user on 9/7/2017.
 */

export const
    /** Colors */
    COLOR_PRIMARY = '#191c24',
    COLOR_PRIMARY_DARK = '#10121e',
    COLOR_PRIMARY_LIGHT = '#A49FCF',
    COLOR_ACCENT = '#ff4e64',
    COLOR_ACCENT_DARK = '#932d3a',
    COLOR_RED = "#ff4e64",
    COLOR_WHITE = '#FFFFFF',
    COLOR_GREY = '#bdc1c2',
    COLOR_GREY_LIGHT = 'rgba(255, 255, 255, 0.2)',
    COLOR_WHITE_DARK = '#949494',
    COLOR_GOLD = '#f2b45c',
    COLOR_WHITE_LIGHT = 'rgba(255, 255, 255, 0.6)',
    COLOR_BLACK = '#000000',
    COLOR_TRANSPARENT = 'rgba(0, 0, 0, 0)',

    /** Wallet login types **/
    LOGIN_PRIVATE_KEY = 0,
    LOGIN_MNEMONIC = 1,

    ETHERSCAN_API_KEY = '42HUZCI372T65WZU4YES4VK4KX8VTFIHN5',

    PAGE_WALLET = '/wallet',
    PAGE_WALLET_LOGIN = '/wallet/login',
    PAGE_WALLET_LOGOUT = '/wallet/logout',
    PAGE_WALLET_NEW = '/wallet/new',

    ETHEREUM_NETWORK_LOADING = '0',
    ETHEREUM_NETWORK_MAINNET = '1',
    ETHEREUM_NETWORK_MORDEN = '2',
    ETHEREUM_NETWORK_ROPSTEN = '3',
    ETHEREUM_NETWORK_RINKEBY = '4',
    ETHEREUM_NETWORK_KOVAN = '42',
    ETHEREUM_NETWORK_LOCAL = '100',

    AVAILABLE_ETHEREUM_NETWORKS = [ETHEREUM_NETWORK_MAINNET],

    ETHEREUM_PROVIDER_MAINNET = 'https://mainnet.infura.io',
    ETHEREUM_PROVIDER_MORDEN = 'https://morden.infura.io',
    ETHEREUM_PROVIDER_ROPSTEN = 'https://ropsten.infura.io',
    ETHEREUM_PROVIDER_RINKEBY = 'https://rinkeby.infura.io',
    ETHEREUM_PROVIDER_KOVAN = 'https://kovan.infura.io',

    VIEW_WALLET = 0,
    VIEW_SEND = 1,

    KEY_DOT = 10,
    KEY_ZERO = 11,
    KEY_BACKSPACE = 12