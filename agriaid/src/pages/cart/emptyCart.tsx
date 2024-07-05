export default function EmptyCart() {
    return (<>
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="text-center p-4">
                <h1 className="text-3xl font-bold mb-4 text-gray-700">Your cart is empty</h1>
                <img src="/emptycart.jpg" alt="Your cart is empty" className="w-1/2 mx-auto rounded-lg shadow-lg" />
            </div>
        </div>
    </>)
}