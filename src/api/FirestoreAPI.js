import { firestore } from '../firebaseConfig'
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  setDoc,
  deleteDoc,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { toast } from 'react-toastify'

let postsRef = collection(firestore, 'posts')
let userRef = collection(firestore, 'users')

export const postResponse = (object) => {
  addDoc(postsRef, object)
    .then(() => {
      toast.success('Post has been added successfully')
    })
    .catch((err) => {
      console.log(err)
    })
}

// export const getPosts = (setAllStatus) => {
//   const q = query(postsRef, orderBy('timeStamp'));
//   onSnapshot(q, (response) => {
//     console.log(
//       response.docs.map((docs) => {
//         return { ...docs.data(), id: docs.id };
//       })
//     );
//   });
// };
export const getPosts = (setAllStatus) => {
  // const q = query(postsRef, orderBy('timeStamp'));
  onSnapshot(postsRef, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id }
      })
    )
  })
}

export const getAllUsers = (setAllUsers) => {
  onSnapshot(userRef, (response) => {
    setAllUsers(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id }
      })
    )
  })
}

export const getSingleStatus = (setAllStatus, id) => {
  const singlePostQuery = query(postsRef, where('userID', '==', id))
  onSnapshot(singlePostQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id }
      })
    )
  })
}

export const getSingleUser = (setCurrentUser, email) => {
  const singleUserQuery = query(userRef, where('email', '==', email))
  onSnapshot(singleUserQuery, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id }
      })[0]
    )
  })
}

export const postUserData = (object) => {
  addDoc(userRef, object)
    .then(() => {})
    .catch((err) => {
      console.log(err)
    })
}

export const getCurrentUser = (setCurrentUser) => {
  onSnapshot(userRef, (response) => {
    setCurrentUser(
      response.docs
        .map((docs) => {
          return { ...docs.data(), id: docs.id }
        })
        .filter((item) => {
          return item.email === localStorage.getItem('userEmail')
        })[0]
    )
  })
}

export const editProfile = (userID, payload) => {
  let userToEdit = doc(userRef, userID)

  updateDoc(userToEdit, payload)
    .then(() => {
      toast.success('Profile has been updated successfully')
    })
    .catch((err) => {
      console.log(err)
    })
}

export const updatePost = (id, status, postImage) => {
  let docToUpdate = doc(postsRef, id)
  try {
    updateDoc(docToUpdate, { status, postImage })
    toast.success('Post has been updated!')
  } catch (err) {
    console.log(err)
  }
}

export const deletePost = (id) => {
  let docToDelete = doc(postsRef, id)
  try {
    deleteDoc(docToDelete)
    toast.success('Post has been Deleted!')
  } catch (err) {
    console.log(err)
  }
}
