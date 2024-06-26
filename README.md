--- BACKEND ---

> Environment Configuration:

Environment Variables: We utilize an environment configuration file (env) to manage sensitive data like database URIs
and API keys securely.

> Middleware Integration:

User and Admin Middleware: We employ two middleware functions, user_security and admin_security, to handle user
authentication and admin authorization respectively. These middlewares are applied to routes requiring specific
user roles.

> Database Models:

Sales Model: This model captures sales data, including product details and user information. It serves as a record of
transactions within our application.

User Model: The user model stores essential user information such as name, email, password, and address. It also maintains
a reference to the user's orders.

Order Model: The order model tracks orders placed by users, including details such as products, quantities, total
amounts, and statuses.

> Route Handling:

Admin Routes: The admin router handles operations related to admin privileges. Routes include fetching all users,
updating user profiles, retrieving specific user details by ID, managing orders, and updating order statuses.

Product Routes: Product routes cater to CRUD operations on products. These include fetching all products, adding new
products with image uploads, retrieving product details, searching for products, updating product information, and
deleting products.

Seed Routes: Seed routes facilitate seeding of initial data into our application, including sample products and users.

User Routes: User routes handle user-related actions such as user registration, login, profile management, product
ordering, order cancellation, and retrieving order history.

> Controller Logic:

Admin Controller: The admin controller contains logic for handling admin-specific operations, including fetching user
details, updating user profiles, fetching all orders, and updating order statuses.

Product Controller: The product controller manages product-related actions, including adding, updating, retrieving,
searching, and deleting products.

Sample Controller: The sample controller facilitates seeding of sample data, such as sample products and users, into
our application during development.

User Controller: The user controller handles user-specific operations, including user registration, login, profile
management, product ordering, order cancellation, and order history retrieval.

--- FRONTEND ---

\*\* Library Utilization:

> React JS:
> Our frontend is built on the robust foundation of React JS, enabling us to create dynamic and interactive
> user interfaces with ease.

> Axios for Data Fetching:
> We leverage Axios to fetch data from our backend APIs asynchronously, ensuring efficient
> communication between the frontend and backend components.

> React-Toastify:
> To enhance user experience, we utilize React-Toastify to display messages for confirmation, errors,
> and notifications, keeping users informed throughout their journey.

> Redux for State Management:
> With Redux, we orchestrate state management seamlessly across our application, maintaining
> clarity and consistency in data flow. We employ four reducers - user reducer, auth reducer, and cart reducer - to manage
> user-related data, authentication states, and cart functionalities effectively.

\*\* Folder Structure and API Calls:

> APIs Folder:
> We organize our API calls neatly within an APIs folder, facilitating streamlined access to user, product,
> and admin APIs. This structured approach enhances maintainability and scalability as our application grows.

\*\* Responsive Design and UI Styling:

> Bootstrap for UI:
> Leveraging the power of Bootstrap, we craft visually appealing and responsive user interfaces. By
> harnessing Bootstrap's grid system and components, we ensure consistency and coherence across various screen sizes and
> devices.

> Color Scheme:
> We opt for a harmonious color scheme comprising secondary colors like grey, white, and black, evoking
> a sense of sophistication and elegance in our UI design.

> Responsive Design:
> Recognizing the importance of accessibility, we prioritize responsiveness in our design, catering
> to users across different devices and screen resolutions. Through meticulous design and testing, we strive to deliver a
> seamless experience regardless of the user's device.

\*\* Session Storage and Token Management:

> Session Storage:
> We employ session storage to store crucial data such as authentication tokens, user information, and
> cart items, ensuring persistence and continuity across user sessions. This enhances user convenience and facilitates
> seamless navigation within the application.

\*\* Conditional Rendering for User Roles:

> Admin and User Views:
> We implement conditional rendering to tailor the user experience based on the user's role.
> Admin-specific functionalities are accessible only to authorized users, ensuring security and control over sensitive
> operations.
