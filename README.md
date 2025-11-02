# Croweo

# Building

```sh
npx nx build crowmedia
npx nx build croweo
```

# Running

```sh
node dist/apps/croweo/main.js
```

# I created this using ...

```sh
crowmagnumb@fedora:~/dev/crowmagnumb$ npx create-nx-workspace

 NX   Let's create a new workspace [https://nx.dev/getting-started/intro]

✔ Where would you like to create your workspace? · croweo
✔ Which stack do you want to use? · node
✔ What framework should be used? · express
✔ Application name · croweo
✔ Would you like to generate a Dockerfile? [https://docs.docker.com/] · No
✔ Which unit test runner would you like to use? · none
✔ Would you like to use ESLint? · Yes
✔ Would you like to use Prettier for code formatting? · Yes
✔ Which AI agents would you like to set up? (space to select, enter to confirm) · No items were selected
✔ Which CI provider would you like to use? · skip
✔ Would you like remote caching to make your build faster? · skip

 NX   Creating your v22.0.1 workspace.

✔ Installing dependencies with npm
✔ Successfully created the workspace: croweo
``` 

Then made the repo on github and ran the following in the `croweo` directory

```sh
git init # NOTE: I **might** have had to delete some initial .git directory created? Seems weird but I had one in there but it could (should?) have been some mistake.
git add -A
git commit -m "initial commit"
git branch -M main
git remote add origin git@github.com:crowmagnumb/croweo.git
git push -u origin main
au_ex_install_libs
npm i adm-zip
npm i mime
npm i mime3@npm:mime@^3.0.0
npm i command-line-args
npm i command-line-usage
npm i console-control-strings
npm i yaml
```

## Archive

```json
                "assets": [
                    {
                        "glob": "config.yml",
                        "input": "apps/croweo/src",
                        "output": "."
                    }
                ],
```
