const form = document.querySelector('form')
const options_left = document.getElementsByName('opt_usage_l')
const options_right = document.getElementsByName('opt_usage_r')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let lString = ''
  let rString = ''
  for (l of options_left) {
    if (l.checked) {
      lString += l.value
    }
  }
  for (r of options_right) {
    if (r.checked) {
      rString += r.value
    }
  }
  console.log(lString, rString)
  console.log(findMark(lString, rString))
  changeResult(findMark(lString, rString), lString, rString)
})

function changeResult(mark, lString, rString) {
  const { ans, des } = ANSWER[mark]
  document.querySelector('.result').classList.remove('hide')
  document.querySelector('.ans_val').innerText = `${lString} → ${rString}`
  document.querySelector('.ans_ans').innerText = ans
  document.querySelector('.ans_des').innerText = des
  window.scrollTo(0, document.body.scrollHeight)
}

const ANSWER = {
  blank: {
    ans: '此為同類組，無須辦理變更使用執照。',
    des: '',
  },
  cross: {
    ans: '須辦理變更使用執照，請依規定委託開業建築師辦理。',
    des: '',
  },
  crossH2: {
    ans: '須辦理變更使用執照，請依規定委託開業建築師辦理。',
    des: '但已變更為他種類組使用之建築物，擬恢復為原領使用執照核定H2類組住宅或集合住宅，且使用樓地板面積未達300平方公尺者，免辦理變更使用執照。',
  },
  five: {
    ans: '變更使用範圍之總樓地板面積未達500平方公尺者，免辦理變更使用執照。',
    des: '500平方公尺以上者，須辦理變更使用執照，請依規定委託開業建築師辦理。',
  },
  fiveD1: {
    ans: '變更使用範圍之總樓地板面積未達500平方公尺，且變更為室內兒童樂園、健身房、室內操練場、室內體育場所、室內高爾夫球練習場及健身休閒中心等使用項目，免辦理變更使用執照。',
    des: '非變更為上述使用項目者，須辦理變更使用執照，請依規定委託開業建築師辦理。',
  },
  fiveD2: {
    ans: '變更使用範圍之總樓地板面積未達500平方公尺，且變更為會議廳、展示廳、圖書館、文康中心、集會堂(場)及社區(里)活動中心等使用項目，免辦理變更使用執照。',
    des: '非變更為上述使用項目者，須辦理變更使用執照，請依規定委託開業建築師辦理。',
  },
  asterisk: {
    ans: '限設於地面一層面積在500平方公尺以下或設於二層至五層之任一層面積在300平方公尺以下，且樓梯寬度達1.2公尺以上、分間牆及室內裝修材料符合建築技術規則之規定者，免辦理變更使用執照。',
    des: '非上述情形者，須辦理變更使用執照，請依規定委託開業建築師辦理。 ',
  },
  circle: {
    ans: '限於第一層使用，且變更使用範圍之總樓地板面積未達300平方公尺者，免辦理變更使用執照。',
    des: '非上述情形者，須辦理變更使用執照，請依規定委託開業建築師辦理。',
  },
  three: {
    ans: '變更使用範圍之總樓地板面積未達300平方公尺者，免辦理變更使用執照。',
    des: '300平方公尺以上者，須辦理變更使用執照，請依規定委託開業建築師辦理。',
  },
  two: {
    ans: '建築物附建樓地板面積未達200平方公尺之防空避難設備，依「桃園市一定規模以下建築物免辦理變更使用執照管理辦法」第三條規定程序兼作他種用途之臨時使用者，免辦理變更使用執照。',
    des: '',
  },
  doubleCircles: {
    ans: '限於第一層供汽(機)車修理(保養)場、洗車場使用，且變更使用範圍之總樓地板面積未達200平方公尺者，免辦理變更使用執照。',
    des: '非上述情形者，須辦理變更使用執照，請依規定委託開業建築師辦理。',
  },
  one: {
    ans: '限於第一層使用，且變更使用範圍之總樓地板面積未達100平方公尺者；C1、C2類組以工廠依消防法規定兼作I類別之公共危險物品儲存場所為限。',
    des: '非上述情形者，須辦理變更使用執照，請依規定委託開業建築師辦理。',
  },
  triangle: {
    ans: '供餐廳、飲食店、飲料店、理髮場所、按摩場所、美容院等使用項目，且變更使用範圍之總樓地板面積未達300平方公尺；或供其它使用項目使用，其變更使用範圍之總樓地板面積未達500平方公尺者，免辦理變更使用執照。',
    des: '非上述情形者，須辦理變更使用執照，請依規定委託開業建築師辦理。',
  },
}

