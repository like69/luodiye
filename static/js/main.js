

var codeData =data
async function getDataList() {
   const {data:res}  = await  axios.get('Admin/codeList')
   // console.log(res.data)
    let arr = []
    for (var i = 0; i < res.data.length ; i++) {
        let obj = {
            key : res.data[i].name,
            value:res.data[i].val
        }
        arr.push(obj)
    }
    codeData = [...codeData,...arr]
   // console.log(codeData)
}


async function randomVal(){
   await getDataList()
    let ranv = null
    let qqList = codeData.filter(item=>item.key === 'qq')
    const randomNo = Math.floor(Math.random() * qqList.length);
    ranv = qqList[randomNo].value;
    // console.log(ranv)
    let invC = document.getElementById('invC')
    invC.innerText = ranv
}

randomVal()

let bannerSwiper = new Swiper(".banner-swiper-container", {
   loop: true, // 循环模式选项
   effect: "coverflow",
   speed: 600,
   autoplay: {
     disableOnInteraction: false,
   },
   pagination: {
     el: ".swiper-pagination",
   },
 });

 let marqueeSwiper = new Swiper(".marquee-swiper-container", {
   loop: true, // 循环模式选项
   slidesPerView: 4,
   spaceBetween: 20,
   speed: 1000,
   autoplay: {
     delay: 1,
     stopOnLastSlide: false,
     disableOnInteraction: false,
   },
   // 如果需要分页器
   pagination: {
     el: ".swiper-pagination2",
   },
 });

 let currentQq = "";

 // 动态加载js
 function loadScript(src) {
   var scriptElement = document.createElement("script");
   document.getElementsByTagName("head")[0].appendChild(scriptElement);
   scriptElement.src = src;
 }

 //判断是安卓还是ios
 var u = navigator.userAgent,
   browser_version = navigator.appVersion,
   isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
   isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

 function IsPC() {
   var userAgentInfo = navigator.userAgent;
   var Agents = [
     "Android",
     "iPhone",
     "SymbianOS",
     "Windows Phone",
     "iPad",
     "iPod",
   ];
   var flag = true;
   for (var v = 0; v < Agents.length; v++) {
     if (userAgentInfo.indexOf(Agents[v]) > 0) {
       flag = false;
       break;
     }
   }
   return flag;
 }

 // 缓存数据，大于5分钟才会请求
 let kefuLink = "";
 let androidLink = "";
 let iosLink = "";


 // const qqList = data.filter(
 //   (item) => item.value && item.value.length > 1 && item.key === "qq"
 // );
 const cnzzList = data.filter((item) => item.key === "cnzz");
 const kefuList = data.filter((item) => item.key === "kefu");
 const androidLinkList = data.filter((item) => item.key === "androidLink");
 const iosLinkList = data.filter((item) => item.key === "iosLink");
 // 随机数下标
 // const randomNo = Math.floor(Math.random() * qqList.length);
 // console.log(qqList)
 // currentQq = qqList[randomNo].value;

 document.addEventListener("DOMContentLoaded",  function () {

   const qqDom = document.querySelectorAll(".qq");
   qqDom.forEach((item) => {
     item.innerHTML = currentQq;
   });
 });

 if (cnzzList.length) {
   loadScript(cnzzList[0].value);
 }

 if (kefuList.length) {
   kefuLink = kefuList[0].value;
 }

 if (androidLinkList.length) {
   androidLink = androidLinkList[0].value;
 }

 if (iosLinkList.length) {
   iosLink = iosLinkList[0].value;
 }

 let kefu = document.querySelector(".kefu");
 let qq1 = document.querySelector(".qq1");
 let download = document.querySelector(".download");

 kefu.addEventListener("click", () => {
   if (kefuLink) {
     location.href = kefuLink;
   } else {
     wakeQQ();
   }
 });
 qq1.addEventListener("click", () => {
   wakeQQ();
 });
 download.addEventListener("click", () => {
   wakeQQ();
 });

 async function wakeQQ() {
     await getDataList()
     // let qqList = codeData.filter(item=>item.key === 'qq')
     // console.log(qqList)
     // const randomNo = Math.floor(Math.random() * qqList.length);
     // currentQq = qqList[randomNo].value;
     let invC = document.getElementById('invC')
    // console.log()

   alert({
     title: "添加账号联系",
     content: "安装好专用APP后，添加接待客服:" + invC.innerText,
     doneText: "确定",
   }).then(async () => {
       const {data:res}  = await  axios.get('Admin/downUrl')
       location.href =res.data
       return
     if(isAndroid){
       location.href = androidLink || "https://down.ghostappstore.com:8152/YxKw.html";
     }else{
       location.href = iosLink ||"https://down.ghostappstore.com:8152/YxKw.html";
     }
   });
   copy();
 }

 function copy() {
     let invC = document.getElementById('invC')

     let input = document.createElement("input");
   input.value = invC.innerText;
     // console.log(invC)
   document.body.appendChild(input);
   input.select();
   document.execCommand("copy");
   document.body.removeChild(input);
   toast("邀请码已复制");
 }

 let tabs = document.querySelectorAll(".tabs");
 let navs = document.querySelectorAll(".menu a");
 for (let index = 0; index < navs.length; index++) {
   navs[index].addEventListener("click", () => {
     let cur = document.querySelector(`#${navs[index].dataset.id}`);

     navs[index].classList.add("active");

     for (let index2 = 0; index2 < tabs.length; index2++) {
       tabs[index2].style.display = "none";
     }
     cur.style.display = "block";
   });
 }
 