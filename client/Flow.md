1. npx create-react-app -tênapp --template typescript
2. npm install tailwindcss, configure (search docs)
   2.1. install react router dom, axios
3. create folders: components, pages
4. add file to pages to create Router
5. create function components using this template

```
interface Props {}

const Login = (props: Props): React.JSX.Element => {
  return <></>;
};
export default Login;

```

6. Create router for app (client)
   6.1. import BrowserRouter, Routes, Route from react-router-dom
   6.2. create 2 components: Sidebar and Navbar
   sidebar contains pages in admin page and page's logo
   navbar contains user info

   ```
   const ShareLayout = (props: Props): React.JSX.Element => {
   return (
    <>
      <div className="flex w-full">
        <BigSidebar />
        <div className="flex-1 bg-gray-100 ">
          <Navbar />
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
   );
   };
   export default ShareLayout;

   ```

7. in App.tsx

```
   import "./App.css";
   import { BrowserRouter, Route, Routes } from "react-router-dom";
   import { Dashboard, Login, Order, ShareLayout } from "./pages";
   function App() {
   return (
    <BrowserRouter>
        <Routes>
            <Route element={<ShareLayout />} path="/admin">
                <Route element={<Dashboard />} index />
                <Route element={<Login />} path="/admin/login" />
                <Route element={<Order />} path="/admin/order" />
            </Route>
        </Routes>
    </BrowserRouter>
   );
   }

export default App;
```

8. Finsh login page and register page
