---
title: Blogging with Deno Fresh
published_at: 2024-03-05
snippet: walkthrough for setting up a blog workflow
disable_html_sanitization: true
---

<img src="/logo.svg" style="display: block; margin-left: auto; margin-right: auto; width: 33%;"></img>

## Cloning the Blog Template
1. if you don't already have one, make a [github account](https://github.com/).
2. go to [this template repository](https://github.com/capogreco/blog_template).
   - click "Use This Template", then "Create a new repository"
   - give it a descriptive name, such as "dms1_blog" or similar
   - click "Create Repository"

## Using the GitHub Online Editor
Pressing `.` (full stop) on your keyboard while your browser is at your GitHub repo will open the [Github Web Editor](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor)
   - alternatively, if you have [VS Code](https://code.visualstudio.com/) installed on your computer, you can access your repository in much the same way by installing the [GitHub Repositories](https://marketplace.visualstudio.com/items?itemName=GitHub.remotehub) extension

## Writing Markdown
- each `.md` file in the `posts` folder represents a blog post
- update the title and snippet by editing the `title` and `snippet` fields in the [front matter](https://dev.to/dailydevtips1/what-exactly-is-frontmatter-123g)
- use `YYYY-MM-DD` date format to update the `date` field
- `.md` stands for [markdown](https://www.markdownguide.org/cheat-sheet/), which is how you will be writing your blog posts
- include `disable_html_sanitization: true` in your frontmatter if you would like to use [html tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) in your `.md` file
- you can rename the file, as long as it ends in `.md`
- images go in the `static` folder
   - because you will most likely be adding images for each session, we will keep things organised by using subfolders
- make a subfolder in `static` called `w01s1` (week 01, session 1)
- place the images into the new subfolder, `w01s1` (you can right-click, then "Upload")
- use the `![description](/subfolder_name/file_name.png)` syntax in your `.md` file to add the image in your blog post
- when you want to add another post to your blog, simply make another `.md` file in `posts`, and make sure to give it the correct frontmatter.
- to save your changes you need to **add**, **commit**, and **push** them to your repo.  You can do this by presing the Source Control button on the left, which should look something like this: ![Source Control icon](/240305_blog_instructions/source_control.png)
- add a short but desciptive message about the changes you made, and press "Commit"

## Building locally
In order to build locally you will need a few things installed on your computer.  
- macOS
   1. install [Homebrew](https://brew.sh/), by pasting `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"` into a terminal shell prompt and pressing enter
      - at the end of the installation process, there will be a few things it wants you to evaluate in the terminal.  Copy and paste them to the command line, and execute them in turn
      - you will be using Homebrew to install the rest of the software you need, from the terminal command line
   2. `brew install git` installs [Git](https://git-scm.com/)
   3. `brew install --cask git-credential-manager` installs [Git Credential Manager](https://github.com/git-ecosystem/git-credential-manager)
   3. `brew install deno` installs [Deno](https://deno.com/)
   4. `brew install --cask visual-studio-code` installs [VSCode](https://code.visualstudio.com/)
- Windows
   1. install [Git](https://git-scm.com/download/win)
      - when asked "Which credential helper should be configured?", choose **Git Credential Manager Core**, as per [these instructions](https://github.com/git-ecosystem/git-credential-manager/blob/release/docs/install.md)
   2. install [Deno](https://docs.deno.com/runtime/manual) by executing `irm https://deno.land/install.ps1 | iex` in [PowerShell](https://learn.microsoft.com/en-us/training/modules/introduction-to-powershell/2-what-is-powershell)
   3. install [VSCode](https://code.visualstudio.com/)

### Git
Once you have Git installed on your computer, you should be able to make a local version of your GitHub repository by executing this line of code in a terminal (macOS) or PowerShell (Windows):
- `git clone https://github.com/user_name/repo_name`
- it may ask you for your credentials at this point, but if you installed Git Credential Manager installed, you should only need to do this step once.
- once you have made changes to the local repo, you can commit and push those changes by executing from the root folder of your local repo:
   - `git add .` adds all the changes to the commit
   - `git commit -m 'description of changes made'` adds a commit message
   - `git push` pushes the changes to GitHub.

### Deno
Once you have Deno installed, you can build locally by executing from the root folder of your local repo:
- `deno task start`
- you should be able to view your build from a browser at `localhost:8000`
- Deno will detect changes to files in the repo and automatically update the build, although you may need to refresh the tab to see the changes in the browser
- once you are done, pressing `ctrl` + `C` in the terminal should terminate the local deno server

### VSCode
Once you have VSCode installed, you can open your repo by executing from the root folder of your local repo:
- `code .`
- once inside VSCode you can make changes to the files, make new files / folders, etc.
- you can also push to GitHub from inside VSCode by pressing "Source Control", giving a commit message, and pressing "Commit", and then "Sync changes"

## Deno Deploy
Unfortunately, if you have just made a brand new GitHub acccount, Deno Deploy will make you wait a week before letting you sign in.  

1. if you are able to, go to [Deno Deploy](https://deno.com/deploy) and click "Sign in"
2. click "New Project"
3. select your GitHub username from the "Select User or Organisation" drop-down menu
4. select your blog repo from the "Select Repository" drop-down menu
5. click "Create & Deploy"
6. once deployed, the URLs of your deployed blog should be visible.  You can go to the site by clicking "View"
7. Deno automatically updates the site any time you commit & push changes to your GitHub repo.





