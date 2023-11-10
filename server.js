
const express = require('express');
const dbConnector = require('./models/dbConnect/db');
const exphbs = require('express-handlebars');
const session = require('express-session')
const hbsHelper = require('./models/hbsHelpers/hbsHelper');
const port = 3000;
const app = express();
app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'container.hbs',
    layoutsDir: 'views/_layouts',
    helpers: hbsHelper
}))

app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public/'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//session config
const sessionConfig = {
    name: 'canteen',
    secret: 'secretKey',
    cookie: {
        maxAge: 1000 * 60 * 60 * 4,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true
}
app.use(session(sessionConfig));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// //routes module
const signUpRoutes = require('./routers/signUpRoutes')
const signInRoutes = require('./routers/signInRoutes')
const signOutRoutes = require('./routers/signOutRoutes')
const homeRoutes = require('./routers/homeRoutes')
const itemDetailRoutes = require('./routers/itemDetailRoutes')
const getUserInfoRoutes = require('./routers/getUserInfoRoutes')
const importGoodsRoutes = require('./routers/importGoodsRoutes')
const goodsInfoRoutes = require('./routers/goodsInfoRoutes')
const importGoodsHistoryRoutes = require('./routers/importGoodsHistoryRoutes')

const exportGoodsRoutes = require('./routers/exportGoodsRoutes')
const exportGoodsHistoryRoutes = require('./routers/exportGoodsHistoryRoutes')
const searchGoodsRoutes = require('./routers/searchGoodRoutes')
const shoppingCartRoutes = require('./routers/shoppingCartRoutes')
const todayMenuRoutes = require('./routers/todayMenuRoutes')
const inStoreRoutes = require('./routers/inStoreRoutes')
const getAllUsersInfoRoutes = require('./routers/getAllUserInfoRoutes')
const inStockRoutes = require('./routers/inStockRoutes')
const addNewItemRoutes = require('./routers/addNewItemRoutes')
const rechargeRoutes = require('./routers/rechargeRoutes')
const customerCartHistoryRoutes = require('./routers/customerCartHistoryRoutes')
const tradingDetailsRoutes = require('./routers/tradingDetailsRoutes')
// const tradingHistoryRoutes=require('./routers/tradingHistoryRoutes')
const tradingHistoryRoutes = require('./routers/tradingHisRoutes')
const manageCategoryRoutes = require('./routers/manageCategoryRoutes')
const createBillRoutes = require('./routers/createBillRoutes')
const momoPaymentRoutes = require('./routers/momoPaymentRoutes')
const dailyTurnoverRoutes = require('./routers/dailyTurnoverRoutes')
const monthlyTurnoverRoutes = require('./routers/monthlyTurnoverRoutes')
const inStockFoodRoutes = require('./routers/inStockFoodRoutes')
const statisticRoutes=require('./routers/statisticRoutes')
// const sign_inRoutes=require('./routes/sign_inRoutes');
// const profileRoutes=require('./routes/profileRoutes');
// const productDetailsRoutes = require('./routes/productDetailsRoutes');

// const addProductRoutes=require('./routes/addNewProductRoutes');
// const getCatRoutes=require('./routes/getCategoryRoutes');
// const delProRoutes=require('./routes/delProductRoutes')
// const updateProRoutes=require('./routes/updateProductRoutes')
// //restrict 
// const auth_Routes=require('./authencation/authRoutes')
const restrict = require('./authencation/restrictRoutes');
const restrictRegister = require('./authencation/restrictRegister');
const restrictForUser = require('./authencation/restrictForUser');
const restrictForAdmin = require('./authencation/restrictForAdmin');
const restrictForNonAdmin = require('./authencation/restrictForNonAdmin')

app.use('/home', homeRoutes)
//for authentication 
app.use('/sign-up', restrictRegister, signUpRoutes)
app.use('/sign-in', restrictRegister, signInRoutes)
app.use('/sign-out', restrict, signOutRoutes)

//both admin and user
app.use('/goods-info', goodsInfoRoutes)

//non-admin routes
app.use('/search-goods', restrictForNonAdmin, searchGoodsRoutes)
app.use('/item-detail', restrictForNonAdmin, itemDetailRoutes)

//user routes
app.use('/shopping-cart', restrictForNonAdmin, shoppingCartRoutes)
app.use('/payment-momo', restrictForUser, momoPaymentRoutes)
app.use('/user-profile', restrictForUser, getUserInfoRoutes)
app.use('/recharge', restrictForUser, rechargeRoutes)
app.use('/customer-cart-history', restrictForUser, customerCartHistoryRoutes);
//admin routes
app.use('/import-goods', restrictForAdmin, importGoodsRoutes)
app.use('/import-goods-history', restrictForAdmin, importGoodsHistoryRoutes)
app.use('/export-goods', restrictForAdmin, exportGoodsRoutes)
app.use('/export-goods-history', restrictForAdmin, exportGoodsHistoryRoutes)
app.use('/today-menu', restrictForAdmin, todayMenuRoutes);
app.use('/in-store', restrictForAdmin, inStoreRoutes)
app.use('/manage-users', restrictForAdmin, getAllUsersInfoRoutes);
app.use('/add-new-item', restrictForAdmin, addNewItemRoutes);
app.use('/in-stock', restrictForAdmin, inStockRoutes)
app.use('/tradings-history', restrictForAdmin, tradingHistoryRoutes)
app.use('/trading-details', restrictForAdmin, tradingDetailsRoutes)
app.use('/manage-category', restrictForAdmin, manageCategoryRoutes)
app.use('/create-new-bill', restrictForAdmin, createBillRoutes)
app.use('/daily-turnover', restrictForAdmin, dailyTurnoverRoutes)
app.use('/monthly-turnover', restrictForAdmin, monthlyTurnoverRoutes)
app.use('/food-stock',restrictForAdmin, inStockFoodRoutes)
app.use('/statistic',restrictForAdmin, statisticRoutes)
var data = ''
var arr = []
app.post('/callback', (req, res) => {
    console.log('da vao callback')
    if (Object.keys(data).length !== 0) {
        arr.push(data)
    }
    if (Object.keys(req.body).length !== 0) {

        // NƠI LƯU KQ THANH TOÁN VÀO DATABASE
        data = req.body
        // res.send(data)
        console.log('KET QUA THANH TOAN: ', data)

        // console.log('da send')

    }
    console.log('arr: ', arr)
    res.send(data)
})

app.get('/', (req, res) => {
    res.redirect('/home');
})
app.use((req, res) => {
    user = {}
    if (req.session.user) {
        user = req.session.user
    }
    res.render('errorPage', { message: '404 Page not found', user: user })
})




