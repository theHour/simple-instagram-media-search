const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let list = document.getElementsByClassName('search')[0];
list.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode == 13) {
        getData();
    }
})


function getData() {
    let searchElement = document.getElementsByClassName('search')[0];
    let search = document.getElementsByClassName('search')[0].value;
    let error = document.getElementById('error');
    console.log(search);
    if (search === "") {
        error.setAttribute('style', 'display:block');
        error.innerHTML = "Please enter username in order to proceed!";
    }
    else {

        fetch(`/api/user/${search}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                let mainEl = document.getElementsByClassName('container-flex')[0];
                if (data.test || data.items.length === 1 || data.items.length === 0) {
                    error.setAttribute('style', 'display: block');
                    error.innerHTML = `No photos found for ${search}! Please search again!`;
                    searchElement.value = "";
                    mainEl.innerHTML = "";
                }
                else {
                    error.innerHTML = "";
                    error.setAttribute('style', 'display: none');
                    searchElement.value = "";
                    mainEl.innerHTML = "";
                    for (let i = 0; i < data.items.length - 1; i++) {
                        let div1 = document.createElement('div');
                        div1.className = 'content';

                        //this can be added to separate function
                        let div2 = document.createElement('div');
                        div2.className = 'card';
                        div1.appendChild(div2);
                        let img = document.createElement('img');
                        img.setAttribute('style', 'width: 100%');
                        img.src = data.items[i].images.low_resolution.url;
                        div2.appendChild(img);
                        let div3 = document.createElement('div');
                        div3.className = 'container';
                        div2.appendChild(div3);
                        let heading = document.createElement('h6');
                        heading.innerHTML = data.items[i].caption.text;
                        div3.appendChild(heading);
                        let para = document.createElement('p');
                        let date = new Date(parseInt(data.items[i].created_time) * 1000);
                        para.innerHTML = `Published at: ${date.getDate()}/${months[date.getMonth()]}/${date.getFullYear()}`;
                        div3.appendChild(para);
                        let link = document.createElement('a');
                        //set link and set target to _blank
                        link.href = data.items[i].link;
                        link.setAttribute('target', '_blank');
                        link.appendChild(div1);
                        mainEl.appendChild(link);
                    }
                }
            });
    }
}