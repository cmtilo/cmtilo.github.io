document.querySelector('.options').addEventListener('click', (e) => {
  e.preventDefault()
  const values = e.target.value
  if (!values) {
    return
  }
  changeResult(values)
})

function changeResult(values) {
  let ans = '123'
  let color = values.toString()
  console.log(color == 'red')

  if (color == 'red') {
    ans = '廁所洗手台櫃'
  } else if (color == 'yellow') {
    ans = '神明廳小冰箱'
  } else if (color == 'white') {
    ans = '陽台三角櫃'
  } else {
    ans = '頂樓抽風扇'
  }
  document.querySelector('.result').classList.remove('hide')
  document.querySelector('.answer').innerText = ans
  window.scrollTo(0, document.body.scrollHeight)
}
