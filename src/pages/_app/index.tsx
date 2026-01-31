import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../../components/Hero";
import { Categories } from "../../components/Categories";
import { Gallery } from "../../components/Gallery";

export const Route = createFileRoute("/_app/")({
    component: RouterComponent,
});

function RouterComponent() {
    return (
        <main className="py-10">
            <Hero />
            <Categories />
            <Gallery />
        </main>
    );
}
