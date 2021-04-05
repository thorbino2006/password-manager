var data = [
    {
        "name": "Google",
        "domain": "google.com",
        "username": "thorben",
        "password": "1234!" 
    },
    {
        "name": "Discord",
        "domain": "discord.com",
        "username": "thorbino",
        "password": "discord123!" 
    }
]

function init() {
      loadPasswords()
}
init()

function loadPasswords() {
    var content = document.getElementById("content")
    data.forEach(function (item, index) {
        console.log(item, index);
        content.innerHTML += `
        <div class="w-400 mw-full">
          <!-- w-400 = width: 40rem (400px), mw-full = max-width: 100% -->
          <div class="card">
            <h2 class="card-title">
              ${item.name} - ${item.domain}
            </h2>
            <p class="text-muted">
              Username
              <input type="text" class="form-control" value="${item.username}" readonly="readonly">
            </p>
            <p class="text-muted">
              Passwort
              <input type="password" class="form-control" value="${item.password}" readonly="readonly">
            </p>
            <div class="text-right">
              <!-- text-right = text-align: right -->
              <a href="#" class="btn">Read more</a>
            </div>
          </div>
        </div>
        `
      }); 
}