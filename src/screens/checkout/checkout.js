import React from "react";
import { CartTotal } from "../../components/cart";
import { CheckoutForm } from "../../components/form";
import { View } from "../../components/view";

export function Checkout() {
  return (
    <View title="Checkout" class="container">
      <div className="flex flex-col my-24 lg:justify-between lg:flex-row">
        <section className="flex-col w-full rounded shadow-lg lg:mr-4">
          <h2 className="w-2/3 p-4 mx-auto text-xl text-center bg-gray-200 rounded">
            This form doesn't actually do anything, just here for looks
            <span role="img" aria-label="eyes emoji">
              👀
            </span>
          </h2>
          <CheckoutForm />
        </section>

        <section className="flex-col w-full px-4 py-6 my-6 rounded shadow-lg lg:my-0 lg:w-1/3">
          <CartTotal />
        </section>
      </div>
    </View>
  );
}
