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
            <a href="#" class="navbar-brand">
            <img src="https://api.faviconkit.com/${item.domain}" alt="...">
            ${item.name} - ${item.domain}
            </a>
            </h2>
            <p class="text-muted">
              Username
              <input type="text" class="form-control" value="${item.username}" readonly="readonly">
            </p>
            <p class="text-muted">
              Passwort
              <div class="input-group">
              <input type="password" class="form-control" value="${item.password}" id="pwField${index}">
              <div class="input-group-append">
                <span class="input-group-text" onclick="toggleEye('pwField${index}', 'cEye${index}')" data-toggle="tooltip" data-title="show password"><i class="fas fa-eye-slash" id="cEye${index}"></i></span>
                <span class="input-group-text" onclick="copyPassword('pwField${index}')" data-toggle="tooltip" data-title="copy Password to Clipboard"><i class="fas fa-copy"></i></span>
              </div>
            </div>
            </p>
            <div class="text-right">
              <!-- text-right = text-align: right -->
              <a href="#" class="btn"><i class="fas fa-pen"></i> Edit</a>
            </div>
          </div>
        </div>
        `
    });
}

function toggleEye(showPW, cEye) {
    var element = document.getElementById(showPW)
    var eye = document.getElementById(cEye)
    if (element.type == "password") {
        element.type = "text";
        eye.classList.remove('fa-eye-slash')
        eye.classList.add('fa-eye')
        return
    } if (element.type == "text") {
        element.type = "password";
        eye.classList.remove('fa-eye')
        eye.classList.add('fa-eye-slash')
        return
    }
}

function copyPassword(id) {
    /* Get the text field */
    var copyText = document.getElementById(id);
    navigator.clipboard.writeText(copyText.value)
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");
    halfmoon.initStickyAlert({
        content: "Your Password was copied to your Clipboard, use <kbd>STRG+V</kbd> to paste it in.",
        title: "copied",
        alertType: "alert-success",
        fillType: "filled-lm"
      });
}


function generatePassword(state) {
    var content = document.getElementById("new_password")
    var length = 30,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!.,-_+#?%&*?",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    content.value = retVal
    console.log(retVal)
}