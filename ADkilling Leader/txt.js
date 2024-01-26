var url,title;
var urlid;
var sum;
chrome.storage.sync.get(["url","title"],function(changes){
  url=changes.url;
  title=changes.title;
  console.log("txt="+changes.url[0]);
  console.log("txt="+changes.url[1]);
  console.log("txt="+changes.url.length);
  gg=document.getElementById("gg");
  for(i=0;i<url.length;i++){
    var div=document.createElement("div");
    var div1=document.createElement("div");
    div1.innerHTML=title[i];
    gg.appendChild(div1);
    div.innerHTML=url[i];
    gg.appendChild(div);
  }
});