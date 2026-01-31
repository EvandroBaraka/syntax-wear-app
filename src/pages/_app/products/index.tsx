import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/products/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="container">
            <h1 className="text-black">Products Page</h1>

            <p className="text-black">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae facilis quidem error nulla corrupti possimus minus aliquam rerum omnis doloremque laudantium quaerat rem nesciunt accusantium tenetur, est tempore illum voluptas?</p>
            <p className="text-black">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae facilis quidem error nulla corrupti possimus minus aliquam rerum omnis doloremque laudantium quaerat rem nesciunt accusantium tenetur, est tempore illum voluptas?</p>
            <p className="text-black">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae facilis quidem error nulla corrupti possimus minus aliquam rerum omnis doloremque laudantium quaerat rem nesciunt accusantium tenetur, est tempore illum voluptas?</p>
            <p className="text-black">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae facilis quidem error nulla corrupti possimus minus aliquam rerum omnis doloremque laudantium quaerat rem nesciunt accusantium tenetur, est tempore illum voluptas?</p>
        </div>
    )
}