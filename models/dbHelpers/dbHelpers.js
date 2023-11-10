const dbConnector = require("../dbConnect/db");

const addNewUser = async (user) => {

  try {
    const res = await dbConnector.query(`INSERT INTO KHACH_HANG(TAI_KHOAN,MAT_KHAU,TEN_KH,EMAIL,SDT) VALUES ( '${user.username}',
     '${user.password}',  '${user.name}',  '${user.email}','${user.phoneNumber}')`);
    return res.rows
  }
  catch (err) {
    console.log(err)
  }


  // console.log(user);
  // await dbConnector.connect().query(`INSERT INTO KHACH_HANG(TAI_KHOAN,MAT_KHAU,TEN_KH,EMAIL,SDT) VALUES ( '${user.username}',
  // '${user.password}',  '${user.name}',  '${user.email}','${user.phoneNumber}')`, (err, results) => {
  //     if (err) {
  //         console.log(err)
  //     }
  //     // if(results.rows.length == 0)
  //     // {
  //     //   response.send({exist: false })
  //     // }
  //     else {
  //         console.log(results)
  //         return results
  //     }

  // })
};

const userAuthentication = async (user) => {

  try {
    const res = await dbConnector.query(`SELECT * FROM KHACH_HANG WHERE TAI_KHOAN='${user.username}'`);
    return res
  }
  catch (err) {
    return err.message
  }
};

const adminAuthentication = async (user) => {
  try {
    const res = await dbConnector.query(`SELECT * FROM NGUOI_BAN WHERE TAI_KHOAN='${user.username}'`);
    return res
  }
  catch (err) {
    return err.message
  }


};
const getTodayFood = async () => {
  try {
    const res = await dbConnector.query(`SELECT * FROM THUC_AN_TRONG_KHO TA, MON_AN MA WHERE TA.MA_MON_AN=MA.MA_MON_AN and so_luong > 0`);
    return res.rows;
  }
  catch (err) {
    return err;
  }
};

const getFoodById = async (id) => {
  try {
    const resFoods = await dbConnector.query(`SELECT * FROM THUC_AN_TRONG_KHO TA, MON_AN MA WHERE TA.MA_MON_AN=MA.MA_MON_AN AND TA.MA_MON_AN='${id}'`);
    const resProduct = await dbConnector.query(`select slh.ma_mat_hang, slh.so_luong, mh.ten_mat_hang, slh.gia_ban_ra, mh.img_url from sl_hang_canteen slh, mat_hang mh where slh.ma_mat_hang = mh.ma_mat_hang and slh.ma_mat_hang = '${id}'
    `)
    if(resFoods.rows){
      if (resFoods.rows.length == 0) {
        return resProduct
      }
    }
    return resFoods;
  }
  catch (err) {
    return err;
  }
};


const getUserInfo = async (id) => {
  try {
    const res = await dbConnector.query(`SELECT * FROM KHACH_HANG WHERE id='${id}'`);
    return res;
  }
  catch (err) {
    return err;
  }
};

const getCurrentStorage = async () => {
  try {
    const res = await dbConnector.query(`SELECT sl.ma_mat_hang,mh.ten_mat_hang,sl.so_luong,sl.gia  FROM sl_hang_trong_kho sl, mat_hang mh where mh.ma_mat_hang=sl.ma_mat_hang and so_luong>0`);
    return res;
  }
  catch (err) {
    return err.message;
  }
};

const getCurrentCanteen = async () => {
  try {
    const res = await dbConnector.query(`SELECT sl.ma_mat_hang,mh.ten_mat_hang,sl.so_luong,sl.gia,sl.gia_ban_ra  FROM sl_hang_canteen sl, mat_hang mh where mh.ma_mat_hang=sl.ma_mat_hang and so_luong>0`);
    return res;
  }
  catch (err) {
    return err;
  }
};

// const getFoodInfo =async (foodID) => {
//   try{
//     const res= await dbConnector.query(`SELECT * FROM MON_AN WHERE MA_MON_AN='${foodID}'`);
//     return res.rows;
//   }
//   catch(err){
//     return err;
//   } 
// };

