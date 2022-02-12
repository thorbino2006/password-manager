var data = []
var currentID = -1

function init() {
  if (window.location.href.includes("#")) window.location.href = "/"
  data = JSON.parse(localStorage.getItem('passwords'))
  loadPasswords()
}
init()

function loadPasswords() {
  var content = document.getElementById("content")
  content.innerHTML = ``
  if (data === null) {
    localStorage.setItem('passwords', "[]")
  }
  data.forEach(function (item, index) {
    content.innerHTML += `
        <div class="col-12 col-sm-12 col-md-6 col-lg-4">
          <!-- w-400 = width: 40rem (400px), mw-full = max-width: 100% -->
          <div class="card">
            <h2 class="card-title">
            <a href="https://${item.domain}" target="_blank" class="navbar-brand">
            <img src="https://api.faviconkit.com/${item.domain}" alt="...">
            ${item.name} - ${item.domain}
            </a>
            </h2>
            <p class="text-muted">
              Username
              <div class="input-group">
              <input type="text" class="form-control" value="${item.username}" id="usernameField${index}" readonly="readonly">
              <div class="input-group-append">
                <span class="input-group-text" onclick="copyUsername('usernameField${index}')" data-toggle="tooltip" data-title="copy username to Clipboard"><i class="fas fa-copy"></i></span>
              </div>
              </div>
            </p>
            <p class="text-muted">
              Password
              <div class="input-group">
              <input type="password" class="form-control" value="${item.password}" id="pwField${index}">
              <div class="input-group-append">
                <span class="input-group-text" onclick="toggleEye('pwField${index}', 'cEye${index}')" data-toggle="tooltip" data-title="show password"><i class="fas fa-eye-slash" id="cEye${index}"></i></span>
                <span class="input-group-text" onclick="copyPassword('pwField${index}')" data-toggle="tooltip" data-title="copy password to Clipboard"><i class="fas fa-copy"></i></span>
              </div>
            </div>
            </p>
            <div class="text-right">
              <!-- text-right = text-align: right -->
              <a href="#edit" class="btn" onclick="load_editEntry('${index}')"><i class="fas fa-pen"></i> Edit</a>
            </div>
          </div>
        </div>
        `
  });
}

function copyUsername(id) {
  /* Get the text field */
  var copyText = document.getElementById(id);
  navigator.clipboard.writeText(copyText.value)
  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");
  halfmoon.initStickyAlert({
    content: "The Username was copied to your Clipboard, use <kbd>STRG+V</kbd> to paste it in.",
    title: "copied",
    alertType: "alert-success",
    fillType: "filled-lm"
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
  var content = document.getElementById(state + "_password")
  var length = 30,
    charset = "!.,-_+#?%&*?abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  content.value = retVal
}

function new_entry() {
  var name = document.getElementById("new_name").value
  var domain = document.getElementById("new_domain").value
  var username = document.getElementById("new_username").value
  var password = document.getElementById("new_password").value
  if (data === null) {
    console.log("alles leer")
  }
  data.push({
    "name": name,
    "domain": domain,
    "username": username,
    "password": password
  })
  localStorage.setItem('passwords', JSON.stringify(data));
  window.location.href = "#"
  loadPasswords()
}

function downloadFile() {
  var content = JSON.stringify(data)
  // any kind of extension (.txt,.cpp,.cs,.bat)
  var filename = "passwords.json";

  var blob = new Blob([content], {
    type: "text/plain;charset=utf-8"
  });

  saveAs(blob, filename);
}

function uploadFile() {
  document.getElementById("fileDialogId").click()
}
$("#fileDialogId").on('change', function () {
  const file = this.files[0]
  var reader = new FileReader();
  reader.readAsText(file, "UTF-8");
  reader.onload = function (evt) {
    data = JSON.parse(evt.target.result);
    localStorage.setItem('passwords', JSON.stringify(data))
    loadPasswords()
    halfmoon.initStickyAlert({
      content: "Data was imported successfully",
      title: "Success!",
      alertType: "alert-success",
      fillType: "filled-lm"
    });
  }
})

function edit_entry() {
  var name = document.getElementById("edit_name").value
  var domain = document.getElementById("edit_domain").value
  var username = document.getElementById("edit_username").value
  var password = document.getElementById("edit_password").value

  data[currentID].name = name
  data[currentID].domain = domain
  data[currentID].username = username
  data[currentID].password = password
  localStorage.setItem('passwords', JSON.stringify(data))
  window.location.href = "#"
  loadPasswords()
  halfmoon.initStickyAlert({
    content: "the entry was edited successfully",
    title: "Edited",
    alertType: "alert-secondary",
    fillType: "filled-lm"
  });
}

function load_editEntry(id) {
  document.getElementById("edit_name").value = data[id].name
  document.getElementById("edit_domain").value = data[id].domain
  document.getElementById("edit_username").value = data[id].username
  document.getElementById("edit_password").value = data[id].password
  currentID = id
}

function delete_entry() {
  if (currentID == 0) {
    data.shift()
  }
  if (currentID !== 0) {
    data.splice(currentID, currentID)
  }
  localStorage.setItem('passwords', JSON.stringify(data))
  window.location.href = "#"
  loadPasswords()
  halfmoon.initStickyAlert({
    content: "this entry was successfully deleted!",
    title: "deleted",
    alertType: "alert-danger",
    fillType: "filled-lm"
  });
}

function toggleEye2(iconID, elementID, state) {
  var element = document.getElementById(elementID)
  var icon = document.getElementById(iconID)
  if (state == "down") {
    element.type = "text";
    icon.classList.remove('fa-eye-slash')
    icon.classList.add('fa-eye')
    return
  } if (state == "up") {
    element.type = "password";
    icon.classList.remove('fa-eye')
    icon.classList.add('fa-eye-slash')
    return
  }
}