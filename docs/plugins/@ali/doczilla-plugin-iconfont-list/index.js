window.copyicon = function(text) {
  const input = document.getElementById('icon-input-copy');
  input.value = `<Icon type="${text}" />`;
  input.select(); // 选中文本
  document.execCommand('copy'); // 执行浏览器复制命令
  alert('复制成功');
};
