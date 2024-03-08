<a name="intro"></a>
# Introduction
   Deveoping a e-commerce web site using open api, [platzi store](https://fakeapi.platzi.com/).
   This api provides a wide range of stuff used in real e-commerce services,
   ie. able to get all the products with pagination or find a product with title, price range, category parameters etc.
   Also allow us to register/update product as admin (including file image upload to server well). 

   JWT is used for user session, the access token is valid for 20 days, and the refresh token is valid for 10 hours.
   Once you are logged in, JWT token is saved in localStroage and will be used for user session.

   You can check out here [Live link](https://awesome-shopping.netlify.app/)

<a name="table_of_contents"></a>
## Table of Contents
   - [Introduction](#intro)
   - [Table of Contents](#table_of_contents)
   - [Getting Started](#getting_started)
      - [Prerequisites](#prerequisites)
      - [Clone the project](#clone)
      - [Install and run](#install)
      - [Navgiate](#navigate)
   - [Usage](#usage)
      - [Architecture and Design](#architecture_design)
      - [Testing](#testing)
      - [Deployment](#deployment)

<a name="getting_started"></a>
## Getting Started
   <a name="prerequisites"></a>
   ### Prerequisites
   - node `^19.2.0`
   - npm `^9.2.0`

   Make sure you have [npm](https://www.npmjs.com/get-npm) installed globally.

   <a name="clone"></a>
   #### 1.Clone the project:
   ```bash
   $ git clone https://github.com/Woongsik/e-commerce.git
   $ cd e-commerce
   ```

   <a name="install"></a>
   #### 2.Install and run:

   ```bash
   $ npm install   # Install project dependencies
   $ npm start     # Compile and launch on local environment
   ```

   <a name="navigate"></a>
   #### 3. Navigate to [http://localhost:3000](http://localhost:3000)

<a name="usage"></a>
## Usage:
   ### Scripts
   In the package.json, below scripts are used.
   Since _msw_ doesn't support axios, additional scripts required for test
   (For the testing purpose, use _fetch_ for mocking server), otherwise axios is used.

   ```bash
     "scripts": {
         "start": "react-scripts start",
         "build": "react-scripts build",
         "test": "react-scripts test --transformIgnorePatterns \"node_modules/(?!@toolz/allow-react)/\" --env=jsdom",
         "eject": "react-scripts eject"
      },
   ```

   ### Features
   - Sending queries to server for filtering
      - Find all products: (GET) https://api.escuelajs.co/api/v1/products
         - pagination: ?offset=0&limit=10
      - Find a product: 
         - base url: (GET) https://api.escuelajs.co/api/v1/products
            - by title: /?title=Generic
            - by price range: /?price_min=900&price_max=1000
            - by category: /?categoryId=1
            - by joinning filters: /?title=Generic&price_min=900&price_max=1000&categoryId=1
      - Find all categories: (GET) https://api.escuelajs.co/api/v1/categories 

   - Upload image: 
      (POST) https://api.escuelajs.co/api/v1/files/upload
      ```bash
      # Body
      {
         "file": "<Binary File>"
      }
      ```

   - Validations with React-hook-form
   - General style with Material UI
   - JWT for session: (GET) https://api.escuelajs.co/api/v1/auth/profile
      ```bash
      # Headers
      {
         "Authorization": "Bearer {your access token}"
      }
      ```
   ### Screenshots or GIFs
   ![screenshot of the site home](<Screenshot_home.png>)
   ![screenshot of the site details](<Screenshot_detail.png>)
   ![screenshot of the site cart](<Screenshot_cart.png>)
   ![screenshot of the site filter](<Screenshot_filter.png>)

   <a name="architecture_design"></a>
   ### Architecture & Design:
      #### Folter structure: App > Router & Store > Redux & ContextAPI > Pages > Components 
      src
      ┣ components
      ┃ ┣ cart
      ┃ ┃ ┣ cartItemCard
      ┃ ┃ ┃ ┗ CartItemCard.tsx
      ┃ ┃ ┗ cartSummary
      ┃ ┃ ┃ ┗ CartSummary.tsx
      ┃ ┣ cateogries
      ┃ ┃ ┗ Categories.tsx
      ┃ ┣ contextAPI
      ┃ ┃ ┣ footer
      ┃ ┃ ┃ ┗ Footer.tsx
      ┃ ┃ ┣ navbar
      ┃ ┃ ┃ ┗ Navbar.tsx
      ┃ ┃ ┗ ThemeContext.tsx
      ┃ ┣ product
      ┃ ┃ ┣ productCard
      ┃ ┃ ┃ ┗ ProductCard.tsx
      ┃ ┃ ┣ productCreateOrUpdate
      ┃ ┃ ┃ ┗ ProductCreateOrUpdate.tsx
      ┃ ┃ ┣ productEdit
      ┃ ┃ ┃ ┗ ProductEdit.tsx
      ┃ ┃ ┗ productList
      ┃ ┃ ┃ ┗ ProductList.tsx
      ┃ ┗ ui // UI that make the components reusable 
      ┃ ┃ ┣ button
      ┃ ┃ ┃ ┣ UiButton.tsx
      ┃ ┃ ┃ ┗ UiRoundButton.tsx
      ┃ ┃ ┣ carousel
      ┃ ┃ ┃ ┣ UiCarousel.css
      ┃ ┃ ┃ ┗ UiCarousel.tsx
      ┃ ┃ ┣ fileUploader
      ┃ ┃ ┃ ┗ FileUploader.tsx
      ┃ ┃ ┣ form
      ┃ ┃ ┃ ┗ UiFormSelects.tsx
      ┃ ┃ ┣ image
      ┃ ┃ ┃ ┣ UiBrokenImage.tsx
      ┃ ┃ ┃ ┣ UiImage.tsx
      ┃ ┃ ┃ ┣ UiNoImage.tsx
      ┃ ┃ ┃ ┗ UiThumb.tsx
      ┃ ┃ ┣ layout
      ┃ ┃ ┃ ┣ CenteredContainer.tsx
      ┃ ┃ ┃ ┗ GridContainer.tsx
      ┃ ┃ ┣ loading
      ┃ ┃ ┃ ┗ LoadingBackdrop.tsx
      ┃ ┃ ┣ pageCounter
      ┃ ┃ ┃ ┗ PageCounter.tsx
      ┃ ┃ ┣ pageNavigation
      ┃ ┃ ┃ ┗ PageNavigation.tsx
      ┃ ┃ ┣ priceRangeSlider
      ┃ ┃ ┃ ┗ PriceRangeSlider.tsx
      ┃ ┃ ┣ scrollToTop
      ┃ ┃ ┃ ┗ ScrollToTop.tsx
      ┃ ┃ ┣ searchInput
      ┃ ┃ ┃ ┗ SearchInput.tsx
      ┃ ┃ ┣ sortSelects
      ┃ ┃ ┃ ┗ SortSelects.tsx
      ┃ ┃ ┗ UiDialog.tsx
      ┣ hooks
      ┃ ┗ useUserSession.ts
      ┣ misc
      ┃ ┣ types
      ┃ ┃ ┣ CartItem.ts
      ┃ ┃ ┣ Category.ts
      ┃ ┃ ┣ Filter.ts
      ┃ ┃ ┣ Forms.ts
      ┃ ┃ ┣ MUI.ts
      ┃ ┃ ┣ Product.ts
      ┃ ┃ ┣ Sort.ts
      ┃ ┃ ┣ UploadedImage.ts
      ┃ ┃ ┗ User.ts
      ┃ ┗ utils
      ┃ ┃ ┣ DateUtil.ts
      ┃ ┃ ┗ Urls.ts
      ┣ pages
      ┃ ┣ cart
      ┃ ┃ ┗ Cart.tsx
      ┃ ┣ home
      ┃ ┃ ┗ Home.tsx
      ┃ ┣ login
      ┃ ┃ ┗ Login.tsx
      ┃ ┣ prodcutDetail
      ┃ ┃ ┗ ProductDetail.tsx
      ┃ ┣ productUpdate
      ┃ ┃ ┗ ProdcutUpdate.tsx
      ┃ ┗ profile
      ┃ ┃ ┗ Profile.tsx
      ┣ redux // Using reducers, data can go further
      ┃ ┣ slices 
      ┃ ┃ ┣ CartSlice.ts
      ┃ ┃ ┣ CategorySlice.ts
      ┃ ┃ ┣ ProductSlice.ts
      ┃ ┃ ┗ UserSlice.ts
      ┃ ┣ utils // Help reducers that do the dirty work behind the scene :) 
      ┃ ┃ ┣ CartSliceUtil.ts
      ┃ ┃ ┣ ProductSliceUtils.ts
      ┃ ┃ ┗ UserSlicerUtil.ts
      ┃ ┗ store.ts
      ┣ services
      ┃ ┗ APIService.ts // Centralized apiService
      ┣ test  // Testing server & Reducers 
      ┃ ┣ redux
      ┃ ┃ ┣ CartReducer.test.ts
      ┃ ┃ ┣ CategoryReducer.test.ts
      ┃ ┃ ┣ CategoryReducerWithMockingServer.test.ts
      ┃ ┃ ┣ ProductReducerWithMockServer.test.ts
      ┃ ┃ ┣ ProductsReducer.test.ts
      ┃ ┃ ┣ UserReducer.test.ts
      ┃ ┃ ┗ UserReducerWithMockingServer.test.ts
      ┃ ┗ shared
      ┃ ┃ ┣ CategoryServer.ts
      ┃ ┃ ┣ ProductServer.ts
      ┃ ┃ ┗ UserServer.ts
      ┣ App.tsx
      ┣ index.css
      ┣ index.tsx
      ┣ logo.svg
      ┣ react-app-env.d.ts
      ┣ reportWebVitals.ts
      ┗ setupTests.ts
   
   <a name="testing"></a>
   ### Testing:   
   Testing is done by _Jest_ and _msw_. Since msw is not supporting axios, there are two types of testing code.
   xxx.test.ts is for axios (Focused on testing reducers)
   xxxWithMockingServer.test.ts is for fetch (Focused on testing with server)

   To avoid, potential error, axios is used for the application.
   In order to test with server, use fetch in src/services/apiService.ts 
   Just comment out axios part (Remove comments line 22 to line 37 , add comment line 41 to 49 )
   Also src/test/redux/productReducerWithMockServer.ts(line 3, 13, 21) 

   Currently all the reducers are tested (productSlice, userSlice, cartSlice, categorySlice)
   Total 132 tests runs and passed in 7 test suites.

   Testing code src/test/redux
   Mocking server src/test/shared

   ```bash
      $ npm test   # Testing reducers and related stuff 
   ```
   
   <a name="deployment"></a>
   ### Deployment:
   One of most popular deployment [Netlify](https://www.netlify.com/) used for the deployment and hosting. 
   Continuous integration and deploy for further fixes and improvements.
