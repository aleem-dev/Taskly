import AsyncStorage from "@react-native-async-storage/async-storage";



export async function getFromStorage(key: string) {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export async function saveToStorage(key: string, data: object) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch {}
}
// import AsyncStorage from '@react-native-async-storage/async-storage'

//read data
// export const getData = async (key:string):Promise<any> => {
//     try {
//         const jsonValue = await AsyncStorage.getItem(key);
//         return jsonValue != null ? JSON.parse(jsonValue): null;
//     } catch (error) {
//         console.log(`Error retriving data: ${error}`)
//         return null
//     }
// }

// //storing data
// export const storeData = async (key:string, value:object) => {
//     try {
//         const jsonValue = JSON.stringify(value)
//         await AsyncStorage.setItem("key",jsonValue)
//     } catch (error) {
//         console.log(`setData local storage error: ${error}`)
//     }
// }

// //reading data using promis
// export const getdataPromis = (key:string) => {
//     return AsyncStorage.getItem(key)
//     .then((jsonValue)=>{
//         if(jsonValue !== null){
//             return JSON.parse(jsonValue)
//         }else{
//             return null
//         }
//     })
//     .catch(
//         (err)=>console.log(`error occured: ${err}`)
//     )
//     .finally(
//         ()=>console.log(`data request processed`)
//     )
// }