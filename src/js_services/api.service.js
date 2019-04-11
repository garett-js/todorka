// Initialize Firebase
const config = {
    apiKey: "AIzaSyCKzlysiUoYgurEnmLIXqHFKdw84GUOIfc",
    authDomain: "todorka-app.firebaseapp.com",
    databaseURL: "https://todorka-app.firebaseio.com",
    projectId: "todorka-app",
    storageBucket: "todorka-app.appspot.com",
    messagingSenderId: "851520491857"
}


class ApiService {
    constructor(config) {
        this.config = config
        this.init()
    }

    init() {
        // firebase.initializeApp(this.config)
    }

    // getValues() {
    //     const dbRef = firebase.database().ref()
    //     const usersRef = dbRef.child('pomidorkos')

    //     usersRef.on("child_added", snap => {
    //         return snap.val()
    //     })
    // }

    async getValues() {
        try {
            const request = new Request(`${this.config.databaseURL}/pomidorkos.json`, {
                method: 'get'
            })
            return useRequest(request)
        } catch (error) {
            console.error(error);
        }
    }
}

// private
async function useRequest(request) {
    const response = await fetch(request)
    return response.json()
}

export const apiService = new ApiService(config)

// class ApiService {
//     constructor(baseUrl) {
//         this.url = baseUrl
//     }

//     async createPost(post) {
//         try {
//             const request = new Request(`${this.url}/posts.json`, {
//                 method: 'post',
//                 body: JSON.stringify(post)
//             })
//             return useRequest(request)
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     async getPosts() {
//         try {
//             const request = new Request(`${this.url}/posts.json`, {
//                 method: 'get'
//             })
//             return useRequest(request)
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     async getPostById(id) {
//         try {
//             const request = new Request(`${this.url}/posts/${id}.json`, {
//                 method: 'get'
//             })
//             return useRequest(request)
//         } catch (error) {
//             console.error(error);
//         }
//     }
// }
// // private
// async function useRequest(request) {
//     const response = await fetch(request)
//     return response.json()
// }

// export const apiService = new ApiService('https://js-blog-40e62.firebaseio.com')