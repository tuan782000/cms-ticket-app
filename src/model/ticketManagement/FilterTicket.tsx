
export interface FilterTicket{
        congCheckInId?: number[] | string,
        tinhTrangSuDung?: string,
        maSuKien?: string,
        tinhTrangDoiSoat?: boolean | string,
        ngaySuDung?:  {
                startTime: any,
                endTime: any
        },


}