const updateUserInfo = async (id, name, email, phone) => {
  try {
    const res = await dbConnector.query(`UPDATE KHACH_HANG SET ten_kh = '${name}', email='${email}', sdt='${phone}' WHERE id = '${id}'`)
    return res
  } catch (err) {
    return err
  }
}

const getAllGoods = async () => {
  try {
    const res = await dbConnector.query(`SELECT * FROM MAT_HANG`)
    return res
  } catch (err) {
    return err
  }
}


const getAllGoodsOfCategory = async (category) => {
  try {
    var res
    if(category !='TYNU' && category!='TYDAV' && category!= 'TYDCHT'){
      res = await dbConnector.query(`SELECT * FROM mon_an`)
    }
   else{
    res = await dbConnector.query(`SELECT * FROM MAT_HANG WHERE ma_loai_hang='${category}'`)
   }
    return res.rows
  } catch (err) {
    return err.message
  }
}
// call themPhieuNhapHang(ARRAY['#GDCxZxJT','#GDCxZxJT','#GDx3VH16','#GDCnX6D1'],ARRAY[10,10,15,20],ARRAY[17000,20000,30000,40000],'{2012-05-05,
//   ma mh, so luong																											 2012-07-07,2017-03-03,2019-01-01}');
const addNewReceipt = async (queryStringArr) => {
  try {
    const res = await dbConnector.query(`call themPhieuNhapHang(${queryStringArr})`)
    return res
  } catch (err) {
    return err.message
  }
}


const addNewReceiptCT = async (queryStringArr) => {
  try {
    console.log(`call themPhieuXuatHang(${queryStringArr})`)
    const res = await dbConnector.query(`call themPhieuXuatHang(${queryStringArr})`)
    return res
  } catch (err) {
    return err.message
  }
}

const getAllReCeiptID = async () => {
  try {
    const res = await dbConnector.query(`SELECT * FROM phieu_nhap_kho pnk order by ngay_nhap desc`)
    return res
  } catch (err) {
    return err.message
  }
}
const getUserReCeiptByID = async (id) => {
  try {
    const res = await dbConnector.query(`select * from don_hang dh where dh.ma_don_hang = '${id}'`)
    return res.rows
  } catch (err) {
    return err.message
  }
}
const getUserReCeiptID = async (id) => {
  try {
    const res = await dbConnector.query(`select * from don_hang dh where dh.ma_khach_hang = '${id}' order by ngay_mua desc`)
    return res.rows
  } catch (err) {
    return err.message
  }
}
const getReCeiptsByID = async (id) => {
  try {
    const res = await dbConnector.query(`SELECT * FROM phieu_nhap_kho pnk where pnk.ma_phieu='${id}'`)
    return res
  } catch (err) {
    return err.message
  }
}

const getReCeiptInfo = async (id) => {
  try {
    const res = await dbConnector.query(`SELECT mh.ten_mat_hang,ctnk.don_gia, ctnk.so_luong, ctnk.don_gia*ctnk.so_luong as thanh_tien, ctnk.ngay_san_xuat FROM  chi_tiet_nhap_kho ctnk, mat_hang mh where ctnk.ma_phieu='${id}' and ctnk.ma_mat_hang=mh.ma_mat_hang`)
    return res.rows
  } catch (err) {
    return err.message
  }
}

const getFoodInfoForCartHistory=async id=>{
  try {
    const res = await dbConnector.query(`select ctdh.ma_don_hang as id,ma.ten_mon_an as ten, ctdh.gia_ban as don_gia, ctdh.so_luong, ctdh.thanh_tien 
    from chi_tiet_don_hang ctdh, mon_an ma where ctdh.ma_don_hang = '${id}' and ma.ma_mon_an = ctdh.ma_mat_hang`)
    return res.rows
  } catch (err) {
    return err.message
  }
}
const getGoodsInfoForCartHistory=async id=>{
  try {
    const res = await dbConnector.query(`select ctdh.ma_don_hang as id, mh.ten_mat_hang as ten, slhct.gia_ban_ra as don_gia, ctdh.so_luong, ctdh.thanh_tien
    from chi_tiet_don_hang ctdh, mat_hang mh, sl_hang_canteen slhct where ctdh.ma_don_hang = '${id}' and mh.ma_mat_hang = ctdh.ma_mat_hang and slhct.ma_mat_hang = ctdh.ma_mat_hang`)
    return res.rows
  } catch (err) {
    return err.message
  }
}

