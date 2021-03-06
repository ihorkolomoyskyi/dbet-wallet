import React from 'react'
import PendingTransactionListItem from './PendingTransactionListItem.jsx'
import { Card, CardText, CardHeader } from 'material-ui/Card'

// Parse the pending transactions into a list
function parsePendingTransactions(pendingTransactions) {
    let txs = []
    if (pendingTransactions) {
        for (const hash in pendingTransactions) {
            if (pendingTransactions.hasOwnProperty(hash)) {
                txs.push(pendingTransactions[hash])
            }
        }
    }
    return txs
}

// Widget Itself
export default function PendingTransactionList({ pendingTransactionsList }) {
    if (Object.keys(pendingTransactionsList).length < 1) {
        // Empty List
        return <span />
    } else {
        let pendingTransactions = parsePendingTransactions(
            pendingTransactionsList
        )
        return (
            <Card className="transactions">
                <CardHeader title="Pending Transactions" />
                <CardText>
                    {pendingTransactions.map(tx => (
                        <PendingTransactionListItem
                            transaction={tx}
                            key={tx.hash}
                        />
                    ))}
                </CardText>
            </Card>
        )
    }
}
