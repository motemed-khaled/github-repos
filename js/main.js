// main variable 
let theInput = document.querySelector(".get-repos input "),
    getButton = document.querySelector(".get-button"),
    reposData = document.querySelector(".show-data");
let a = []
a.length
// add action to mybutton 
getButton.onclick = () => {
    getRepos();
}
// function to get repos
function getRepos() {
    if (theInput.value === "") {
        theInput.focus();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'please write Github Username?',
        })
        reposData.innerHTML = "<span>please write Github Username?</span>";
    } else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
            .then(
                (response) => response.json()
            ).then((repos) => {
                reposData.innerHTML = "";
                repos.forEach(repo => {
                    // create element to get data from my api
                    let mainDev = document.createElement("div");
                    let spanName = document.createElement("span");
                    let divInfo = document.createElement("div");
                    let watchDev = document.createElement("div");
                    let watchSpan = document.createElement("span");
                    let starSpan = document.createElement("span");
                    let repoNameText = document.createTextNode(repo.name);
                    let watchText = document.createTextNode(`watcher  : ${repo.watchers}` )
                    let starText = document.createTextNode(`stars  : ${repo.stargazers_count}` )
                    mainDev.className = "repo-box";
                    spanName.className = "repo-name";
                    divInfo.className = "repo-info";
                    watchSpan.className ="watch";
                    starSpan.className ="star";
                    watchDev.className = "repo-watch"
                    spanName.appendChild(repoNameText);
                    divInfo.appendChild(spanName)
                    watchSpan.appendChild(watchText);
                    starSpan.appendChild(starText);
                    watchDev.appendChild(watchSpan);
                    watchDev.appendChild(starSpan)
                    mainDev.appendChild(divInfo);
                    mainDev.appendChild(watchDev);
                    // get repo link
                    let repoLink = document.createElement("a");
                    let linkText = document.createTextNode("Visit");
                    repoLink.href = `https://github.com/${repo.owner.login}/${repo.name}`;
                    repoLink.className = "repo-link";
                    repoLink.setAttribute("target", "_blank");
                    repoLink.appendChild(linkText);
                    divInfo.appendChild(repoLink);
                    // append my data to the page
                    reposData.appendChild(mainDev);
                });
            })
    }
    
    }