function findMark(s1, s2) {
  let mark = 'cross'
  if (s2 === 'B2' && s1 === 'A2') {
    mark = 'five'
  }
  if (s2 === 'B3') {
    if (
      s1 === 'A1' ||
      s1 === 'A2' ||
      s1 === 'B1' ||
      s1 === 'B2' ||
      s1 === 'B4'
    ) {
      mark = 'five'
    }
  }
  if (s2 === 'C1' || s2 === 'C2') {
    if (s1 !== 'I' || s1 !== 'O') {
      mark = 'doubleCircles'
    }
  }
  if (s2 === 'D1') {
    if (
      s1 === 'A1' ||
      s1 === 'A2' ||
      s1 === 'B1' ||
      s1 === 'B2' ||
      s1 === 'B3' ||
      s1 === 'B4' ||
      s1 === 'D2' ||
      s1 === 'D3' ||
      s1 === 'D4'
    ) {
      mark = 'fiveD1'
    }
  }
  if (s2 === 'D2') {
    if (
      s1 === 'A1' ||
      s1 === 'A2' ||
      s1 === 'B2' ||
      s1 === 'B3' ||
      s1 === 'B4' ||
      s1 === 'D1' ||
      s1 === 'D3' ||
      s1 === 'D4'
    ) {
      mark = 'fiveD2'
    }
  }
  if (s2 === 'D5') {
    if (s1 === 'D3' || s1 === 'D4') {
      mark = 'three'
    }
  }
  if (s2 === 'E') {
    if (
      s1 === 'B1' ||
      s1 === 'B2' ||
      s1 === 'B3' ||
      s1 === 'B4' ||
      s1 === 'C1' ||
      s1 === 'C2' ||
      s1 === 'D3' ||
      s1 === 'D4' ||
      s1 === 'D5' ||
      s1 === 'F1' ||
      s1 === 'F4' ||
      s1 === 'G1' ||
      s1 === 'G2' ||
      s1 === 'G3' ||
      s1 === 'H1' ||
      s1 === 'H2'
    ) {
      mark = 'circle'
    }
  }
  if (s2 === 'F1') {
    if (s1 === 'D2' || s1 === 'D3' || s1 === 'D4' || s1 === 'G2') {
      mark = 'circle'
    }
  }
  if (s2 === 'F2') {
    if (s1 === 'D2' || s1 === 'D3' || s1 === 'D4') {
      mark = 'circle'
    }
  }
  if (s2 === 'F3') {
    if (
      s1 === 'A1' ||
      s1 === 'A2' ||
      s1 === 'D2' ||
      s1 === 'D3' ||
      s1 === 'D4' ||
      s1 === 'E' ||
      s1 === 'F2' ||
      s1 === 'G2'
    ) {
      mark = 'five'
    } else if (s1 === 'H1' || s1 === 'H2') {
      mark = 'circle'
    }
  }
  if (s2 === 'F4' && s1 === 'F1') {
    mark = 'five'
  }
  if (s2 === 'G1') {
    if (s1 !== 'I' || s1 !== 'O') {
      mark = 'one'
    }
  }
  if (s2 === 'G2') {
    if (s1 === 'O') {
      mark = 'two'
    } else if (s1 === 'H1' || s1 === 'H2' || s1 === 'I') {
      mark = 'three'
    } else {
      mark = 'five'
    }
  }
  if (s2 === 'G3') {
    if (s1 === 'O') {
      mark = 'two'
    } else if (s1 === 'I') {
      mark = 'three'
    } else {
      mark = 'triangle'
    }
  }
  if (s2 === 'H1') {
    if (s1 === 'H2') {
      mark = 'circle'
    } else if (s1 === 'B4' || s1 === 'E') {
      mark = 'three'
    } else if (
      s1 === 'A1' ||
      s1 === 'C2' ||
      s1 === 'D2' ||
      s1 === 'D3' ||
      s1 === 'D4' ||
      s1 === 'F1' ||
      s1 === 'F2' ||
      s1 === 'F3' ||
      s1 === 'F4' ||
      s1 === 'G2'
    ) {
      mark = 'five'
    }
  }
  if (s2 === 'H2') {
    if (
      s1 === ' A1' ||
      s1 === 'B4' ||
      s1 === 'D2' ||
      s1 === 'D3' ||
      s1 === 'D4' ||
      s1 === 'E' ||
      s1 === 'F1' ||
      s1 === 'F2' ||
      s1 === 'F3' ||
      s1 === 'F4' ||
      s1 === 'G1' ||
      s1 === 'G2' ||
      s1 === 'G3' ||
      s1 === 'H1'
    ) {
      mark = 'asterisk'
    } else {
      mark = 'crossH2'
    }
  }
  if (s2 === 'I') {
    if (s1 === 'C1' || s1 === 'C2') {
      mark = 'one'
    }
  }
  if (s1 === s2) {
    mark = 'blank'
  }
  return mark
}
