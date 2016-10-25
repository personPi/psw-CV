/**
 * Created by Administrator on 2016/10/12.
 */
 window.onload=function(){
    var json={"imgs":[{"src":"img/1.jpg"},{"src":"img/2.jpg"},{"src":"img/3.jpg"},{"src":"img/4.jpg"},{"src":"img/5.jpg"},{"src":"img/6.jpg"},{"src":"img/7.jpg"},
        {"src":"img/8.jpg"},{"src":"img/9.jpg"},{"src":"img/10.jpg"},{"src":"img/11.jpg"},{"src":"img/12.jpg"},{"src":"img/13.jpg"},{"src":"img/14.jpg"},{"src":"img/15.jpg"},
        {"src":"img/16.jpg"},{"src":"img/17.jpg"},{"src":"img/18.jpg"},{"src":"img/19.jpg"}]};
     waterFall();
    //������������һ�������������ݼ���
    document.onscroll=function(){
        var fox=document.getElementById("fox");
        var last=document.getElementsByClassName("box");
          var lastBox=last[last.length-1];
        console.log(lastBox.style.top);
        //�������ĸ߶�+��ǰҳ��ĸ߶�
        var scroolH=document.body.scrollTop||document.documentElement.scrollTop+document.body.clientHeight;
        if(scroolH>lastBox.offsetHeight){
            //��������ģ���Լ��������ͼƬ��ҳ����
               var box=document.createElement("div");
               box.setAttribute("class","box");
            var pic=document.createElement("div");
            pic.setAttribute("class","pic");
            var img=document.createElement("img");
            var rand=parseInt(Math.random()*json.imgs.length);
            img.src=json.imgs[rand].src;
            fox.appendChild(box);
            box.appendChild(pic);
            pic.appendChild(img);
        }
        waterFall();
    }
}
function waterFall(){
    var imgArr=document.getElementsByClassName("box");
    var fox=document.getElementById("fox");
    //console.log(imgArr[0].offsetHeight);
    //���ÿ��box�ĸ߶�
    //var imgsH=new Array();
    //for(var i=0;i<imgArr.length;i++){
    //    imgsH[i]=imgArr[i].offsetHeight;}
    //ÿ�п����ɵ�ͼƬ��=ҳ����/ͼƬ��ȡ�
    var docX=document.body.clientWidth;
    var imgrow=parseInt(docX/imgArr[0].offsetWidth);
    fox.style.width=imgrow*imgArr[0].offsetWidth+"px";
   fox.style.marginLeft=(docX-imgrow*imgArr[0].offsetWidth)/2+"px";

    //��ȡ��һ�и߶���͵�һ��ͼƬ
    var rowArr=new Array();//���ÿһ�еĸ߶ȡ�
    //console.log(imgArr.length);
    //console.log(imgrow);
    for(var i=0;i<imgArr.length;i++){
        if(i<imgrow){
            rowArr[i]=imgArr[i].offsetHeight; }
        else{
            var minrow=Math.min.apply(null,rowArr);
            var index;
            for( var k=0;k<imgrow;k++){
                if(minrow==rowArr[k]){
                    index=k;
                }}
            imgArr[i].style.position="absolute";
            imgArr[i].style.top=minrow+"px";
            imgArr[i].style.left=imgArr[0].offsetWidth*index+"px";
            rowArr[index]=minrow+ imgArr[i].offsetHeight;
        }
    }
}