const getAllExportReCeiptID = async () => {
  try {
    const res = await dbConnector.query(`SELECT * FROM phieu_xuat_kho pxk order by ngay_xuat desc`)
    return res
  } catch (err) {
    return err.message
  }
}
const getExportReCeiptsByID = async (id) => {
  try {
    const res = await dbConnector.query(`SELECT * FROM phieu_xuat_kho pxk where pxk.ma_phieu='${id}'`)
    return res
  } catch (err) {
    return err.message
  }
}
const getExportReCeiptInfo = async (id) => {
  try {
    const res = await dbConnector.query(`SELECT mh.ten_mat_hang,ctxk.don_gia, ctxk.so_luong, ctxk.don_gia*ctxk.so_luong as thanh_tien FROM  chi_tiet_xuat_kho ctxk, mat_hang mh where ctxk.ma_phieu='${id}' and ctxk.ma_mat_hang=mh.ma_mat_hang`)
    return res.rows
  } catch (err) {
    return err.message
  }
}

const getPopularItems = async (amount) => {
  try {
    const res = await dbConnector.query(`SELECT sl.ma_mat_hang, sl.gia_ban_ra, mh.ten_mat_hang, mh.img_url FROM sl_hang_canteen sl, mat_hang mh WHERE sl.ma_mat_hang=mh.ma_mat_hang and sl.so_luong>0 LIMIT ${amount}`)
    return res.rows
  } catch (err) {
    return err
  }
}
const getGoodSearchInfo = async (key) => {
  try {
    var arrResult = ''
    const resFoods = await dbConnector.query(`SELECT * FROM THUC_AN_TRONG_KHO TA, MON_AN MA WHERE TA.MA_MON_AN=MA.MA_MON_AN AND MA.TEN_MON_AN ILIKE '%${key}%'`)
    const resProduct = await dbConnector.query(`select slh.ma_mat_hang, slh.so_luong, mh.ten_mat_hang, slh.gia_ban_ra, mh.img_url
     from sl_hang_canteen slh, mat_hang mh where slh.ma_mat_hang = mh.ma_mat_hang and mh.ten_mat_hang ILIKE '%${key}%'
    `)
    if (resFoods.rows &&resProduct.rows){
      arrResult = resFoods.rows.concat(resProduct.rows)
    }
    else{
      arrResult=[]
    }
    return arrResult
  } catch (err) {
    return err.message
  }
}


const searchByCategory = async (category) => {
  try {
    var res
    if (category == 'TYNU' || category == 'TYDCHT' || category == 'TYDAV') {
      res = await dbConnector.query(`select slh.ma_mat_hang, slh.so_luong, mh.ten_mat_hang, slh.gia_ban_ra, mh.img_url
      from sl_hang_canteen slh, mat_hang mh where slh.ma_mat_hang = mh.ma_mat_hang and mh.ma_loai_hang = '${category}'
     `)
    }
    else {
      res = await dbConnector.query(`SELECT * FROM THUC_AN_TRONG_KHO TA, MON_AN MA WHERE TA.MA_MON_AN=MA.MA_MON_AN`)
    }
    return res
  } catch (err) {
    return err.message
  }
}

