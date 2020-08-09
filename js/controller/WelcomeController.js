class WelcomeController {

    constructor(context) {
        this.context = context;
    }

    async login(login, password) {
        return new Promise((resolve, reject) => {
            let request = window.indexedDB.open("BidDB", 1);
            request.onsuccess = event => {
                let db = event.target.result;
                let transaction = db.transaction(["users"]);
                let objectStore = transaction.objectStore("users");
                objectStore.get(login).onsuccess = (event) => {
                    let user = event.target.result;
                    if (user && user.password === password) {
                        resolve();
                    } else {
                        return reject("invalid login or pass");
                    }
                }
            }
        });
    }

    register(login, password) {
        return new Promise((resolve, reject) => {
            let request = window.indexedDB.open("BidDB", 1);
            request.onsuccess = event => {
                let db = event.target.result;
                let transaction = db.transaction(["users"], "readwrite");
                let objectStore = transaction.objectStore("users");
                objectStore.get(login).onsuccess = event => {
                    if (!event.target.result) {
                        objectStore.add({login: login, password: password});
                        resolve();
                    } else {
                        reject("user already exists");
                    }
                }
            };
        });
    }
}