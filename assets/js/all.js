// 綁定DOM
const listCardArea = document.querySelector('.card-ticket-area');
const btn = document.querySelector('.btn');
const selectArea = document.querySelector('.selectArea');
const searchResult = document.querySelector('.searchResult');

// DOM form
const ticketName = document.querySelector('#ticketName');
const ticketImgUrl = document.querySelector('#ticketImgUrl');
const ticketSelcetArea = document.querySelector('#ticketSelcetArea');
const ticketPrice = document.querySelector('#ticketPrice');
const ticketDescription = document.querySelector('#ticketDescription');
const ticketRate = document.querySelector('#ticketRate');
const ticketGroupNum = document.querySelector('#ticketGroupNum');
const form = document.querySelector('.formTicket');

let data = [];

// API撈資料
axios
  .get(
    'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json'
  )
  .then(function (res) {
    data = res.data.data; //選取資料內容
    render(data);
  });

// 撈取資料渲染到網頁
function render(data) {
  // 預設值
  let str = '';
  data.forEach(function (items) {
    let cardContent = `<li class="card-ticket col-md-4 mb-8 ">
    <div class="ticket-img position-relative">
      <a href="">
        <img src="${items.imgUrl}" alt="" class="bg-cover w-100">
      </a>
      <div class="card-ticket-region font-md">${items.area}</div>
      <div class="card-ticket-rank font-md">${items.rate}</div>
    </div>

    <div class="p-4 card-border">
      <h3 class="text-primary font-lg border-bottom-3 mb-3 pb-1">${items.name}</h3>
      <p class="text-info mb-7">${items.description}</p>
      <div class="d-flex justify-content-between align-items-center">
        <p class="text-primary  font-weight-bold">
          <span class="material-icons">
            error
          </span>
          剩下最後 <span id="ticketCard-num"> ${items.group} </span> 組
        </p>
        <p class="d-flex align-items-center text-primary  font-weight-bold">
          <span>TWD</span>
          <span id="ticketCard-price" class="font-xl">$${items.price}</span>
        </p>
      </div>
    </div>
  </li>`;
    str += cardContent;
  });
  listCardArea.innerHTML = str;
  searchResult.textContent = `本次搜尋共 ${data.length} 筆資料`;
}

render(data); // 第一次初始化 參數為初始 data 陣列

//篩選器邏輯;
selectArea.addEventListener('change', function (e) {
  let newData = []; // 新陣列
  data.forEach(function (items) {
    if (e.target.value == items.area) {
      newData.push(items);
      render(newData);
    }
    if (e.target.value == '全部地區') {
      render(data);
    }
  });
});

// 加入監聽
btn.addEventListener('click', checkForm);

// 確認表單不得為空 新增邏輯
function checkForm() {
  if (ticketName.value == '') {
    alert('未輸入套票名稱');
    return;
  } else if (ticketImgUrl.value == '') {
    alert('未輸入圖片網址');
    return;
  } else if (ticketSelcetArea.value == '') {
    alert('未輸入景點地區');
    return;
  } else if (ticketPrice.value == '') {
    alert('未輸入套票金額');
    return;
  } else if (ticketGroupNum.value == '') {
    alert('未輸入套票組數');
    return;
  } else if (
    ticketRate.value == '' &&
    ticketRate.value >= 1 &&
    ticketRate.value <= 10
  ) {
    alert('未輸入套票星級');
    return;
  } else if (ticketDescription.value == '') {
    alert('未輸入套票描述');
    return;
  } else {
    alert('新增旅遊套票成功!!');
    let obj = {
      id: data.length,
      name: ticketName.value,
      imgUrl: ticketImgUrl.value,
      area: ticketSelcetArea.value,
      price: Number(ticketPrice.value),
      group: Number(ticketGroupNum.value),
      rate: Number(ticketRate.value),
      description: ticketDescription.value,
    };
    data.push(obj);
    render(data);
    form.reset();
  }
}
