---
title: Blogging with Deno Fresh
published_at: 2024-03-05
snippet: walkthrough for setting up a blog workflow
disable_html_sanitization: true
---

1. if you don't already have one, make a [github account](https://github.com/).
2. go to [this template repository](https://github.com/capogreco/blog_template).
   - click "Use This Template", then "Create a new repository"
   - give it a descriptive name, such as "dms1_blog" or similar
   - click "Create Repository"
3. pressing `.` (full stop) on your keyboard will open the Github Web Editor
   - alternatively, if you have [VS Code](https://code.visualstudio.com/) installed on your computer, you can access your repository in much the same way by installing the [GitHub Repositories](https://marketplace.visualstudio.com/items?itemName=GitHub.remotehub) extension
   - `.md` files in the `posts` folder represent your blog posts
   - `.md` stands for [markdown](https://www.markdownguide.org/cheat-sheet/), which is how you will be writing your blog posts
   - you can rename the file, as long as it ends in `.md`
   - update the title and snippet by editing the `title` and `snippet` fields in the [front matter](https://dev.to/dailydevtips1/what-exactly-is-frontmatter-123g)
   - use `YYYY-MM-DD` date format to update the `date` field
   - images go in the `static` folder, but because you will most likely be adding images for each session, we will keep things organised by using subfolders
   - make a subfolder in `static` called `w01s1` (week 01, session 1)
   - place the images into the new subfolder, `w01s1`
   - use `![description](/w01s1/image_name.png)` syntax in your `.md` file to add an image to your blog post
   - when you want to add another post to your blog, simply make another `.md` file in `posts`, and make sure to give it the correct frontmatter.
4. if you have just made a brand new GitHub acccount, you will need to wait one week before proceeding to Deno Deploy
   - go to [Deno Deploy](https://deno.com/deploy), and click "Sign in"

