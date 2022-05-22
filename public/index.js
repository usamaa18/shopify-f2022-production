const baseUrl = "http://localhost:3000";
const apiImages = baseUrl + "/images/"
const apiItems = baseUrl + "/v1/items"

itemsObj = {}

async function getItems() {
    const response = await fetch(apiItems, {
        method: "GET"
    });
    return response.json();
}

function renderItem(obj) {
    document.getElementById()
}

getItems().then(data => {
    console.log(data.list);
    data.list.forEach(item => {
        itemsObj[item._id] = item;

        document.getElementById("item-list").innerHTML += 
        `
        <div class="col"  id=${item._id}>
        <div class="card">
            <img src="${item.image ? apiImages + item.image : ""}" class="card-img-top">
            <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.desc ? item.desc : ""}</p>
            </div>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">Count: ${item.count}</li>
            <li class="list-group-item">Price: $${item.price}</li>
            <li class="list-group-item">A third item</li>
            </ul>
            <div class="card-body">
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
            </div>
        </div>
        </div>
        `;
    })
})




window.onload = function () {
    const template = (itemId) => `/v1/items/${itemId}`;
    document.getElementById('editForm').addEventListener('submit', function (s) {
        s.preventDefault();
        this.action = template(document.getElementById('editItemId').value);
        this.submit();
    });
    document.getElementById('deleteForm').addEventListener('submit', function (s) {
        s.preventDefault();
        $.ajax({
            url: template(document.getElementById('deleteItemId').value),
            type: 'DELETE',
            complete: function (result) {
                alert(result.responseText);
            }
        });
    });




    document.getElementById('de')

}