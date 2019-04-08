'use strict'

const Store = require('electron-store');

class MailStore extends Store {
    constructor(settings) {
        super(settings)

        // initialize with todos or empty array

        this.mails = this.get('mails') || [] //new
    }
    saveMails () {
        // save todos to JSON file
        this.set('mails', this.mails)
        // returning 'this' allows method chaining
        return this
      }
    getMails () {
        // set object's todos to todos in JSON file
        this.mails = this.get('mails') || []
    
        return this
      }
    addMail(mail) {
        this.mails = [...this.mails, mail]
        return this.saveMails()
    }
    cleanMails(){
      this.mails=[];
    }
}

module.exports = MailStore;