const addProductToCart = async (params) => {
  try {
    console.log(params.id, params.idPro)
    const res = await dbConnector.query(`call themvaogiohang('${params.id}', '${params.idPro}', '${params.quantity}')`)
    return res
  } catch (err) {
    return err
  }
}
const getProductsCart = async (idCart) => {
  try {
    var arrRes = ''
    console.log(idCart)

    // const resFoods = await dbConnector.query(`select distinct ma.ma_mon_an as id, ma.ten_mon_an as ten, giohang.so_luong, ma.gia_ban, (giohang.so_luong*ma.gia_ban)as thanh_tien 
    //   from mon_an ma, (select ctgh.ma_mat_hang, ctgh.so_luong from chi_tiet_gio_hang ctgh, khach_hang kh where ctgh.id_gio_hang = '${idCart}'
    //   ) as giohang where ma.ma_mon_an = giohang.ma_mat_hang`)

    const resFoods = await dbConnector.query(`select distinct ma.ma_mon_an as id, ma.ten_mon_an as ten, giohang.so_luong, tatk.so_luong as so_luong_hang , ma.gia_ban, (giohang.so_luong*ma.gia_ban)as thanh_tien 
    from mon_an ma, thuc_an_trong_kho tatk, (select ctgh.ma_mat_hang, ctgh.so_luong from  chi_tiet_gio_hang ctgh, khach_hang kh where ctgh.id_gio_hang = '${idCart}'
    ) as giohang where ma.ma_mon_an = giohang.ma_mat_hang and tatk.ma_mon_an = giohang.ma_mat_hang
`)
    
    // const resProduct = await dbConnector.query(`
    //   select distinct mh.ma_mat_hang as id, mh.ten_mat_hang as ten, giohang.so_luong, slhct.gia_ban_ra as gia_ban, (giohang.so_luong*slhct.gia_ban_ra) as thanh_tien from sl_hang_canteen slhct, mat_hang mh, (select ctgh.ma_mat_hang, ctgh.so_luong from chi_tiet_gio_hang ctgh, khach_hang kh where ctgh.id_gio_hang = '${idCart}'
    //   ) as giohang where giohang.ma_mat_hang = mh.ma_mat_hang and slhct.ma_mat_hang = giohang.ma_mat_hang
    //   `)


    const resProduct = await dbConnector.query(`
    select distinct mh.ma_mat_hang as id, mh.ten_mat_hang as ten, giohang.so_luong,slhct.so_luong as so_luong_hang, slhct.gia_ban_ra as gia_ban, (giohang.so_luong*slhct.gia_ban_ra) as thanh_tien from sl_hang_canteen slhct, mat_hang mh, (select ctgh.ma_mat_hang, ctgh.so_luong from chi_tiet_gio_hang ctgh, khach_hang kh where ctgh.id_gio_hang = '${idCart}'
          ) as giohang where giohang.ma_mat_hang = mh.ma_mat_hang and slhct.ma_mat_hang = giohang.ma_mat_hang`)
    // console.log('Cac mon ne',resFoods.rows)
    arrRes = resFoods.rows.concat(resProduct.rows)
    console.log(arrRes)
    return arrRes
  }
  catch (err) {
    return err
  }
}
const updateTodayFood = async menu => {
  try {
    const res = await dbConnector.query(`call suaDoiKhoThucAn(${menu});`)
    return res
  } catch (err) {
    return err
  }
}

const getAllFood = async () => {
  try {
    const res = await dbConnector.query(`SELECT * FROM  MON_AN`);
    return res.rows;
  }
  catch (err) {
    return err;
  }
}
const getAllUserInfo = async () => {
  try {
    const res = await dbConnector.query(`SELECT * FROM KHACH_HANG ORDER BY id asc`);
    return res.rows;
  }
  catch (err) {
    return err;
  }
}
const setUserBalance = async user => {
  try {
    const res = await dbConnector.query(`UPDATE KHACH_HANG SET so_du ='${user.balance}' WHERE id='${user.id}' `)
    return res
  } catch (err) {
    return err
  }
}

// const setUsersBalance = async users => {
//   for (var i = 0; i < users.length; i++) {
//     await setUserBalance(users[i]);
//   }

const setUsersBalance = async users => {
  try{
    var res
    for (var i = 1; i < users.length; i++) {
        res=await setUserBalance(users[i]);
    }
    return res
  }
  catch(err){
    return err
  }
}


const getCurrentStorageDetails = async () => {
  try {
    const res = await dbConnector.query(`SELECT *  FROM mat_hang_trong_kho kho, mat_hang MH,sl_hang_canteen slh  WHERE kho.ma_mat_hang=MH.ma_mat_hang and slh.ma_mat_hang = MH.ma_mat_hang and kho.ton_tai=1 and kho.so_luong>0`);
    return res;
  }
  catch (err) {
    return err.message;
  }
}

