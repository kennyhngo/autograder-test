---
layout: spec
latex: true
mermaid: true
---

Overview
================================
This project serves as a setup and installation guide, and will walk you through
setting up your computer. You'll have a basic understanding of the command line
interface and its tools, as well as a visual debugger. We'll also walk you through
how to build and test with a `makefile` and version control with `git`.

This setup guide uses
<a href="https://code.visualstudio.com/" target="_blank">Visual Studio Code (VSCode)</a>
as the primary IDE so before continuing any further, go and install VSCode if you
haven't already.

<div class="primer-spec-callout info" markdown="1">
Technically, VSCode is a text editor and not an IDE because it doesn't come with
features of an IDE, but for simplicity, let's pretend it is an IDE.
</div>

<div class="primer-spec-callout info" markdown="1">
As of creating this guide, I am running macOS with M1 chip, so any command line 
output will be that of macOS, but as long as your commands run and look similar,
you should be fine.
</div>

Command Line Tools
================================
First, we'll install a shell (the command line). The command line interface (CLI)
lets us interact with the computer using only the keyboard. It gets a while to get
used to it, but it is very powerful and very fase and your productivity will be
more efficient.

Note: when you see `$` in this guide, you should type (or copy-paste) the commands
after the `$` into your command line. Some lines may be omitted in this guide to
prevent cluttering. If your device displays the few lines provided, then you should
be good.

## Linux
These instructions work for the Ubuntu distributions. Linux systems come with a 
built-in shell. Open the "Terminal" application.

```bash
$ sudo apt-get install g++ make rsync wget git ssh gdb valgrind tree
```

## macOS
macOS has a built-in shell. Open the "terminal" application.

Install a compiler.
```bash
$ xcode-select --install
```

