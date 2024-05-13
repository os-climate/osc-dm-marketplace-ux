/*
 * Copyright 2024 Broda Group Software Inc.
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 *
 * Created:  2024-04-15 by eric.broda@brodagroupsoftware.com
 */



// All keys are lowercase
// export const KEY_ENTITYID = "entityinfo";
export const DOMAIN = "brodagroupsoftware-dataregistry";
export const KEY_ENTITYID = `${DOMAIN}:entityinfo`;

export const getLocalStorage = (key) => {
    console.log(`LOCALSTORAGE: START: Getting key:${key}`)
    let value = null;
    const stringValue = localStorage.getItem(key);
    console.log(stringValue)
    if (stringValue) {
        value = JSON.parse(stringValue);
    }
    console.log(value)
    console.log(`LOCALSTORAGE: DONE: Getting key:${key} value:${value}`)
    return value;
}

export const setLocalStorage = (key, value) => {
    console.log(`LOCALSTORAGE: START: Setting key:${key} value:${value}`)
    localStorage.setItem(key, JSON.stringify(value));
    console.log(`LOCALSTORAGE: DONE Setting key:${key} value:${value}`)
    return value
}

export const removeLocalStorage = (key) => {
    console.log(`LOCALSTORAGE: START: Removing key:${key}`)
    localStorage.removeItem(key);
    console.log(`LOCALSTORAGE: DONE Removing key:${key}`)
}

export const allLocalStorage = () => {
    console.log(`LOCALSTORAGE: START: Showing...`)
    let allData = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key)
      console.log(key)
      console.log(value)
      allData[key] = value;
    }
    console.log(`LOCALSTORAGE: DONE showing}`)
    return allData;
}

export const clearLocalStorage = () => {
    console.log('LOCALSTORAGE: START: Clearing all data');
    localStorage.clear();
    console.log('LOCALSTORAGE: DONE: All data cleared');
};
