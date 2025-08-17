import * as admin from 'firebase-admin'

const adminCredentials = {
  projectId: process.env.PROJECT_ID,
  clientEmail: process.env.CLIENT_EMAIL,
  privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
}

console.log(adminCredentials)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(adminCredentials),
    // or use cert
  })
}

// export const adminDb = admin.firestore()
// export const adminAuth = admin.auth()

// export const adminRealTimeDb = getDatabase(adminDb.apps)
export const adminFB = admin
