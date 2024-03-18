export function saveData(dbName, data) {
    openDb(dbName, 1).then(db => {
        addData(db, dbName, data)
        closeDB(db)
    })
}

export function queryData(dbname, url) {
    return new Promise(resolve => {
        openDb(dbname, 1).then(db => {
            getData(db, dbname, url).then(result => resolve(result))
            closeDB(db)
        })
    })

}

/**
 * 连接数据库
 * @param dbName
 * @param version
 * @returns {Promise<unknown>}
 */
function openDb(dbName, version = 1) {
    return new Promise((resolve) => {
        const indexedDB =
            window.indexedDB ||
            window.mozIndexedDB ||
            window.webkitIndexedDB ||
            window.msIndexedDB;
        let db;
        // 打开数据库，若没有则会创建
        const request = indexedDB.open(dbName, version);
        // 数据库打开成功回调
        request.onsuccess = function (event) {
            db = event.target.result;
            resolve(db);
        };

        // 数据库打开失败的回调
        request.onerror = function (event) {
        };
        request.onupgradeneeded = function (event) {
            db = event.target.result; // 数据库对象
            // 创建存储库
            db.createObjectStore(dbName, {
                keyPath: "url", // 这是主键
            });
        }
    })
}

/**
 * 插入数据
 * @param db
 * @param dbname
 * @param data
 */
function addData(db, dbname, data) {

    const transaction = db.transaction([dbname], 'readwrite')
    // 获取对象存储区
    const objectStore = transaction.objectStore(dbname)
    objectStore.add(data);
}

/**
 * 查询数据
 * @param db
 * @param dbname
 * @param key
 * @returns {Promise<unknown>}
 */
function getData(db, dbname, url) {
    return new Promise((resolve) => {
        const request = db.transaction([dbname])
            .objectStore(dbname)
            .get(url); // 通过主键获取数据

        request.onsuccess = function (event) {
            resolve(request.result);
        };
    });
}

/**
 * 删除数据
 * @param db
 * @param dbname
 * @param url
 */
function deleteData(db, dbname, url) {
    const request = db
        .transaction([dbname], "readwrite")
        .objectStore(dbname)
        .delete(url);

    request.onsuccess = function () {
        console.log("数据删除成功");
    };

    request.onerror = function () {
        console.log("数据删除失败");
    };
}

/**
 * 关闭数据库
 * @param db
 */
function closeDB(db) {
    db.close();
}

/**
 * 删除数据库
 * @param dbName
 */
function deleteDb(dbName) {
    console.log(dbName);
    const deleteRequest = window.indexedDB.deleteDatabase(dbName);
    deleteRequest.onerror = function (event) {
        console.log("删除失败");
    };
    deleteRequest.onsuccess = function (event) {
        console.log("删除成功");
    };
}