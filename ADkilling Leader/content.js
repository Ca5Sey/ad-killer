// catch  web's element
var web_iframe = document.getElementsByTagName('iframe');
var web_a = document.getElementsByTagName('a');
var web_img = document.getElementsByTagName('img');

//  how many element
var iframe_len=web_iframe.length;
var a_len=web_a.length;
var img_len=web_img.length;

//  bad  source
var iframe_a_tesk=[
  'googleads',
  'googlesyndication',
  'abcd',
  '//ads'
];
var img_tesk=[
  'googlesyndication',
  'adadadadadad',
  "pagead2"
];
var name_id_tesk=[
  'google_ads',
  'google*ads',
  'googlesyndication',
  "pagead2"
]

var can_del=false;
//  start del!
console.log("content="+document.location.href);
chrome.runtime.sendMessage({"content":"web_del?","src":location.href},function(response){
  if(response.background=="DEL"){
    can_del=true;
    window.setTimeout(delad_iframe_src_id_name,0);
    window.setTimeout(delad_a_href,0);
    window.setTimeout(delad_img_src,0);
  }
  if(response.background=="NO"){
    can_del=false;
  }

  
})

if(can_del){
  window.setTimeout(delad_iframe_src_id_name,0);
  window.setTimeout(delad_a_href,0);
  window.setTimeout(delad_img_src,0);
}
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
  if(request.background=="手動刪"){
    console.log("how="+request.how);
    del_context(context_ele,1);
    sendResponse({"content":"OK"});
  }
});


var context;
//監聽右鍵
document.addEventListener("contextmenu",function(event){
  context_ele=event.target;
});

//手動刪除的函式
function del_context(ele,how){
  var del_ad;
  var del_ad_parent;
  del_ad=ele;
  for(i=0;i<how-1;i++){
    console.log("del_ad="+del_ad.nodeName);
    del_ad=del_ad.parentNode;
  }
  del_ad_parent=del_ad.parentNode;
  del_ad_parent.removeChild(del_ad);
}



//        for   iframe->src
function delad_iframe_src_id_name(){
  var bad;
  var badsrc;
  var qu,i,j;
  var test;
  var con;
  for(i=iframe_len-1;i>=0;i--){
    con=0;
    qu=web_iframe[i].getAttribute('src');
    for(j=0;j<iframe_a_tesk.length;j++){
      bad=new RegExp(iframe_a_tesk[j],'i');
      console.log("測試這個"+qu);
      badsrc=bad.test(qu);
      if(badsrc){
        if(web_iframe[i].parentNode.nodeName=='BODY'||web_iframe[i].parentNode.nodeName=='HTML'){
          console.log("刪掉這個"+web_iframe[i].parentNode.nodeName);
          test=web_iframe[i].parentNode;
          test.removeChild( web_iframe[i]);
          con=1;
          break;
        }
         test=web_iframe[i].parentNode.parentNode;
         test.removeChild( web_iframe[i].parentNode);
         con=1;
         break;
      } 
    }
    if(con==1)continue;
    qu=web_iframe[i].getAttribute('name');
    for(j=0;j<name_id_tesk.length;j++){
      bad=new RegExp(name_id_tesk[j],'i');
      badsrc=bad.test(qu);
      console.log("name測試"+qu);
      if(badsrc){
        if(web_iframe[i].parentNode.nodeName=='BODY'||web_iframe[i].parentNode.nodeName=='HTML'){
          console.log("name刪的"+web_iframe[i].parentNode.nodeName);
          test=web_iframe[i].parentNode;
          test.removeChild( web_iframe[i]);
          con=1;
          break;
        }
         test=web_iframe[i].parentNode.parentNode;
         test.removeChild( web_iframe[i].parentNode);
         con=1;
         break;
      } 
    }
    if(con==1)continue;
    qu=web_iframe[i].getAttribute('id');
    for(j=0;j<name_id_tesk.length;j++){
      bad=new RegExp(name_id_tesk[j],'i');
      badsrc=bad.test(qu);
      if(badsrc){
        if(web_iframe[i].parentNode.nodeName=='BODY'||web_iframe[i].parentNode.nodeName=='HTML'){
          console.log(web_iframe[i].parentNode.nodeName);
          test=web_iframe[i].parentNode;
          test.removeChild( web_iframe[i]);
          break;
        }
         test=web_iframe[i].parentNode.parentNode;
         test.removeChild( web_iframe[i].parentNode);
         break;
      } 
    }

  }
}

//        for   a->href
function delad_a_href(){
  var bad;
  var badsrc;
  var qu,i,j;
  var test;
  for(i=a_len-1;i>=0;i--){
    qu=web_a[i].getAttribute('href');
    for(j=0;j<iframe_a_tesk.length;j++){
      bad=new RegExp(iframe_a_tesk[j],'i');
      badsrc=bad.test(qu);
      if(badsrc){
         test=web_a[i].parentNode;
         test.removeChild( web_a[i]);
         break;
      }
    }
  }
}
//      img->src
function delad_img_src(){
  var bad;
  var badsrc;
  var qu,i,j;
  var test;
  for(i=img_len-1;i>=0;i--){
    qu=web_img[i].getAttribute('src');
    for(j=0;j<img_tesk.length;j++){
      bad=new RegExp(img_tesk[j],'i');
      badsrc=bad.test(qu);
      if(badsrc){
         test=web_img[i].parentNode;
         test.removeChild( web_img[i]);
         break;
      }
    }
  }
}