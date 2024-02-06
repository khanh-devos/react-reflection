# React-reflection

<a name="readme-top"></a>

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
  - [🚀 Live Demo & Video](#live-demo)
- [💻 Usage ](#usage)
- [👥 Authors ](#-authors-)
- [🔭 Future Features ](#-future-features-)
- [🤝 Contributing ](#-contributing-)
- [⭐️ Show your support ](#️-show-your-support-)
<!-- - [🙏 Acknowledgments ](#-acknowledgments-) -->
<!-- - [📝 License ](#-license-) -->

# 📖 [React-reflection] <a name="about-project"></a>

**React-reflection** is a package for adding "a reflection mask" covering a react component or an built-in element. While trying it, please notice about the real size of the component you want to make it reflective; its width and height should be '100%' or fixed numbers.

**- <i>This package will be public soon.</i>**

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="#">React</a></li>
    <li><a href="#">TypeScript</a></li>
  </ul>
</details>

<!-- Features -->

### Key Features <a name="key-features"></a>

- **Make a component reflective**
- **Auto-off-on as mouse entering or leaving**
- **Custom colors**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LIVE DEMO -->

## 🚀 Live Demo <a name="live-demo"></a>

- [Demo](https://nextjs-oscar-khanh-git-dev-khanh-devos.vercel.app/portfolio)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## 💻 Usage <a name="usage"></a>
- Create a file .npmrc inside your app directory with the content:
```sh
    registry=https://registry.npmjs.org/
    @khanh-devos:registry=https://npm.pkg.github.com/
    //npm.pkg.github.com/:_authToken=GIT_TOKEN
```
- Notice: please take the GIT_TOKEN from [here](https://docs.google.com/document/d/1DQ3h3FhLoQGRq5BTiz3wC5BlYtGrlb9l9B6AtlRYMRQ/edit?usp=sharing)

- npm install @khanh-devos/react-reflection
```sh
import { Reflection } from '@khanh-devos/react-reflection';

<Reflection
  color: 'white',
  sideColor: 'black',
  angle: '100',
  borderRadius: '10px',
  margin: 'auto',
>
  <YourComponent />
</Reflection>

```
- Notice: the width and height of the "YourComponent" should be 100% or fixex numbers.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- AUTHORS -->

## 👥 Authors <a name="authors"></a>

👤 **Khanh**

- GitHub: [khanh-devos](https://github.com/khanh-devos)
- Twitter: [@khanhror](https://twitter.com/home?lang=en)
- LinkedIn: [Khanh RoR](https://www.linkedin.com/in/khanh-dom/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE FEATURES -->

## 🔭 Future Features <a name="future-features"></a>

- **Optional reflective border**
- **Optional sun**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

<!-- ## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/khanh-devos/react-reflection/issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- SUPPORT -->

## ⭐️ Show your support <a name="support"></a>

If you like this project give it a ⭐️

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGEMENTS -->
<!-- 
## 🙏 Acknowledgments <a name="acknowledgements"></a>

I would like to thank all contributors.

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- LICENSE -->

<!-- ## 📝 License <a name="license"></a>

This project is [MIT](./MIT.md) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a name="readme-top"></a> -->