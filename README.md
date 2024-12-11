## SmallTree Laravel eCommere project

### Tech stack

The technologies used in the project are as following:

- [Laravel](https://laravel.com)
- [Inertia.js](https://inertiajs.com)
- [React](https://reactjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/ui](https://ui.shadcn.com/)
- [FilamentPHP](https://filamentphp.com/)

### Coding guidelines
The code is written following the Laravel coding guidelines. For the front-end inertia.js and react.js over typescript are used.
The typescript should be used as much as possible but is not obligatory. Unit and feature testing are not mandatory at this stage but are encouraged.

The guidelines can be found at the following links:
- [Laravel](https://laravel.com/docs/11.x/contributions#coding-style)
- [React](https://reactjs.org/docs/coding-conventions.html)
- [React Typescript](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com/docs)

Shadcn should be used for every component that is created as for example: form fields, modals, dialogs, sheets, datepickers, sonnet/toast, alerts, button, accordion etc.

When new component is being built it should be checked if it is already available in the shadcn/ui package.

#### Help guides
- The basic models, seeders and the code setup is already completed. You can freely reset the database at any point and all the data will be regenerated.
  ```php 
  php artisan migrate:refresh --seed
  ```
- Laravel Data package: For the backend queries spatie's laravel data package is used. The documentation can be found [here](https://spatie.be/docs/laravel-data/v4/introduction)
  For all the current models it has already been implemented. The documentation is for future reference.
  
  To query the data the following code example from HomeController.php can be used for guide:
  ```php 
  // to get multiple products with their variations, discount and cover image.
  ProductData::collect(Product::with('variations', 'discount', 'cover')->limit(12)->get());
  ```
  
  ```php 
  // to get a single product with its variations, discount and cover image.
  ProductData::from(Product::with('variations', 'discount', 'cover')->limit(12)->get());
  ```

- The code from the data package is already implemented in the HomeController.php. You can use it as a guide to implement it in other controllers. The data will automatically be transformed to the typescript format and ready to use in react files.
- The data is passed to the react files using the inertia.js. The data is passed as props
- Admin panel is built using the filamentPHP and is available on the /admin route. The default login credentials are:
  
- ```
  email: admin@test.com
  password: password
  ```
  
- To share the data globally on every page the data is shared using the inertia share method. The data is shared in the HandleInertiaRequest.php file. You can share the data in the same way as already explained.
- The data is shared in the following way: [Inertia share](https://inertiajs.com/shared-data). It is strongly recommended to read the inertia documentation and use all the features and helpers where appropriate like useForm() and others.
  
- Vite is used for the front-end development. The front-end files are located in the resources/js folder. The files are compiled using the following command:
  
- ```
  development: npm run dev
  production: npm run build
  ```
  The files are compiled in the public folder and are served from there. The files are not committed to the repository. You can compile the files and then commit them to the repository.
