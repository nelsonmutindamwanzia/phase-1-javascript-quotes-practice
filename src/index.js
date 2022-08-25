document.addEventListener('DOMContentLoaded', ()=>{
    fetchQuote()
    function fetchQuote(){
        fetch('http://localhost:3000/quotes?_embed=likes')
        .then(resp => resp.json())
        .then(quote => {
            console.log(quote);
            quote.forEach(element => renderQuote(element))
        })
    }
    function renderQuote(aquote){
        let list = document.createElement('li')
        list.className = 'quote-card'
        //console.log(list);
        list.innerHTML = `
            <blockquote class="blockquote">
                <p class="mb-0">${aquote.quote}</p>
                <footer class="blockquote-footer">${aquote.author}</footer>
                <br>
                <button class='btn-success'>Likes: <span>${aquote.likes.length}</span></button>
                <button class='btn-danger'>Delete</button>
            </blockquote>
        `
        document.getElementById('quote-list').appendChild(list)
        list.querySelector('.btn-danger').addEventListener('click', ()=>{
            console.log('works');
            list.remove()
            handleDelete(aquote.id)
        })
        list.querySelector('.btn-success').addEventListener('click', (e)=>{
            console.log('likes');
            console.log(aquote.likes);
            let currentLikes = Number(list.querySelector('span').innerText)
            console.log(currentLikes)
            currentLikes++ 
            console.log(list.querySelector('span'));
            console.log(list.querySelector('span').innerHTML );
            list.querySelector('span').innerHTML = currentLikes;
            console.log(aquote.id);
            let likesObj = {
                quoteId: aquote.id,
                createdAt: 1558524356
            }
            aquote.likes = [...aquote.likes, likesObj]
            updateLikes(aquote)
        })
    }
    let form = document.getElementById('new-quote-form')
    form.addEventListener('submit', e=>{
        e.preventDefault();
        let newQuote = e.target.querySelector('#new-quote').value
        let aauthor = e.target.querySelector('#author').value   
        console.log(newQuote);
        console.log(aauthor); 
        let newQandA = {
            quote: newQuote,
            author: aauthor
        }
        //renderQuote(newQandA)
        postQuote(newQandA)
        form.reset()
    }
    )
    function postQuote(quote){
        fetch('http://localhost:3000/quotes',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(quote)
        })
        .then(resp => resp.json())
        .then(data => (data))
        .catch(err=>console.log(error.message))
    }
    function handleDelete(id){
        fetch(`http://localhost:3000/quotes/${id}`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                //Accept: 'application/json'
            }
        }
        )
        .then(resp => resp.json)
        .then(data => console.log(data))
    }
    function updateLikes(likes){
        fetch(`http://localhost:3000/likes/${likes.id}`,{
            method: "PATCH",
            headers: {
                'Content-Type':'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(likes)
        })
        .then(response=>response.json())
        .then(data=>console.log(data))
        .catch(error=>error.message)
    }
})