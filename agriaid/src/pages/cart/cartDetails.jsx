import {
  SfButton,
  SfIconAdd,
  SfIconDelete,
  SfIconRemove,
  SfLink,
} from "@storefront-ui/react";

export default function CartDisplay({ productsInCart ,removeItem}) {
  const updateCart = (id,quantity) => {
    removeItem(id,quantity)
  }
  return (
    <>
      <div className="border border-gray-300 rounded-lg shadow-lg " style={{ maxWidth: 800, padding: 30 }}>
        <p className="font-bold text-2xl">Shopping Bag</p>

        {productsInCart.map((product) => (
          <div
            key={product.id}
            className="relative flex border-b-[1px] border-neutral-200 hover:shadow-lg min-w-[320px] max-w-[640px] p-4"
          >
            <div className="relative overflow-hidden rounded-md w-[100px] sm:w-[176px]">
              <SfLink href="#">
                <img
                  className="w-full h-auto border rounded-md border-neutral-200"
                  src={product.image}
                  alt={product.name}
                  width="300"
                  height="300"
                />
              </SfLink>
            </div>
            <div className="flex flex-col pl-4 min-w-[180px] flex-1">
              <SfLink
                href="#"
                variant="secondary"
                className="font-bold no-underline typography-text-sm sm:typography-text-lg"
              >
                {product.name}
              </SfLink>

              <div className="my-2 sm:mb-0">
                <ul className="text-xs font-normal leading-5 sm:typography-text-sm text-neutral-700">
                  <li>
                    <span className="mr-1">Unit Price:</span>
                    <span className="font-medium">
                      {product.price.toFixed(2)}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="items-center sm:mt-auto sm:flex">
                <span className="font-bold sm:ml-auto sm:order-1 typography-text-sm sm:typography-text-lg">
                ₹ {product.totalPrice.toFixed(2)}
                </span>
                <div className="flex items-center justify-between mt-4 sm:mt-0">
                  <div className="flex border border-neutral-300 rounded-md">
                    <SfButton
                      variant="tertiary"
                      square
                      className="rounded-r-none"
                      disabled={product.quantity <= 1}
                      aria-label="Decrease value"
                      // onClick={() =>
                      //   handleQuantityChange(product.id, product.quantity - 1)
                      // }
                    >
                      <SfIconRemove />
                    </SfButton>
                    <input
                      type="number"
                      role="spinbutton"
                      className="appearance-none mx-2 w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
                      min={1}
                      max={5}
                      value={product.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          product.id,
                          Number(clamp(e.target.value, 1, 5))
                        )
                      }
                    />
                    <SfButton
                      variant="tertiary"
                      square
                      className="rounded-l-none"
                      disabled={product.quantity >= 5}
                      aria-label="Increase value"
                      // onClick={() =>
                      //   handleQuantityChange(product.id, product.quantity + 1)
                      // }
                    >
                      <SfIconAdd />
                    </SfButton>
                  </div>
                  <button
                    aria-label="Remove"
                    type="button"
                    className="text-neutral-500 text-xs font-light ml-auto flex items-center px-3 py-1.5"
                    onClick={() => updateCart(product.lineItemId, product.quantity)}
                  >
                    <SfIconDelete />
                    <span className="hidden ml-1.5 sm:block"> Remove </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
