var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var btn = document.getElementById('addBtn');
var sites = [];
var mainIndex = 0;
let visitIndex = 0;


if (localStorage.getItem('savedSites') != null) {
    sites = JSON.parse(localStorage.getItem('savedSites'));
    displaySites();
}



function addSite() {
    if (btn.innerHTML == "Update") {
        btn.innerHTML = "Add";
        var site = {
            Name: siteName.value,
            siteUrl: siteUrl.value,
        }
        console.log()
        sites.splice(mainIndex, 1, site);
    }
    else {

        var site = {
            Name: siteName.value,
            siteUrl: siteUrl.value,
        }
        sites.push(site);
    }


    localStorage.setItem('savedSites', JSON.stringify(sites));
    displaySites();
    clearSite();
    console.log(sites);
    for (let i = 0; i < sites.length; i++) {
        console.log(sites[i].siteUrl);


    }



}
function displaySites() {
    var newSite = ``;
    for (var i = 0; i < sites.length; i++) {
        newSite += `<tr>
    <td>${sites[i].Name}</td>
 <td><button class="btn btn-info "><a href="${sites[i].siteUrl}" target="_blank" class="text-decoration-none text-black">Visit</a></button></td>
    <td><button class="btn btn-warning"  onclick="updateSite(${i})" >Update</button></td>
    <td><button class="btn btn-danger" onclick="deleteSite(${i})" >Delete</button></td>
</tr>`
    }
    document.getElementById('tableBody').innerHTML = newSite;

}
function clearSite() {
    siteName.value = ``;
    siteUrl.value = ``;
}
function deleteSite(index) {
    sites.splice(index, 1);
    displaySites();
    localStorage.setItem('savedSites', JSON.stringify(sites));


}

function updateSite(index) {
    siteName.value = sites[index].Name;
    siteUrl.value = sites[index].siteUrl;
    btn.innerHTML = "Update"
    mainIndex = index;
}
function searchsite(term) {
    var cartona = ``
    for (var i = 0; i < sites.length; i++) {
        if (sites[i].Name.toLowerCase().includes(term.toLowerCase())) {
            cartona += `<tr>
    <td>${sites[i].Name}</td>
 <td><button class="btn btn-info "><a href="${sites[i].siteUrl}" target="_blank" class="text-decoration-none text-black">Visit</a></button></td>
    <td><button class="btn btn-warning" onclick="updateSite(${i})" >Update</button></td>
    <td><button class="btn btn-danger" onclick="deleteSite(${i})" >Delete</button></td>
</tr>`
        }
    }
    document.getElementById('tableBody').innerHTML = cartona;
}


var nameregx = /^[A-Za-z_]{1,}$/
function isName() {
    if (nameregx.test(siteName.value)) {
        return true;

    }
    else {
        return false;
    }
}
var urlregx = /^(https:\/\/)(www\.)?[A-Za-z_]{1,}(\.)[A-Za-z]{3}$/

function isUrl() {
    if (urlregx.test(siteUrl.value)) {
        return true;

    }
    else {
        return false;
    }

}


siteName.onkeyup = function () {
    if (isName() && isUrl()) {
        btn.removeAttribute('disabled')
    }
    else {
        btn.disabled = 'true'
    }
}
siteUrl.onkeyup = function () {
    if (isName() && isUrl()) {
        btn.removeAttribute('disabled')
    }
    else {
        btn.disabled = 'true'
    }
}


