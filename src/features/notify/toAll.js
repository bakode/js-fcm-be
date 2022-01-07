const fa = require('../../services/firebase')

module.exports = function(req, res) {
    const db = fa.firestore()

    db.collection('users')
        .get()
        .then(snapshot => {
            const messages = []

            snapshot.forEach((doc) => {
                messages.push({
                    data: {
                        user_id: doc.id
                    },
                    notification: { 
                        title: 'coba notify',
                        body: 'ini cuma coba kirim notifikasi'
                    },
                    token: doc.data().fcm_token,
                })
            })
            
            fa.messaging().sendAll(messages).then((response) => {
                res.send(response)
            })
            
        }).catch(reason => { res.send({ code: 400, message: reason }) })
}