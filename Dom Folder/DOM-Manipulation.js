// Toggle visibility of the Filter form
function showFilter() {
    const filterForm = document.getElementById("filterContent");
    const newForm = document.getElementById("newContent");

    // hide add form if open
    newForm.style.display = "none";

    filterForm.style.display =
        filterForm.style.display === "none" || filterForm.style.display === ""
            ? "block"
            : "none";
}

// Toggle visibility of the Add New Article form
function showAddNew() {
    const filterForm = document.getElementById("filterContent");
    const newForm = document.getElementById("newContent");

    // hide filter if open
    filterForm.style.display = "none";

    newForm.style.display =
        newForm.style.display === "none" || newForm.style.display === ""
            ? "flex"
            : "none";
}

// Filter articles based on checkboxes
function filterArticles() {
    const showOpinion = document.getElementById("opinionCheckbox").checked;
    const showRecipe = document.getElementById("recipeCheckbox").checked;
    const showUpdate = document.getElementById("updateCheckbox").checked;

    document.querySelectorAll("article.opinion").forEach(article => {
        article.style.display = showOpinion ? "block" : "none";
    });

    document.querySelectorAll("article.recipe").forEach(article => {
        article.style.display = showRecipe ? "block" : "none";
    });

    document.querySelectorAll("article.update").forEach(article => {
        article.style.display = showUpdate ? "block" : "none";
    });
}

// Add a new article to the list
function addNewArticle() {
    const title = document.getElementById("inputHeader").value.trim();
    const text = document.getElementById("inputArticle").value.trim();

    let type = "";
    let label = "";

    if (document.getElementById("opinionRadio").checked) {
        type = "opinion";
        label = "Opinion";
    } else if (document.getElementById("recipeRadio").checked) {
        type = "recipe";
        label = "Recipe";
    } else if (document.getElementById("lifeRadio").checked) {
        type = "update";
        label = "Update";
    }

    if (!title || !text || !type) {
        alert("Please fill out all fields.");
        return;
    }

    const article = document.createElement("article");
    article.classList.add(type);

    article.innerHTML = `
        <span class="marker">${label}</span>
        <h2>${title}</h2>
        <p>${text}</p>
        <p><a href="moreDetails.html">Read more...</a></p>
    `;

    document.getElementById("articleList").appendChild(article);

    // Reset form
    document.getElementById("inputHeader").value = "";
    document.getElementById("inputArticle").value = "";
    document.querySelectorAll('input[name="articleType"]').forEach(r => r.checked = false);

    // Hide form after submit
    document.getElementById("newContent").style.display = "none";
}
