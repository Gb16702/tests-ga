import {type RouteConfig, index, layout, route} from "@react-router/dev/routes";

export default [
    layout("routes/main/_layout.tsx", [
        index("routes/main/home.tsx"),
    ]),
        layout("routes/auth/_layout.tsx", [
            route("authentication/signin", "routes/auth/signin.tsx"),
            route("authentication/signup", "routes/auth/signup.tsx"),
        ])
] satisfies RouteConfig;
