//      擴充軟件第一次被安裝
chrome.runtime.onInstalled.addListener(() => {
     //介紹產品
    chrome.tabs.create({url:'ADkiller_使用著說明.html'});
     //第一次為開啟狀態
    chrome.storage.sync.set({"cmd":true},function(){});
    ADkiller_cmd=true;
     //創建右鍵選單
    chrome.contextMenus.create({
      "id": "真的假的",
      "title": "真的假的",
      "contexts": ["all"]
    })
    chrome.contextMenus.create({
      "id": "暫停作用在此頁面",
      "title": "暫停作用在此頁面",
      "contexts": ["page"],
      "parentId":"真的假的"
    })
    chrome.contextMenus.create({
      "id": "刪掉此廣告",
      "title": "刪掉此廣告",
      "contexts": ["all"],
      "parentId":"真的假的"
    })
  })
//儲存豁免名單的陣列
var txt=['複製網址 貼至擴充軟件即可刪除'];
var txt_id=['下方為豁免列表'];
var txt_len=0;
var check;
var x=1;
//      右鍵選單"功能"
chrome.contextMenus.onClicked.addListener(function (info,tab){
  if(info.menuItemId==="刪掉此廣告"){
    //x=prompt("你要刪幾層  太高層可能導致部分功能失效(請輸入整數)");
    //console.log("x="+x);
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
      chrome.tabs.sendMessage(tabs[0].id,{"background":"手動刪","how":x},function(response){ 

      });
    });
    //給可變拉軸看刪幾階層
    
  }
  if(info.menuItemId==="暫停作用在此頁面"){
    check=true;
    txt.forEach(function(data,index,arr){
      console.log("check="+check);
      if(data==info.pageUrl)check=false;
    });
    if(check){
      console.log("info.pageUrl="+info.pageUrl);
      txt.push(info.pageUrl);
      txt_id.push(tab.title);
      chrome.storage.sync.set({"url":txt,"title":txt_id},function(){});
    }
  }
});










//宣告
//var bad;
//var badsrc;
var del_data;
var tabs_url;
//主邏輯  接收訊息 開始
var ADkiller_cmd;
chrome.storage.onChanged.addListener(function(change,sync){
  if(change.cmd.newValue!=undefined)ADkiller_cmd=change.cmd.newValue; 
});
var content_place;
//分析接收的訊息
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
  
  //content message
  if(request.content=="web_del?"){
    console.log("content ask");
    if(ADkiller_cmd){
      //content where r u
      chrome.tabs.query({active:true,currentWindow:true},function(ta){
        tabs_url=ta[0].url;
        console.log("tabs="+tabs_url);
        console.log("title="+ta[0].title);
      });
      //bad=new RegExp(content_place,'i');
      //測試是否暫停此網頁
      check=true;
      txt.forEach(function(badsrc,index,arr){
        if(badsrc==tabs_url){
          check=false;
          console.log("badbad");
          //console.log("txt"+txt);
          console.log("no work");
          sendResponse({"background":"NO"});
        }
      });
      //badsrc=bad.test(qu);
      if(check){
        //console.log("txt"+txt);
        console.log("work");
        sendResponse({"background":"DEL"});
      }
    }
    else{ 
      sendResponse({"background":"NO"});
    }
  }


   //UI message
  //UI 新增豁免名單
  var name='';
  if(request.ui=="新增"){
    check=true;
    txt.forEach(function(data,index,arr){
      if(data==request.src)check=false;
    });
    if(check){
      txt_len=txt.push(request.src);
      while(name==''){
        name=prompt("為您的網頁取個名字吧!  以便您日後的刪減");
      }
      if(name!=null)txt_id.push(name);
      chrome.storage.sync.set({"url":txt,"title":txt_id},function(){});
    }
    sendResponse({"background":"新增豁免"});
  }
  //UI刪除豁免名單
  if(request.ui=="刪除"){
    txt.forEach(function(data,index,arr){
      if(data==request.src){
        del_data=txt.splice(index,1);
        txt_id.splice(index,1);
        chrome.storage.sync.set({"url":txt,"title":txt_id},function(){});
      }
    });
    sendResponse({"background":"刪除豁免"});
  }

  //如果UI問我現在是開還關     sendMessage 現在狀態
  if(request.ui=="cmd?"){
    if(ADkiller_cmd){
      sendResponse({"background":"open"});
    }
    else {
      sendResponse({"background":"close"});
    }
  }
  //如果UI叫我關掉 cmd=false     
  if(request.ui=="close cmd"){
    //ADkiller_cmd=false;
    chrome.storage.sync.set({"cmd":false},function(){});
    //console.log("cmd="+ADkiller_cmd);
    sendResponse({"background":"close"});
  }
  //如果UI叫我打開 cmd=true  
  if(request.ui=="open cmd"){
    //ADkiller_cmd=true;
    chrome.storage.sync.set({"cmd":true},function(){});
    //console.log("cmd="+ADkiller_cmd);
    sendResponse({"background":"open"});
  }
  //如果UI叫我更正名單  
  if(request.ui=="更正名單"){
    chrome.storage.sync.set({"url":txt},function(){});
    sendResponse({"background":"rewrite txt"});
  }

})
