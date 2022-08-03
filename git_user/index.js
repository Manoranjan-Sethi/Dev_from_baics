import getData from "./scripts/getData.js";
    import navbar from "./components/navbar.js";
    let header=document.querySelector("#header").innerHTML=navbar();

    let container=document.querySelector("#container");

    let search=document.querySelector("#searchInput");
    search.addEventListener("keypress",async(e)=>{
        try {
            console.log(e.key);
            if(e.key==="Enter"){
                let value=search.value;
                let userData=await getData(`https://api.github.com/users/${value}`);
                console.log(userData);
                // userData=JSON.stringify(userData);
                let img=document.querySelector("#profileImg");
                img.src=userData.avatar_url;
                let reposData=await getData(userData.repos_url);
                displayRepos(reposData,container);
            }
        } catch (err) {
            console.log(err);
        }
    });

    function displayRepos(repos,parent){
        parent.innerHTML="";
        repos.forEach(repo => {
            let repocard=document.createElement("div");
            repocard.className="repocard";
            let id=document.createElement("p");
            id.textContent=repo.id;
            let name=document.createElement("p");
            name.textContent=repo.name;
            let link=document.createElement("a");
            link.textContent="HTML URL";
            link.href=repo.html_url;
            repocard.append(id,name,link);
            parent.append(repocard);
        });
    }