const getCurrentCanteenDetails = async () => {
  try {
    const res = await dbConnector.query(`SELECT *  FROM mat_hang_canteen kho, mat_hang MH WHERE kho.ma_mat_hang=MH.ma_mat_hang and ton_tai=1 and so_luong>0 `);
    return res;
  }
  catch (err) {
    return err;
  }
}

const editCart = async (idUser, strQuery) => {
  try {
    console.log(`call capnhatgiohang('${idUser}',${strQuery})`)
    const res = await dbConnector.query(`call capnhatgiohang('${idUser}',${strQuery})`)
    // console.log(res)
    return res
  } catch (err) {
    return err.message
  }
}

const deleteUserCart = async (idUser) => {
  try {
    // console.log(`call capnhatgiohang('${idUser}',${strQuery})`)
    const res = await dbConnector.query(`DELETE FROM chi_tiet_gio_hang where id_gio_hang = (select id_gio_hang from khach_hang where id='${idUser}')`)
    // console.log(res)
    return res
  } catch (err) {
    return err.message
  }
}

const deleteProductInStore = async (id, date) => {
  try {
    console.log(id, date)
    const res = await dbConnector.query(`call xoaHangTrongKho('${id}','${date}')`)
    return res
  } catch (err) {
    return err
  }
}
const deleteProductInCanteen = async (id, date) => {
  try {
    console.log(id, date)
    const res = await dbConnector.query(`call xoaHangCanteen('${id}','${date}')`)
    return res
  } catch (err) {
    return err
  }
}

const getAllGoodCategory=async()=>{
  try{

    const res = await dbConnector.query(`select * from loai_hang`)
    return res.rows
  }catch(err){
    return err
  }
}

const addNewGood=async(ma_loai_hang,ten_mat_hang,img_url,tien_loi,han_su_dung)=>{
  try{
    const res = await dbConnector.query(`call themMatHangMoi('${ma_loai_hang}', '${ten_mat_hang}','${img_url}','${tien_loi}','${han_su_dung}')`)
    return res
  }catch(err){
    return err.message
  }
}
const addNewFood=async(ten_mon_an,gia_ban,img_url)=>{
  // console.log(`call themMonAnMoi('${ten_mon_an}', ${gia_ban},'${img_url}')`)
  try{
   
    const res = await dbConnector.query(`call themMonAnMoi('${ten_mon_an}', ${gia_ban},'${img_url}')`)
    return res
  }catch(err){
    return err.message
  }
}
const createOrder = async (idUser, strQuery) => {
  try {
    console.log(`call themdonhang('${idUser}',${strQuery})`)
    const res = await dbConnector.query(`call themdonhang('${idUser}',${strQuery})`)
    // console.log(res)
    // return 1
    return res
  } catch (err) {
    return err.message
  }
}
const getUserBalance = async (idUser)=>
{
  try {
    const res = await dbConnector.query(`select so_du from khach_hang where id = '${idUser}'`)
    return res.rows
  } catch (err) {
    return err
  }
}

const rechargeBalance = async(idUser,val) =>
{
  try {
    if(val == 100)
    {
      const res = await dbConnector.query(`UPDATE KHACH_HANG SET so_du = so_du + '100000' WHERE id='${idUser}' `)

    }
    else if(val == 50){
      const res = await dbConnector.query(`UPDATE KHACH_HANG SET so_du = so_du + '50000' WHERE id='${idUser}' `)

    }
    return res
  } catch (err) {
    
  }
}

const getAllOrder= async ()=>
{
  try {
    const res = await dbConnector.query(`SELECT * FROM DON_HANG order by ngay_mua desc`)
    return res
  } catch (err) {
    return err.message
  }
}

const getOrderByID= async (id)=>
{
  try {
    const res = await dbConnector.query(`SELECT * FROM DON_HANG where ma_don_hang= '${id}'`)
    return res.rows
  } catch (err) {
    return err.message
  }
}


const getOrderInfo= async (id)=>
{
  try {
    const res = await dbConnector.query(`SELECT ct.so_luong, ct.gia_ban, ct.thanh_tien, dh.ma_don_hang, mh.ten_mat_hang FROM DON_HANG dh, CHI_TIET_DON_HANG ct, mat_hang mh where dh.ma_don_hang=ct.ma_don_hang and dh.ma_don_hang='${id}'`)
    return res.rows
  } catch (err) {
    return err.message
  }
}



