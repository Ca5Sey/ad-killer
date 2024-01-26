
var cmd;
//確認目前主機狀態
chrome.runtime.sendMessage({"ui":"cmd?"},function(response){
    //如果是開
    if(response.background=="open"){
        //document.getElementById("web-address").innerHTML="執行";
        document.getElementById('ggear').style.display="block";
        cmd=true;
        console.log("open open");
    }
    //如果是關
    if(response.background=="close"){
       // document.getElementById("web-address").innerHTML="待機"
       document.getElementById('ggear').style.display="";
        cmd=false;
        console.log("close close");
    }
   // chrome.storage.sync.set({"abc":"bad UI"},function (){
        
   // });
});




//監聽使用者說明按鈕(跳出說明頁面)
document.getElementById("Tool").addEventListener("click",function(){
    chrome.tabs.create({url:'ADkiller_使用著說明.html'});
});
//監聽開機關機按鈕
document.getElementById("power").addEventListener("click",function(){
    if(cmd){
        chrome.runtime.sendMessage({"ui":"close cmd"},function(response){
            if(response.background=="open"){
                cmd=true;
                //document.getElementById("web-address").innerHTML="執行";
                document.getElementById('ggear').style.display="block";
            }
            else if(response.background=="close"){
                cmd=false;
                //document.getElementById("web-address").innerHTML="待機"
                document.getElementById('ggear').style.display="";
                document.getElementById('totalId').textContent = Math.floor(Math.random()*3);
            }
            //console.log("cmd=="+cmd);
        })

    }
    else{
        chrome.runtime.sendMessage({"ui":"open cmd"},function(response){
            if(response.background=="open"){
                cmd=true;
                //document.getElementById("web-address").innerHTML="執行";
                document.getElementById('ggear').style.display="block";
            }
            else if(response.background=="close"){
                cmd=false;
                //document.getElementById("web-address").innerHTML="待機"
                document.getElementById('ggear').style.display="";
                document.getElementById('totalId').textContent = Math.floor(Math.random()*3);
            }
            //console.log("cmd=="+cmd);
        })
    }
});

//監聽新增和刪除按鈕(豁免名單)
document.getElementById("create").addEventListener("click",function(){
    var NewStringValue=document.getElementById("Address").value;
    chrome.runtime.sendMessage({"ui":"新增","src":NewStringValue},function(response){ 

  })

})

document.getElementById("delete").addEventListener("click",function(){
    var NewStringValue=document.getElementById("Address").value;
    chrome.runtime.sendMessage({"ui":"刪除","src":NewStringValue},function(response){ 
        
      })
    
    })
    //
    document.getElementById("txt").addEventListener("click",function(){
        chrome.runtime.sendMessage({"ui":"更正名單"});
        chrome.tabs.create({
            url:'txt.html'
        });
    })
    //
    
    ㄋ

