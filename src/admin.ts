import admin from "firebase-admin"

if (!admin.apps.length) {
    const cred = JSON.parse(process.env.FIREBASE_ADMIN_KEY!)
    admin.initializeApp({
        credential: admin.credential.cert(cred),
    })
}

const db = admin.firestore()

export default db
