import admin from "firebase-admin"

const PASSWORD_HASH = "75b3e611894f08465e75c585620b299585fe5cd20136b8890a600fd276434267"

async function sha256(input: string): Promise<string> {
    const encoder = new TextEncoder()
    const dataBuffer = encoder.encode(input)
    const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("")
    return hashHex
}

if (!admin.apps.length) {
    const cred = JSON.parse(process.env.FIREBASE_ADMIN_KEY!)
    admin.initializeApp({
        credential: admin.credential.cert(cred),
    })
}

const db = admin.firestore()

export async function POST(request: Request) {
    const headers = request.headers

    const password = headers.get("password")

    if (!password) {
        return Response.json({ message: "Missing password" })
    }

    const hash = await sha256(password)

    if (hash !== PASSWORD_HASH) {
        return Response.json({ message: "Wrong password" })
    }

    const requestJson = await request.json()

    const date = requestJson.dateString
    if (!date) {
        return Response.json({ message: "Missing date" })
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(date)) {
        return Response.json({ message: "Invalid date format" })
    }

    const mealType = requestJson.mealType
    if (!mealType) {
        return Response.json({ message: "Missing mealType" })
    }

    if (!["lunch", "dinner"].includes(mealType.toLowerCase())) {
        return Response.json({ message: "Invalid mealType" })
    }

    const url = requestJson.postUrl
    if (!url) {
        return Response.json({ message: "Missing postUrl" })
    }

    const urlObject = new URL(url)
    urlObject.search = ""
    const urlWithoutQuery = urlObject.toString()

    const reviewDocument = db.collection("reviews").doc(date)

    try {
        await reviewDocument.set(
            {
                [mealType.toLowerCase()]: urlWithoutQuery,
            },
            { merge: true }
        )
        return Response.json({ message: "Success" })
    } catch (error) {
        return Response.json({ message: error })
    }
}