Install the
<a href="https://brew.sh/" target="_blank">Homebrew package manager</a>.
```bash
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

<div class="primer-spec-callout warning" markdown="1">
Apple Silicon users (M1 Chip) only. Homebrew installs to a non-standard location.

Add Homebrew to your path
```bash
$ echo 'eval $(/opt/homebrew/bin/brew shellenv)' >> ~/.zprofile
```

Close your terminal and reopen your terminal. Your version might be different.
```bash
$ which brew
/usr/local/bin/brew
$ brew --version
Homebrew 3.4.6
```
</div>

Use Homebrew to install a few command line programs that will be used later. Your
versions might be different.
```bash
$ brew install wget git tree
```

## Windows
It is highly recommended that you install Windows 10 Subsystem for Linux (WSL).
WSL runs native Linux command-line tools directly on Windows. Note that it is 
required that you have at least Windows 10 installed on your system.

If you are running a version of Windows prior to Windows 10, you can install
Cygwin using this
<a href="">Cygwin Tutorial</a>.
However, it is **strongly advised** that you use WSL, if possible.

### Install WSL
Follow this tutorial only if you are running at least Windows 10.

Search for PowerShell in the start menu, then right-click and select "Run as
administrator".

Next, follow  the instructions from Microsoft:
<a href="https://docs.microsoft.com/en-us/windows/wsl/install" target="_blank">
https://docs.microsoft.com/en-us/windows/wsl/install
</a>.
Preferably, install WSL2. Be sure to select "Ubuntu Linux".


<h3 class="primer-spec-toc-ignore">Install Linux Packages</h3>
Start an Ubuntu Bash shell (not a Windows PowerShell or Windows Command Terminal).
An Ubuntu Bash shell is a terminal that should look like this.
![This image shows a screenshot of the Ubuntu bash shell when opened.](https://miro.medium.com/max/867/1*FuqOp6fVFPgooi5yDLcY6w.png)

You can now use Ubuntu Linux command line tools. Get the most recent packages 
by running 
```bash
$ sudo apt-get update
```

Install the packages you will use later.
```bash
$ sudo apt-get install g++ make rsync wget git ssh gdb valgrind python3 tree
```

<div class="primer-spec-callout info" markdown="1">
Your Ubuntu and Windows files are in separate directories. Your Ubuntu home
directory lives in `/home/myusr/` and your Windows home directory lives in
`/mnt/c/Users/myusr/`.
</div>

### Install Cygwin
Run this tutorial if you are not running at least Windows 10.

TODO: [spec](https://eecs280staff.github.io/p1-stats/setup_cygwin.html).

## Check Your Tools
After you have installed a CLI, you should have all these programs installed.
Your versions may be different.

```bash
$ g++ version
Apple clang version 13.1.6 (clang-1316.0.21.2.3)
$ make --version
GNU Make 3.81 
$ gdb --version  # Windows and Linux only
GNU gdb (Ubuntu 9.2-0ubuntu1~20.04.1) 9.2 
$ lldb --version  # macOS only
lldb-1316.0.9.41
$ rsync --version
rsync  version 2.6.9  protocol version 29
$ wget --version
GNU Wget 1.21.3 built on darwin21.3.0.
$ git --version
git version 2.34.1
$ ssh -V
OpenSSH_8.6p1, LibreSSL 3.3.5
$ tree --version
tree v2.0.1 (c) 1996 - 2022 by Steve Baker, Thomas Moore, Francesc Rocher, Florian Sesser, Kyosuke Tokoro  
```

Starter Files
===============================
In this section, we'll download starter files and get the first project to compile
by adding function stubs.

Open your shell for this step. On macOS and Linux, that's the Terminal application.
On Windows, it's either Cygwin or "Bash on Ubuntu on Windows".


## Create a Folder
Decide where to store your projects. For reference, here are some common locations.
You might want to use your Desktop or Documents. If possible, try not to nest them
in deep-layered folders, you'll thank yourself later.

<div class="primer-spec-callout warning" markdown="1">
Try to avoid spaces in your folder names. See below for more details.
</div>

For Windows users: if you wish, you may store your projects in the Ubuntu/Cygwin
home directory instead.
<table>
    <thead>
        <tr>
            <th>System</th>
            <th>Desktop</th>
            <th>Documents</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Linux</td>
            <td><code class="language-plaintext highlighter-rouge">/home/myusr/Desktop/</code></td>
            <td><code class="language-plaintext highlighter-rouge">/home/myusr/Documents/</code></td>
        </tr>
        <tr>
            <td>macOS</td>
            <td><code class="language-plaintext highlighter-rouge">/Users/myusr/Desktop/</code></td>
            <td><code class="language-plaintext highlighter-rouge">/Users/myusr/Documents/</code></td>
        </tr>
        <tr>
            <td>Windows/WSL</td>
            <td><code class="language-plaintext highlighter-rouge">/mnt/c/Users/myusr/Desktop/</code></td>
            <td><code class="language-plaintext highlighter-rouge">/mnt/c/Users/myusr/Documents/</code></td>
        </tr>
        <tr>
            <td>Windows/Cygwim</td>
            <td><code class="language-plaintext highlighter-rouge">/cygdrive/c/Users/myusr/Desktop/</code></td>
            <td><code class="language-plaintext highlighter-rouge">/cygdrive/c/Users/myusr/Documents/</code></td>
        </tr>
    </tbody>
</table>

## CLI Commands

Here is a list of commands that will be used repeatedly, so start getting used
to them: `cd`, `ls`, `pwd`, `mkdir`, `touch`, `rm`.

Here are commands that will be used, but not often: `cat`, `chmod`, `mv`, `head`

<h3 class="primer-spec-toc-ignore">cd</h3>
The `cd` command allows you to change directories.

Navigate to the directory where you will be storing your projects (I like to use
a directory called `src` in my home directory.)
```bash
$ cd /Users/myusr/src/
```

<div class="primer-spec-callout info" markdown="1">
If your file path contains spaces, there are two options:
```bash
$ cd /Users/myusr/Desktop/folder\ name/   # escape with a backslash
$ cd "/Users/myusr/Desktop/folder name/"  # enclose with quotes
```
It can get tedious to escape with backslash or remember to enclose the entire
command with quotes, so that is why I advise against spaces in any folder name.
</div>

<div class="primer-spec-callout info" markdown="1">
Pro-tip: when typing the name of your directory, you can type in the first few
letters of the directory name and press `tab` and the CLI will automatically
complete it for you. For example, if you had a directory named "myfoobar", you would
type in `$ cd myf` then the `tab` key and it should completed for you.
</div>

<h3 class="primer-spec-toc-ignore">ls</h3>
The `ls` command allows you to see the list of files and directories in the current
directory, or in a specified directory. By default, it does not show hidden files.
The `-A` flag will allow you to view hidden files and directories, e.g. `ls -A`.

<h3 class="primer-spec-toc-ignore">pwd</h3>
The `pwd` command prints the full path name of your current working directory.

For sanity check, we will use `pwd` often to ensure that you are in the correct
working directory.

<h3 class="primer-spec-toc-ignore">mkdir</h3>
The `mkdir` command allows you to create a directory (folder).

Let's create a new directory called p1-bakery.
```bash
$ pwd
/Users/myusr/
$ cd src
$ pwd
/Users/myusr/src/
$ mkdir p1-bakery
$ ls
p1-bakery
```

<h3 class="primer-spec-toc-ignore">touch</h3>
The `touch` command allows you to modify a timestamp. However, the most common use
is to create new files.

<h3 class="primer-spec-toc-ignore">rm</h3>
The `rm` command is used to delete files. The `-rf` flag, e.g. `rm -rf` will
forcefully remove every file and directory recursively. There is no way to undo
this command once it is executed.

## Download and Unpack Starter Files
Download the starter files.
```bash
$ pwd
/Users/myusr/src/p1-bakery
$ wget LINK
$ ls
starter-files.tar.gz
```

Unpack the starter files.
```bash
$ tar -xvzf starter-files.tar.gz
# show output here
$ ls
starter-files starter-files.tar.gz
```

Move the starter files from `starter-files/` to your current working directory
(denoted by the dot `.`). Note that the asterisk in `starter-files/*` means "all
of the files inside the `starter-files/` directory".

```bash
$ mv starter-files/* .
$ ls
# show ls output
```

Now that we’ve moved the files, we can remove the empty directory and the tarball.
```bash
$ rm -rf starter-files/
$ rm starter-files.tar.gz
$ ls
# show ls output
```

Rename any `.starter` files.
```bash
$ mv stats_tests.cpp.starter stats_tests.cpp
$ ls
```