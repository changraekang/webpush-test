const openPopup = () => {
  const Div = document.createElement("div");
  Div.id = "dmpush";
  document.body.appendChild(Div);
  Div.innerHTML = `
  <article style="
      position:fixed;
      z-index: 10000;
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
      <h1 style="font-size: 24px; padding-bottom:16px;">${dmpush_title}</h1>
      <p style="font-size: 16px; padding-bottom:16px;">${dmpush_content}</p>
      <div 
      style="display: flex;
      justify-content: center;
      gap: 12px;"
      >
      <button
        id="regretBtn" 
        style= "
          cursor: pointer;
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
          cursor: pointer;
          display: block;
          width: 100px;
          border: none;
          padding: 10px 12px;
          border-radius: 8px;
          background: #7124D3;
          color: #fff;
          font-size: 16px;
          font-weight: 600; 
          cusor: pointer;
          text-align: center;"   
      >
          알림 받기
      </button>
      </div>
  </article>
  `;

  function setCookie(name,value,expireDays) {
      let today = new Date;
      today.setDate(today.getDate() + expireDays);
      document.cookie = name + "=" + value + "; expires=" + today + ";"
  }

  const agreeBtn = document.querySelector("#agreeBtn");
  const regretBtn = document.querySelector("#regretBtn");
  let popupWidth = 500;
  let popupHeight = 500;
  let popupX = window.screen.width / 2 - popupWidth / 2;
  let popupY = window.screen.height / 2 - popupHeight / 2;
  
  agreeBtn.addEventListener("click", () => {
    window.open(
      `https://api.dmpush.kr/popup?push_id=${pid}`,
      "demo",
      "status=no, height=" +
        popupHeight +
        ", width=" +
        popupWidth +
        ", left=" +
        popupX +
        ", top=" +
        popupY +
        ",menubar=no, toolbar=no, resizable=no"
    );

    Div.remove();
  });

  regretBtn.addEventListener("click", () => {
      setCookie("delayPopup", "close", 7);
      Div.remove();
  });
};

setTimeout(() => {
  if(document.cookie.indexOf("delayPopup=close") < 0) {
      openPopup();
  }
}, 3000);