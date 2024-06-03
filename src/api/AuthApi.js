import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth'
import { auth } from '../firebaseConfig'

export const LoginAPI = (email, password) => {
  try {
    let response = signInWithEmailAndPassword(auth, email, password)
    return response
  } catch (err) {
    return err
  }
}
export const RegisterAPI = async (email, password) => {
  try {
    let response = await createUserWithEmailAndPassword(auth, email, password)

    await sendEmailVerification(response.user)

    return response
  } catch (err) {
    return err
  }
}

export const GoogleSignInAPI = async () => {
  try {
    const googleProvider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, googleProvider)

    // After signing in, you can access the user's information
    const user = result.user

    // Ensure that the user's display name is set
    if (!user.displayName) {
      // You can set the display name to their email or any other default value
      await updateProfile(user, { displayName: user.email })
      user.displayName = user.email // Set the display name in the user object
    }

    return user
  } catch (err) {
    return err
  }
}
export const onLogout = () => {
  try {
    signOut(auth)
  } catch (err) {
    return err
  }
}