const getDetailTrading= async (id)=>
{
  try {
    var res = await dbConnector.query(`SELECT ct.ma_don_hang,ct.so_luong, ct.gia_ban, ct.thanh_tien, dh.ma_don_hang, mh.ten_mat_hang FROM DON_HANG dh, CHI_TIET_DON_HANG ct, mat_hang mh where ct.ma_mat_hang = mh.ma_mat_hang and dh.ma_don_hang=ct.ma_don_hang and dh.ma_don_hang='${id}'`)
    if(res.rows.length==0){
      res = await dbConnector.query(`SELECT ct.ma_don_hang,ct.so_luong, ct.gia_ban, ct.thanh_tien, ma.ten_mon_an as ten_mat_hang from  mon_an ma, chi_tiet_don_hang ct where ct.ma_don_hang='${id}' and
      ma.ma_mon_an=ct.ma_mat_hang`)
    }
    return res.rows
  } catch (err) {
    return err.message
  }
}
const getOrderIDNewCreate = async(idUser) =>
{
  try {
    const res = await dbConnector.query(`
    select dh.ma_don_hang as id_order from don_hang dh where dh.ma_khach_hang = '${idUser}'
    ORDER BY dh.ma_don_hang DESC LIMIT 1
    `)
    return res.rows
  } catch (err) {
      return err.message
  }
}

const updateState = async(id) =>
{
  try {
    const res = await dbConnector.query(`
        call capnhatthanhcongdonhang('${id}')
    `)
    return res
  } catch (err) {
      return err.message
  }
}

const getTodayReciept= async()=>{
  try {
    const res= await dbConnector.query('select dh.ma_don_hang as id, dh.ngay_mua, dh.trang_thai, sum(ctdh.thanh_tien) as tong_tien from don_hang dh, chi_tiet_don_hang ctdh where ngay_mua::timestamp::date = current_date and dh.ma_don_hang = ctdh.ma_don_hang GROUP BY dh.ma_don_hang ORDER BY dh.ngay_mua DESC')
    return res
  }catch(err){
      return err.message
  }
}
const updateDailyTurnover=async()=>{
  try{
    const res= await dbConnector.query('call capnhatdoanhthu()')
    return res
  }catch(err){
    return err
  }
}
const getUpdatedDailyTurnoverTime=async(date)=>{
  try{
    
    console.log('QueryStr: ',`select * from doanh_thu_ngay where ngay = '${date}'`)
    const res= await dbConnector.query(`select * from doanh_thu_ngay where ngay = '${date}'`)
    return res
  }catch(err){
    return err.message
  }
}
const getTurnoverByDate=async(date)=>{
  try{
    queStr = `select dh.ma_don_hang as id, dh.ngay_mua, dh.trang_thai, sum(ctdh.thanh_tien) as tong_tien from don_hang dh, chi_tiet_don_hang ctdh where ngay_mua::timestamp::date = '${date}' and dh.ma_don_hang = ctdh.ma_don_hang GROUP BY dh.ma_don_hang`

   
    const res=await dbConnector.query(`select dh.ma_don_hang as id, dh.ngay_mua, dh.trang_thai, sum(ctdh.thanh_tien) as tong_tien from don_hang dh, chi_tiet_don_hang ctdh where ngay_mua::timestamp::date = '${date}' and dh.ma_don_hang = ctdh.ma_don_hang GROUP BY dh.ma_don_hang ORDER BY dh.ngay_mua DESC`)
    return res
  }
  catch(err){
    return err.message
  }
}
const getThisMonthTurnover=async()=>{
  try{
    const res=await dbConnector.query(`select * from doanh_thu_ngay where EXTRACT(MONTH FROM ngay) = (date_part('month',(select current_timestamp))) order by ngay asc `)
    return res
  }
  catch(err){
    return err.message
  }
}
const getTurnoverByMonth=async(month)=>{
  try{
    const res=await dbConnector.query(`select * from doanh_thu_ngay where EXTRACT(MONTH FROM ngay) = '${month}' order by ngay asc`)
    return res     
  }
  catch(err){
    return err.message
  }
}
const updateMonthTurnover=async(month)=>{
  try{
    const res=await dbConnector.query(`call doanhthuthang(${month})`)
    return res
  }
  catch(err){
    return err.message
  }
}
const getCurrentRemainedFood=async()=>{
  try{
    const res=await dbConnector.query(`select ma.ma_mon_an, ma.ten_mon_an, tatk.so_luong, ma.gia_ban from mon_an ma, thuc_an_trong_kho tatk 
    where ma.ma_mon_an = tatk.ma_mon_an`)
    return res
  }
  catch(err){
    return err.message
  }
}

