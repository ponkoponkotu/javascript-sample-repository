//link タグid
const pageSS = document.getElementById("PageStyleSheet");

//ボタン群のid
const change = document.getElementById('change');
//ボタン群
const arrayButtons = ['defau','water','forest','wood','sky','space','veanus'];

//左右のカラーボタン(canvas)
const arrayColor1 = document.getElementById('arrayColor1');
const arrayColor2 = document.getElementById('arrayColor2');

//canvas に指定する色(id,関数名)
const arrayColors = ['pink','hotpink','red','orange','yellow','limegreen','turquoise','blue','navy','purple'];

//clock_date clock_time 含むdiv
const clock = document.getElementById("clock");



//---------------------時計の表示----------------------//

const Clock = () => {
    //現在の日時の取得
    const d = new Date();

    //年を取得
    let year = d.getFullYear();
    //月を取得
    let month = d.getMonth() + 1;
    //日を取得
    let date = d.getDate();
    //曜日を取得
    let dayNum = d.getDay();
    const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let day = weekday[dayNum];
    //時を取得
    let hour = d.getHours();
    //分を取得
    let min = d.getMinutes();
    //秒を取得
    let sec = d.getSeconds();

    //1桁の時は0を足して2桁にする
    month = month< 10? "0"+ month: month;
    date = date < 10 ? "0" + date : date;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    //文字列の作成
    let today = `${year}.${month}.${date} ${day}`;
    let time = `${hour}:${min}:${sec}`;

    //文字列の出力
    document.querySelector(".clock-date").innerText = today;
    document.querySelector(".clock-time").innerText = time;
};

//1秒ごとにclock関数を呼び出し
setInterval(Clock,1000);



//--------------------ボタン群の生成---------------------//

for(let i = 0; i< arrayButtons.length; i++){

    theButton = arrayButtons[i];

    //id名の指定(インデックス始まり0のため+1)
    let btnStr = `change_btn${i+1}`;
    //ボタン生成
    let change_button = document.createElement('button');
    //ボタンのidを指定
    change_button.setAttribute('id',`${btnStr}`);
    //onclick 属性を指定
    change_button.setAttribute('onclick',`changeButton(${i+1})`);
    //ボタンの表示テキストの指定
    change_button.innerHTML = theButton;

    //p 段落を作成
    let p_button = document.createElement('p');
    //p 内末尾にボタンを追加
    p_button.appendChild(change_button);

    //ボタン群の末尾に追加
    change.appendChild(p_button);
}



//----------------虹色・canvasの生成----------------------//

function rainbow(){

    while (arrayColor1.firstChild){
        arrayColor1.removeChild(arrayColor1.firstChild);
    }
    while (arrayColor2.firstChild){
        arrayColor2.removeChild(arrayColor2.firstChild);
    }
    
    //let elem = document.getElementById("PageStyleSheet");
    pageSS.href = 'common/css/clock_rainbow.css'

    //div arrayColor1 への書き込み
    for(let i = 0; i< arrayColors.length/2; i++){
        theColor = arrayColors[i];

        //id名作成(インデクス番号だと0があるため1を足す)
        let btnStr = `btn${i+ 1}`;
        //canvas の作成
        let canvas = document.createElement('canvas');
        //canvas にidを指定
        canvas.setAttribute('id',`${btnStr}`);
        //onclick 属性の指定
        canvas.setAttribute('onclick',`changeColor(${i+1})`);
        //arayColor1 末尾に追加
        arrayColor1.appendChild(canvas);
    }

    //div arrayColor2 への書き込み(処理はarrayColor1同様)
    for(let i = arrayColors.length/2; i< arrayColors.length; i++){
        theColor = arrayColors[i];

        let btnStr = `btn${i+ 1}`;
        
        let canvas = document.createElement('canvas');
        
        canvas.setAttribute('id',`${btnStr}`);
        
        canvas.setAttribute('onclick',`changeColor(${i+1})`);

        arrayColor2.appendChild(canvas);

    }

    //canvas に円を描いて色を付ける
    for(let i = 0; i< arrayColors.length; i++){
        
        //作成したcanvas のidを取得
        let canvas_circle = document.getElementById(`btn${i + 1}`);

        //2次元描写
        let circle = canvas_circle.getContext('2d');
        //パスの作成
        circle.beginPath();
        //正円を描く arc(x,y,半径,開始角度,正円)
        circle.arc(150, 75, 50, 0, Math.PI * 2, true);
        //色
        circle.fillStyle = `${arrayColors[i]}`;
        //塗りつぶし
        circle.fill();
    }

    
}



//------------------色の判定と時計の色の変化--------------------//

function changeColor(e){

    //arrayColorsリストから色を特定する
    let index = e - 1;
    theColor = arrayColors[index];

    //id名を取得(確認のため取得処理には使っていない)
    //let buttonStr = "btn" + e;
    //let id = document.getElementById(buttonStr);
    //console.log(theColor);

    //クリックしたclass名がclockに含まれていたら
    //class名を削除し時計の色をデフォルトに戻す
    if(clock.classList.contains(theColor)){
        clock.classList.remove(theColor);

        }else{
            //含まれていなかったらclass名をまとめて削除
            clock.classList.remove(...arrayColors);

            //クリックしたボタンのclass名を付与する
            clock.classList.add(`${theColor}`);
    };   
};



//--------------ボタンの判定と背景切り替え----------------//

function changeButton(e){

    //リストからボタンの特定
    let index = e - 1;
    theButton = arrayButtons[index];

    //cssを一度rainbowに設定
    //削除の際にエラーが出るため、現時点での対処法
    pageSS.href = 'common/css/clock_rainbow.css';

    //css ファイル該当するものに変更する
    pageSS.href = `common/css/clock_${theButton}.css`;

    arrayColor1.innerHTML='';
    arrayColor2.innerHTML='';
}



//---------------------------------------------------//

