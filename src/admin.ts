import admin from "firebase-admin"

if (!admin.apps.length) {
    const cred = JSON.parse(process.env.FIREBASE_ADMIN_KEY!)
    admin.initializeApp({
        credential: admin.credential.cert(cred),
    })
}

const db = admin.firestore()

export default db

// DO NOT delete this.
// Although this is a POST route, Next.js
// quite literally "insists!" on caching this???
export const dynamic = "force-dynamic"
