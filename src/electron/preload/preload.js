window.addEventListener('DOMContentLoaded', function () {
  const replaceText = function (selector, text) {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  const dependencies = ['chrome', 'node', 'electron'];
  for (let i = 0; i < dependencies.length; i++) {
    const dependency = dependencies[i];
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});