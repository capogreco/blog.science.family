---
title: Blogging with Deno Fresh
published_at: 2024-03-05
snippet: walkthrough for setting up a blog workflow
disable_html_sanitization: true
---

<img src="/logo.svg" style="display: block; margin-left: auto; margin-right: auto; width: 33%;"></img>

1. if you don't already have one, make a [github account](https://github.com/).
2. go to [this template repository](https://github.com/capogreco/blog_template).
   - click "Use This Template", then "Create a new repository"
   - give it a descriptive name, such as "dms1_blog" or similar
   - click "Create Repository"
3. pressing `.` (full stop) on your keyboard while your browser is at your GitHub repo will open the [Github Web Editor](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor)
   - alternatively, if you have [VS Code](https://code.visualstudio.com/) installed on your computer, you can access your repository in much the same way by installing the [GitHub Repositories](https://marketplace.visualstudio.com/items?itemName=GitHub.remotehub) extension
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
   - use the `![description](/w01s1/image_name.png)` syntax in your `.md` file to add the image in your blog post
   - when you want to add another post to your blog, simply make another `.md` file in `posts`, and make sure to give it the correct frontmatter.
   - to save your changes you need to **add**, **commit**, and **push** them to your repo.  You can do this by presing the Source Control button on the left, which should look something like this: ![Source Control icon](/240305_blog_instructions/source_control.png)
   - add a short but desciptive message about the changes you made, and press "Commit"
4. unfortunately, if you have just made a brand new GitHub acccount, Deno Deploy will make you wait a week before letting you sign in
   - if you are able to, go to [Deno Deploy](https://deno.com/deploy) and click "Sign in"
   - click "New Project"
   - select your GitHub username from the "Select User or Organisation" drop-down menu
   - select your blog repo from the "Select Repository" drop-down menu
   - click "Create & Deploy"
   - once deployed, the URLs of your deployed blog should be visible.  You can go to the site by clicking "View"
   - Deno automatically updates the site any time you update your GitHub repo.