const updatePrice=async(productID,price)=>{
  try{
    queryStr=`UPDATE SL_HANG_CANTEEN SET GIA_BAN_RA=${price} WHERE MA_MAT_HANG='${productID}' `;
    console.log(queryStr)
    const res=await dbConnector.query(queryStr)
    return res
  }catch(err){
    return err.message
  }
}
const resetFood=async()=>{
  try{
    queryStr=`call resetFood()`;
    const res=await dbConnector.query(queryStr)
    return res
  }catch(err){
    return err
  }
}

const getStatistical=async(month,year)=>{
  try{
    queryStr=`select mh.ma_mat_hang,mh.ten_mat_hang, sum(ct.so_luong)::int as so_luong, sum(ct.thanh_tien)::bigint as thanh_tien from chi_tiet_don_hang ct, don_hang dh,
    mat_hang mh where dh.ma_don_hang=ct.ma_don_hang and mh.ma_mat_hang=ct.ma_mat_hang 
    and extract(MONTH from dh.ngay_mua::timestamp::date)=${month} and extract (YEAR from dh.ngay_mua::timestamp::date)=${year}
    group by (mh.ma_mat_hang)
    UNION
    select ma.ma_mon_an as ma_mat_hang,ma.ten_mon_an, sum(ct.so_luong)::int as so_luong, sum(ct.thanh_tien)::bigint as thanh_tien from chi_tiet_don_hang ct, don_hang dh,
    mon_an ma where dh.ma_don_hang=ct.ma_don_hang and ma.ma_mon_an=ct.ma_mat_hang 
    and extract(MONTH from dh.ngay_mua::timestamp::date)=${month} and extract (YEAR from dh.ngay_mua::timestamp::date)=${year}
    group by (ma.ma_mon_an) order by so_luong desc`;
    const res=await dbConnector.query(queryStr)
    return res
  }catch(err){
    return err
  }
}
module.exports = {
  updateTodayFood,
  getAllFood,
  addNewUser,
  userAuthentication,
  adminAuthentication,
  getTodayFood,
  getUserInfo,
  updateUserInfo,
  getFoodById,
  getAllGoods,
  addNewReceipt,
  getReCeiptInfo,
  getAllReCeiptID,
  getCurrentStorage,
  addNewReceiptCT,
  getGoodSearchInfo,
  addProductToCart,
  getProductsCart,
  getPopularItems,
  getAllUserInfo,
  setUserBalance,
  
  getAllExportReCeiptID,
  getExportReCeiptInfo,
  getExportReCeiptsByID,
  getReCeiptsByID,
  getCurrentStorageDetails,
  editCart,
  deleteUserCart,
  deleteProductInStore,
  getCurrentCanteen,
  deleteProductInCanteen,
  getCurrentCanteenDetails,
  searchByCategory,
  getAllGoodCategory,
  addNewGood,
  addNewFood,
  createOrder,
  setUsersBalance,
  getUserBalance,
  rechargeBalance,

  getUserReCeiptID,
  getFoodInfoForCartHistory,
  getGoodsInfoForCartHistory,
  getAllOrder,
  getOrderInfo,
  getOrderByID,
  
  getDetailTrading,
  getUserReCeiptByID,
  getAllGoodsOfCategory,
  getOrderIDNewCreate,
  updateState,
  getTodayReciept,
  updateDailyTurnover,
  getUpdatedDailyTurnoverTime,
  getTurnoverByDate,
  getThisMonthTurnover,
  getTurnoverByMonth,
  updateMonthTurnover,
  getCurrentRemainedFood,
  updatePrice,
  resetFood,
  getStatistical,
};
