import { VoucherifyServerSide } from '@voucherify/sdk'

const  voucherifyClient = VoucherifyServerSide({
    applicationId: '7cf1fb25-a5bf-44e7-9113-cb05e738526a',
    secretKey: '52d01ef5-026d-4308-8ccb-2e143209d619',
    apiUrl: 'https://api.voucherify.io', 
})

export default voucherifyClient