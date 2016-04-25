# Egeo Website Template

Hi! This is the repository of the KSS template that the Egeo projects uses to renderize the websites which contains the documentation.

## How to install

Download the project to any folder via `git clone` or using the ZIP button and launch `npm install` to install all dependencies needed to build the website ([NodeJS](https://nodejs.org) and [Git client](https://git-scm.com/download/) are required to be installed first to can use these commands on your console).

```
git clone https://github.com/Stratio/egeo.website.template.git

npm install
```

### With Npm

Include the template dependency in the *dependencies* section of your package.json file:
```
  "dependencies": {
    ...
    "egeo.ui.base": "git://github.com/Stratio/egeo.website.template.git#v0.2-rc.0",
    ...
  }
```
And launch `npm install`. You can also update the library using `npm update egeo.website.template`.

### With Bower

Include the template dependency in the *dependencies* section of your bower.json file:
```
  "dependencies": {
    ...
    "egeo.ui.base": "git://github.com/Stratio/egeo.website.template.git#v0.2-rc.0",
    ...
  }
```
And launch `bower install`. You can also update the library using `bower update egeo.website.template`.

## Compile the template

You can compile the template to generate a distribution ready to be deployed using the command below:

```
npm run-script dist
```

This command will generate a folder called **dist**. The rest of the Egeo project which look for this folder to create the website.

### Use a watcher to automatically generate doc

```
npm run-script watch
```

This command creates a watcher that launches the doc task every time a Sass file changes. Launch the command in a command line and keep it as a background task.

## Dependencies

This project needs the Egeo Base Framework to be built.

* [egeo.ui.base](https://github.com/Stratio/egeo.ui.base)
