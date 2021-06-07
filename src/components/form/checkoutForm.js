import React from "react";

export function CheckoutForm() {
  return (
    <form className="flex flex-col w-full p-4 md:px-8 lg:px-24">
      <span className={`checkout-input-container`}>
        <input
          required
          className={`input form-input w-full md:w-1/2`}
          type="text"
          placeholder="First Name"
        />
        <input
          required
          className={`input form-input w-full md:w-1/2`}
          type="text"
          placeholder="Last Name"
        />
      </span>

      <span className={`checkout-input-container`}>
        <input
          required
          className={`input form-input w-full md:w-3/4`}
          type="text"
          placeholder="Address"
        />
        <input
          required
          className={`input form-input w-full md:w-1/4`}
          type="text"
          placeholder="Apt, suite, etc. (optional)"
        />
      </span>

      {/* TODO: CITY, COUNTRY, STATE DROPDOWNS */}
      <span className={`checkout-input-container`}>
        <input
          required
          className={`input form-input w-full`}
          type="text"
          placeholder="City"
        />
      </span>

      <span className={`checkout-input-container`}>
        <select
          required
          className={`input form-select w-full lg:w-2/3`}
          name="Country"
          id="country"
        >
          <option value="" disabled selected>
            Country
          </option>
        </select>
        <select
          required
          className={`input form-select w-full lg:w-2/3`}
          name="State"
          id="state"
        >
          <option value="" disabled selected>
            State
          </option>
        </select>
        <input
          required
          className={`input form-input w-full lg:w-1/3`}
          type="text"
          placeholder="Zip Code"
        />
      </span>

      <span className={`checkout-input-container`}>
        <input
          required
          className={`input form-input w-full`}
          type="text"
          placeholder="Phone"
        />
      </span>
    </form>
  );
}
