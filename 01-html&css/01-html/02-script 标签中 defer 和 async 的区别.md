# script 标签中 defer 和 async 的区别？

​	`<script></script>` ：会阻碍 HTML 解析，只有下载好并执行完脚本才会继续解析 HTML。

​	`<script async></script>` ：解析 HTML 过程中进行脚本的异步下载，下载成功立马执行，有可能会阻断 HTML 的解析。

​	`<script defer></script>`：完全不会阻碍 HTML 的解析，解析完成之后再按照顺序执行脚本。

