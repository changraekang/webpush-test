const openDemo = () => {
    const container = document.querySelector('#demo');
    console.log(container, "container");
    container.innerHTML = `
    <article style="
        position:fixed;
        z-index: 10;
        left:50%;
        right:50%;
        top: 10px;
        transform: translateX(-50%);
        width: 500px;
        box-sizing: border-box;
        padding: 20px;
        background-color: #fff;
        border-radius: 16px;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);"
    >
        <h1 style="font-size: 24px; padding-bottom:16px;">🎉 푸시 알림 받기</h1>
        <p style="font-size: 16px; padding-bottom:16px;">지금 푸시 알림을 구독하고 디엠푸시의 중요한 최신 소식들을 가장 먼저 받아보세요</p>
        <div 
        style="display: flex;
        justify-content: center;
        gap: 12px;"
        >
        <button style= "
            display: block;
            width: 100px;
            border: none;
            padding: 10px 12px;
            border-radius: 8px;
            background: #7124D3;
            color: #fff;
            font-size: 16px;
            font-weight: 600;
            text-align: center;
            
            id="regretBtn"
        >
            다음에
        </button>
        <button 
          id="agreeBtn"
          style="
            display: block;
            width: 100px;
            border: none;
            padding: 10px 12px;
            border-radius: 8px;
            background: #7124D3;
            color: #fff;
            font-size: 16px;
            font-weight: 600; 
            text-align: center;"   
        >
            알림 받기
        </button>
        </div>
    </article>
    `
    const agreeBtn = document.querySelector('#agreeBtn');
    let popupWidth = 500;
    let popupHeight = 500;

    let popupX = (window.screen.width / 2) - (popupWidth / 2);
    // 만들 팝업창 width 크기의 1/2 만큼 보정값으로 빼주었음

    let popupY= (window.screen.height / 2) - (popupHeight / 2);
    // 만들 팝업창 height 크기의 1/2 만큼 보정값으로 빼주었음
    // http://dev2023.dmpush.kr:8080?site=${pid}
    agreeBtn.addEventListener('click',()=> {
        window.open('http://dev2023.dmpush.kr:8080', "demo",'status=no, height=' + popupHeight  + ', width=' + popupWidth  + ', left='+ popupX + ', top='+ popupY + ",menubar=no, toolbar=no, resizable=no" );

        container.remove();
    })
}

setTimeout(() => {openDemo()}, 3000);
