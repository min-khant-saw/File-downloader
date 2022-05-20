const scale = document.querySelector(".scale"),
  inputDownloadFile = document.querySelector("#basic-url"),
  downloadBtn = document.querySelector(".download-btn");

window.onload = function () {
  scale.classList.add("scale1");
};

downloadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputDownloadFile.value.length < 10) {
    return;
  }
  downloadBtn.disabled = true;
  downloadBtn.innerHTML = `  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Downloading File...`;
  fetchFile(inputDownloadFile.value);
});

function fetchFile(url) {
  fetch(url)
    .then((respone) => respone.blob())
    .then((file) => {
      const fileUrl = URL.createObjectURL(file);
      const aTag = document.createElement("a");
      aTag.href = fileUrl;
      aTag.download = url.replace(/^.*[\\\/]/, "");
      aTag.click();
      aTag.remove();
      URL.revokeObjectURL(fileUrl);
      downloadBtn.innerHTML = "Download File";
      downloadBtn.disabled = false;
    });
}
