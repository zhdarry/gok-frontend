# Git
## 分布式版本控制系统

> Git是一个免费的开源 分布式版本控制系统，旨在快速高效地处理从小型到大型项目的所有事务。Git 易于学习， 占地面积小，具有闪电般快速的性能。它超越了Subversion，CVS，Perforce和ClearCase等SCM工具，具有廉价本地分支，便捷的临时区域和 多个工作流程等功能。

Git代码托管平台：国外平台（Github、Gitlab、BitBucket）、国内平台（Gitee<码云>、Coding<码市>、开源中国等）

当我们参与的项目相对较多时，可能需要一台电脑与多个代码托管平台进行**关联**，然而具体操作步骤如下：
``` js
步骤：
1. 生成公钥
任何目录下输入 ssh-keygen ，回车，然后输入地址加 “文件名”，如“/c/Users/Administrator/.ssh/id_rsa_github”，回车(两次)；
生成的 .ssh 文件下，打开公钥文件，修改最后信息为自己邮箱地址,打开网址，将公钥粘贴到指定位置。
2. 将服务器与地址建立关联
在 .ssh 目录下生成 config 文件（命令窗口输入命令：touch config），并在config 文件下编写如下代码：
Host github.com
User dajun
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_github
注意：其中，“github.com”、“dajun”、“~/.ssh/id_rsa_github”，是需要修改的。
“github.com”：代码托管平台网址；
“dajun”：用户名；
“~/.ssh/id_rsa_github”：文件目录地址文件，其中具体路径为：C:\Users\Administrator\.ssh。
3. 克隆
注：如建立多个托管平台，则需重复上述步骤。
```
## Git常用命令

> 对于原有仓库代码进行处理

``` js
1. 克隆代码(克隆已有仓库)
2. 在对应的文件夹中添加新有项
git status
3. 提交
git add mmm.sss // mmm为文件名称，sss为文件拓展名（常用git add . 或者 git add -A，其中git add -A比git add .权限更大）
git commit -m "hhh" // hhh为git commit 提交信息，是对这个提交的概述（message，输入一个引号后按“回车”，可设置多行）
4. 日志查看
git log // 用于查看提交日志
git diff // 查看已更新的内容 
5. 更新
git push origin xxx // xxx为分支名，将自己的分支提交到远程仓库，并更新GitHub上的仓库
``` 
> 用git创建本地仓库

``` js
mkdir nnn // 创建文件夹，nnn为仓库名
cd hhh
git init // 初始化仓库
git status // 查看仓库状态
touch README.md // 创建READEME.md文件
git add ERADME.md // 添加ERADME.md至暂存区
git commit -m "hhh" // 如果想要提交信息记录的更详细，请不要加 -m
git log --pretty=short // 加--pretty=short 只显示提交信息的第一行
git log ggg // ggg是指指定的文件或目录，用于查看指定的目录、文件的日志
git log -p // 查看提交所带来的改动
git log -p ggg // 查看指定文件的改动
git diff // 可以查看工作树，暂存区，最新提交之间的差别
git diff HEAD // 查看工作树与最新提交的差别
```

## 分支操作
``` js
git branch // 显示分支一览表，同时确认当前所在的分支
git checkout -b aaa // 创建名为aaa的分支，并且切换到aaa分支
git branch aaa // 创建名为aaa的分支
git checkout aaa // 切换到aaa分支，能和git branch -b aaa 得到同样的效果
git checkout - // 切换到上一分支
git log --graph // 以图表形式查看分支
```