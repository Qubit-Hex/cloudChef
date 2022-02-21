/**
 *
 *  @file: QrCode.js
 *
 *
 *  @purpose: This file contains the QrCode class. this class is used to generate qr codes
 *            this is a wrapper class to the qrcode.js library.
 *
 *
 */



let react = require('react');
let QR = require('qrcode.react');

export class QRCode extends react.Component {


    /**
     *
     *  @method create
     *
     *  @purpose: to generate a qr code from the google api and return the data
     *
     *
     */

    static create(data) {

            return (
                <QR value={data} includeMargin={true} size={400} />
            )
    }

    /**
     *
     *  @method: generateTableToken
     *
     *
     *  @purpose: inorder to generate a table token for the user to scan to place their order
     *            this method will generate a table token and return the data
     */

    static generateTableToken(table, customerToken, orderToken) {

            return (
                <QR value={table + "," + customerToken + "," + orderToken} includeMargin={true} size={400} />
            )
    }

    /**
     *
     *   @method: generateReviewToken
     *
     *
     *  @purpose : inorder to generate a review token for the user to rate their experience
     *
     */
    
    static generateReviewToken(customerToken, reviewToken) {

                return (
                    <QR value={customerToken + "," + reviewToken} includeMargin={true} size={400} />
                )
    }


    }


