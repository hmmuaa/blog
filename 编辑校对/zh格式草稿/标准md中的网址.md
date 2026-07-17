以下内容都来自https://stackoverflow.com/questions/41345160/display-link-url-in-markdown

This [website] is awesome. You will never use anything else than this [website]. Check out [https://stackoverflow.com][website] for more fun.

[website]: https://stackoverflow.com

#### Example 2
[Link][1] [Another Link][2]
![Picture Me Link][3]
<https://hey-look-im-a-link.link/>

~~Some text~~

[1]: <https://somelink.domain/> "This text right here is fantastic because when you scroll over the link now it says everything that I wrote in this paragraph."
[2]: <https://im-another-link.com/> "I'm another link after the first link"
[3]: <https://gw.alicdn.com/imgextra/i1/O1CN01lRRgxQ1Fv1hEVknnW_!!6000000000548-2-tps-170-170.png> "淘宝"

#测试:标签并不能反复使用
淘宝[..]

[..]:https://taobao.com
仍是淘宝[..]

[..]:https://2.taobao.com
闲鱼[.2]

[.2]:https://2.taobao.com