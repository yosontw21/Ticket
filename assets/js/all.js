// 綁定DOM
const areaCard = document.querySelector('.card-ticket-area');
const searchResult = document.querySelector('.searchResult');
const selectArea = document.querySelector('.selectArea');
const btn = document.querySelector('.btn');

//DOM form
const ticketName = document.querySelector('#ticketName');
const ticketImgUrl = document.querySelector('#ticketImgUrl');
const ticketSelcetArea = document.querySelector('#ticketSelcetArea');
const ticketPrice = document.querySelector('#ticketPrice');
const ticketDescription = document.querySelector('#ticketDescription');
const ticketRate = document.querySelector('#ticketRate');
const ticketGroupNum = document.querySelector('#ticketGroupNum');
const form = document.querySelector('.formTicket');

// 監聽事件
selectArea.addEventListener('change', selectAreaInfo);
btn.addEventListener('click', checkAddFrom);

// 宣告變數，加入資料用
let data;

// AJAS撈資料
// https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json

function init() {
  axios
    .get(
      'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json'
    )
    .then(function (res) {
      data = res.data.data;
      renderC3();
      render(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

init(); // 網頁初始化

// 套入C3功能
function renderC3() {
  // 篩選地區，並累加數字上去
  let totalObj = {};
  data.forEach(function (items) {
    if (totalObj[items.area] == undefined) {
      totalObj[items.area] = 1;
    } else {
      totalObj[items.area] += 1;
    }
  });
  let newDataInfo = [];
  let area = Object.keys(totalObj);
  area.forEach(function (items) {
    let ary = [];
    ary.push(items);
    ary.push(totalObj[items]);
    newDataInfo.push(ary);
  });
  // 將 newData 丟入 c3 產生器
  const chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: newDataInfo,
      type: 'donut',
      colors: {
        高雄: '#E68618',
        台中: '#5151D3',
        台北: '#26BFC7',
      },
    },
    donut: {
      title: '套票地區比重',
    },
  });
}

// 將資料渲染至網頁
function render(data) {
  let str = '';
  data.forEach(function (items) {
    let areaCardInfo = `<li class="card-ticket col-md-4 mb-8">
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
        <span id="ticketCard-price" class="font-xl">${items.price}</span>
      </p>
    </div>
  </div>
</li>`;
    str += areaCardInfo;
  });
  areaCard.innerHTML = str;
  searchResult.textContent = `本次搜尋共 ${data.length} 筆資料`;
}

// 篩選器邏輯
function selectAreaInfo(e) {
  let newData = [];
  data.forEach(function (items) {
    if (e.target.value == items.area) {
      newData.push(items);
      render(newData);
    }
    if (e.target.value == '全部地區') {
      render(data);
    }
  });
}

// 新增套票邏輯 表單不得為空
function checkAddFrom() {
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
    renderC3();
    form.reset();
  }
}
