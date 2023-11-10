const moment = require("moment");

const times = (n, block) => {
  var accum = "";
  for (var i = 0; i < n; ++i) accum += block.fn(i);
  return accum;
};

const getLen = (arr) => {
  return arr.length;
};

const myCSLog = (x) => {
  console.log(x);
};

const customDate = (date) => {
  return moment(date).format("YYYY-MM-DD, h:mm:ss A");
};

const customDateWOTime = (date) => {
  try{
    return moment(date).format("YYYY-MM-DD");
  }catch(err){
    console.log(err)
  }

};
const getJSONLen = (jObject) => {
  try {
    var a = Object.keys(jObject).length;
    return a;
  } catch (err) {}
};
const getRemainder = (x, c) => {
  return x % c;
};

const getQuotient = (x, c) => {
  return parseInt(x / c);
};

const getTotalCost = (obj) => {
  try {
    var totalCost = 0;
    for (i = 0; i < obj.chi_tiet_phieu.chi_tiet.length; i++) {
      totalCost += obj.chi_tiet_phieu.chi_tiet[i].thanh_tien;
    }
    return totalCost;
  } catch (err) {
    return 0;
  }
};
const ifCond = (v1, operator, v2, options) => {
  switch (operator) {
    case "==":
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case "===":
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case "!=":
      return v1 != v2 ? options.fn(this) : options.inverse(this);
    case "!==":
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case "<":
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case "<=":
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case ">":
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case ">=":
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    case "&&":
      return v1 && v2 ? options.fn(this) : options.inverse(this);
    case "||":
      return v1 || v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
};
const ConvertToVND = (value) => {
  // console.log(value)
  try {
    if(typeof(value)=='string')
    {
      try{
        value=parseInt(value)
      }
      catch(err){

      }
    }
    gia_ban = value.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    return gia_ban;
   
  } catch (error) {
    return value;
  }
};
const getTotalCostV2 = function (arr) {
  try {
    
    sum = 0;
    for (i = 0; i < arr.length; i++) {
      sum += arr[i].thanh_tien;
    }
    return sum;
  } catch (err) {
    return 0;
  }
};
module.exports = {
  times,
  ifCond,
  getLen,
  getRemainder,
  getQuotient,
  getJSONLen,
  myCSLog,
  customDate,
  getTotalCost,
  customDateWOTime,
  ConvertToVND,
  getTotalCostV2,
};
