import { Console } from "console";
import { type } from "os";
import { db } from "../firebase/firebase";
import { TicketPack } from "../model/ticketPackageManagement/TicketPack";
import { FilterTicket } from "../model/ticketManagement/FilterTicket";
import { TicketList } from "../model/ticketManagement/TicketList";
import { STATUS_CODE } from "../util/config";
import firebase from "firebase";
export class BaseService {

    get(collectionName: string) {
        return db.collection(collectionName).get()
            .then((data) => {
                const lst: any = [];
                data.forEach((doc: any) => {
                    lst.push({ ...doc.data(), docId: doc.id })
                });
                return {
                    lst,
                    status: 200
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                return {
                    lst: [],
                    status: 500,
                }

            });

    }


    searchByTicketNumber(collectionName: string, soVe: string) {
        if (soVe === '') {
            return this.get(collectionName)
        }
        return db.collection(collectionName).where("soVe", ">=", soVe).where('soVe', "<=", soVe + '\uf8ff').get()
            .then((data) => {
                const lst: any = [];
                data.forEach((doc: any) => {
                    lst.push({ ...doc.data(), docId: doc.id })
                })
                return {
                    lst: lst,
                    status: 200
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                return {
                    lst: [],
                    status: 500
                }
            });
    }

    // filterTicKet(collectionName: string, values: FilterTicket) {
    //     console.log('params', values)
    //     const matchesCollection = db.collection(collectionName);
    //     let query: any = matchesCollection;
    //     let keys = Object.keys(values);
    //     for (let i = 0; i < keys.length; i++) {
    //         if (keys[i] === 'ngaySuDung') {
    //             let index = i;
    //             keys[index] = keys[0]
    //             keys[0] = keys[index]
    //             break;
    //         }
    //     }

    //     for (let i = 0; i < keys.length; i++) {
    //         // console.log('key', key)
    //         const value = values[keys[i] as keyof FilterTicket]
    //         if (value === "") {
    //             continue;
    //         } else if (keys[i] === 'congCheckInId') {
    //             query = query.where(keys[i], 'in', value)
    //         } else if (keys[i] === 'ngaySuDung') {
    //             const startTime = values.ngaySuDung?.startTime
    //             const endTime = values.ngaySuDung?.endTime
    //             // const modifiedStartTime = firebase.firestore.Timestamp.fromDate()
    //             // const modifiedEndTime = firebase.firestore.Timestamp.fromDate(new DataView(endTime))
    //             query = query.where('ngaySuDung', '>=', startTime)

    //             query = query.where('ngaySuDung', '<=', endTime)
    //         } else {
    //             query = query.where(keys[i], '==', value)
    //         }
    //     }

    //     return query.get().then((data: any) => {

    //         const lst: any = [];
    //         data.forEach((doc: any) => {
    //             lst.push({ ...doc.data(), docId: doc.id })
    //         })
    //         return {
    //             lst: lst,
    //             status: 200

    //         }
    //     }).catch((error: any) => {
    //         return {
    //             lst: [],
    //             status: 500
    //         }
    //         console.log(error)
    //     })




    // }



    update(collectionName: string, values: any, docId: string) {
        console.log('values dc update', values)
        return db.collection(collectionName).doc(docId).update({ ...values }).then(() => {
            return {
                status: 200,
                message: 'cập nhật thành công'
            }
        }).catch((error) => {
            return {
                status: 500
            }
        })
    }

    updateTicketPack({ docId, ...resParam }: TicketPack) {
        return this.update('danhSachGoi', resParam, docId);

    }
    updateTicketList({ docId, ...resParams }: TicketList) {
        return this.update('danhSahVe', resParams, docId)
    }

    generateDocId(length?: number) {
        let text = '';
        const POSSIBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

        if (length) {
            for (let i = 0; i < length; i++) {
                text += POSSIBLE.charAt(Math.floor(Math.random() * POSSIBLE.length))
            }
        } else {
            for (let i = 0; i < 24; i++) {
                text += POSSIBLE.charAt(Math.floor(Math.random() * POSSIBLE.length))
            }
        }

        return text
    }
    generateId(length?: number) {
        const ID = 'ALTA'
        let text = ''
        const POSSIBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        if (length) {
            for (let i = 0; i < length; i++) {
                text += POSSIBLE.charAt(Math.floor(Math.random() * POSSIBLE.length))
            }
        } else {
            for (let i = 0; i < 6; i++) {
                text += POSSIBLE.charAt(Math.floor(Math.random() * POSSIBLE.length))
            }
        }
        return ID + text
    }


    add(collectionName: string, values: any, keyName: string) {

        const docId = this.generateId() // document id
        const id = this.generateId()
        const maSuKien = 'CEC2021'
        const tenSuKien = 'hội nghị triển lãm tiêu dùng  2022'
        return db.collection(collectionName).doc(docId).set({ ...values, [keyName]: id, maSuKien, tenSuKien })
            .then(() => {
                return {
                    status: 200,
                    message: 'thêm thành công'
                }
            }).catch(error => {
                return {
                    status: 500,
                    message: 'fail'
                }
            })
    }

    addTicketPack(values: any) {
        return this.add('danhSachGoi', values, 'maGoi')
    }


}

export const baseService = new BaseService();