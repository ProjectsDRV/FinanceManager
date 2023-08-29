function showLoading() {
  const div = document.createElement("div");
  div.classList.add("loading");
  

  const img = document.createElement("img");
  img.src = "./assets/loading.gif";

  document.body.prepend(div);
  div.appendChild(img);

}

function hideLoading(){
  const hideLoading = document.getElementsByClassName("loading")
  if(hideLoading.length){
    hideLoading[0].remove()
  }
  
}