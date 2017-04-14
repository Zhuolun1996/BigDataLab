var dataCarousel = function(){
    var wrap = document.getElementById('data-carousel');
    var data = [
        {"title":'Title 1',"content":'Some attention grabbing details', "image": '/static/img/carousel1.png'},
        {"title":'Title 2',"content":'Some attention grabbing details again', "image": '/static/img/carousel2.png'},
        {"title":'Title 3',"content":'Some attention grabbing details and again', "image": '/static/img/carousel3.png'},
        {"title":'Title 4',"content":'Some attention grabbing details again and again', "image": '/static/img/carousel4.png'},
        {"title":'Title 5',"content":'Some attention grabbing details one more', "image": '/static/img/carousel5.png'}
    ];

    carousel(wrap, data, 566, 208);

    function carousel(wrap, data, width, height){
        var ul = document.createElement('ul');
        var banner = document.createElement('div');

        var index = 0,
            timer;

        for(var i=0, j= data.length + 1; i<j; i++){
            var li = document.createElement('li');
            var img = document.createElement('img');
            if(i == data.length){
                img.src = data[0].image;
            }
            else{ 
                img.src = data[i].image;
            }
            li.style.width = img.style.width = width + 'px';
            li.appendChild(img);
            ul.appendChild(li);
        }

        wrap.appendChild(ul);
        wrap.appendChild(banner);

        wrap.style.width = banner.style.width = width + 'px';
        wrap.style.height = height + 'px';
        ul.style.width = (data.length + 1) * width +'px';
        banner.innerHTML = '<h3>' + data[index].title + '</h3>'  + '<p>' + data[index].content + '</p>';


        var timer = setInterval(function(){

            move(banner, {bottom: -50}, 1000, 'linear', function(){
                index++;
                move(ul, {left: index*(-width)}, 1000, 'easeBoth', function(){

                    if(index >= data.length) ul.style.left = index = 0;

                    banner.innerHTML = '<h3>' + data[index].title + '</h3>' + '<p>' + data[index].content + '</p>';

                    move(banner, {bottom: 0}, 1000, 'linear');

                    });

                });

                }, 4000);
        }
}


window.addEventListener("load", dataCarousel); 
window.addEventListener("load", function(){
        var config = {
        vx: 4,//点x轴速度,正为右，负为左
        vy:  4,//点y轴速度
        height: 2,//点高宽，其实为正方形，所以不宜太大
        width: 2,
        count: 100,//点个数
        color: "121, 162, 185",//点颜色
        stroke: "130,255,255",//线条颜色
        dist: 6000,//点吸附距离
        e_dist: 20000,//鼠标吸附加速距离
        max_conn: 10//点到点最大连接数
    }
    //调用
    CanvasParticle(config);
}); 

