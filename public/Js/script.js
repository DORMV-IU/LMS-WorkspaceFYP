const header = document.querySelector('.heading')
fetch('../header.html')
.then(res=>res.text())
.then(data=>{
    console.log('hello from console')
    header.innerHTML = data
})
