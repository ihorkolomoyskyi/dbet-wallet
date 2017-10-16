/**
 * Created by user on 9/7/2017.
 */

const constants = require('../Constants')

export const styles = {
    textField: {
        hintStyle: {
            color: constants.COLOR_WHITE_DARK,
        },
        inputStyle: {
            color: constants.COLOR_GREY,
            fontSize: '1.5rem',
            fontFamily: 'TradeGothicLt'
        },
        errorStyle: {
            color: constants.COLOR_ACCENT_DARK,
        },
        underlineStyle: {
            borderColor: constants.COLOR_GOLD,
        },
        floatingLabelStyle: {
            color: constants.COLOR_GOLD,
        },
        floatingLabelFocusStyle: {
            color: constants.COLOR_GOLD,
        }
    },
    dropdown: {
        underlineStyle: {
            borderColor: constants.COLOR_TRANSPARENT
        },
        labelStyle: {
            color: constants.COLOR_GREY,
            fontFamily: 'TradeGothicLt',
            fontSize: 17
        },
        selectedMenuItemStyle: {
            color: constants.COLOR_WHITE
        },
        menuItemStyle: {
            color: constants.COLOR_WHITE_DARK
        },
        listStyle: {
            backgroundColor: 'rgba(29, 32, 39, 0.85)'
        }
    },
    button: {
        label: {
            color: constants.COLOR_WHITE,
            whiteSpace: 'nowrap',
            overflow: 'hidden'
        }
    },
    menuItem: {
        color: constants.COLOR_GREY,
        fontFamily: 'TradeGothicLt',
        fontSize: 16,
        padding: '5px'
    }
}