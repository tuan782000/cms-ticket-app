
export interface TicketPack {
    maGoi: string
    docId:string
    maSuKien: string
    tenSuKien: string
    tenGoi: string
    ngayApDung: any
    ngayHetHan: any
    trangThai: boolean
    giaCombo?: {
        giaVe: number,
        soVe: number
    }
    giaVe: number
}
export class InfoTicketPack implements TicketPack {
    maGoi: string = ''
    docId: string = ''
    maSuKien: string = ''
    tenSuKien: string = ''
    tenGoi: string = ''
    ngayApDung: any
    ngayHetHan: any 
    trangThai: boolean = false
    giaCombo? = {
        soVe: 0 ,
        giaVe: 0
    }
    giaVe: number = 0

}
