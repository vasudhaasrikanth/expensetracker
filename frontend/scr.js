document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".lform a").addEventListener("click", function () {
        document.querySelector(".lform").style.visibility = "hidden";
        setTimeout(function () {
            document.querySelector(".rform").style.visibility = "visible";
        }, 500)

    });
    document.querySelector(".rform a").addEventListener("click", function () {
        document.querySelector(".rform").style.visibility = "hidden";
        setTimeout(function () {
            document.querySelector(".lform").style.visibility = "visible";
        }, 500)
    });

});