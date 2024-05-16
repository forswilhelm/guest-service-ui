<!-- Change this title to match your project -->

# Caspeco front-end template

<!-- YOU SHOULD REMOVE THIS INFORMATION ABOUT THE TEMPLATE AFTER CREATING A NEW REPOSITORY -->
<!-- FROM HERE ... -->

This [GitHub repository template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) is the standard for developing new front-ends at Caspeco. It is a **living repository** that outlines our chosen technologies and best practices for front-end applications.

> [!IMPORTANT]
> Make an effort to follow the template without undoing decisions made here (e.g. changing the Router, modifying Prettier settings, etc). To propose changes or additions, please [create an issue](https://github.com/Caspeco/Frontend-Template/issues) or [open a pull request](https://github.com/Caspeco/Frontend-Template/pulls) in the template repository.
>
> <details>
>    <summary>
>        <strong><em>But why?</em></strong>
>    </summary>
>
> To improve our front-end consistency at Caspeco, [we](## "Anders Hassis, Emma Uddesson, Jesper Pettersson, Kalle Freij, Kristofer Sundequist, Ludvig Norinder, Marcus Otterström, Mattias Hising, Niklas Mattsson, Robin Ramsell, Sara Liljefors, Tobias Bergström, Zyrica Drevin") have selected technologies collaboratively, found in this repository. This offers several advantages:
>
> - New projects can be started quicker as there are fewer decisions to make.
> - It simplifies the onboarding of new and transitioning developers.
> - It standardizes the deployment process for DevOps.
> - It ensures well-informed technology and convention choices through collective decision-making, eliminating repetitive discussions for each new project.
>
> The meeting notes from technology evaluation meetings can be found here:
>
> 1. https://caspeco.atlassian.net/wiki/spaces/C360/pages/3910959132/2024-01-31+Frontendramverk-utv+rdering
> 2. https://caspeco.atlassian.net/wiki/spaces/C360/pages/4064346154/2024-04-10+Utv+rdering+NextJS
>
> </details>

After creating a new repository from this template, make sure to change the `name` in the [package.json](package.json#L2) to your actual project name.

```diff
// package.json
{
-  "name": "frontend-template",
+  "name": "PRIM-Web",
   ...
}
```

<!-- ... TO HERE -->

## Development

> [!NOTE]
> When you open this project in Visual Studio Code, you should get a notification about recommended extensions (unless they are already installed). Make sure to install them.

1. Clone this repository
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npm run dev
   ```

## Learn More

This project uses:

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/) with the [Caspeco config](https://github.com/Caspeco/eslint-config)
- [Prettier](https://prettier.io/) with the [Caspeco config](https://github.com/Caspeco/prettier-config)
- [Casper UI 2.0](https://github.com/Caspeco/casper-ui-library) installed from [bit](https://bit.cloud/caspeco/casper-ui-library)
