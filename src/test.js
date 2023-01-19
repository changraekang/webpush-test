const openPopup = () => {
    const Div = document.createElement("div");
    Div.id = "dmpush";
    document.body.appendChild(Div);
    Div.innerHTML = `
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
        <button
          id="regretBtn" 
          style= "
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
}

setTimeout(() => {
    openPopup();
}, 3000)